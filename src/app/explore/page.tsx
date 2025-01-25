"use client";
import React, { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { FileNode } from "@/types/repository";
import { fetchGithubRepository } from "@/utils/githubApi";
import { processGithubTree } from "@/utils/fileUtils";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { InputSection } from "@/components/InputSection";
import { RepositoryDisplay } from "@/components/RepositoryDisplay";
import JSZip from "jszip";
import Link from "next/link";

const Explorer: React.FC = () => {
  const [url, setUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [repository, setRepository] = useState<FileNode | null>(null);

  const handleFetchRepository = async () => {
    try {
      setIsLoading(true);
      const response = await fetchGithubRepository(url, accessToken);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch repository");
      }

      const structure = processGithubTree(data.tree, url);
      setRepository(structure);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch repository",
        {
          duration: 5000,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setIsLoading(true);
      const zip = new JSZip();
      const contents = await zip.loadAsync(file);

      const structure: FileNode = {
        name: file.name.replace(".zip", ""),
        type: "directory",
        path: "/",
        children: [],
      };

      const paths = Object.keys(contents.files)
        .filter((path) => !path.startsWith("__MACOSX/"))
        .sort((a, b) => {
          const aDepth = a.split("/").length;
          const bDepth = b.split("/").length;
          if (aDepth !== bDepth) return aDepth - bDepth;
          return a.localeCompare(b);
        });

      for (const path of paths) {
        const zipEntry = contents.files[path];
        if (!zipEntry.dir) {
          const pathParts = path.split("/");
          const fileName = pathParts.pop()!;
          let currentNode = structure;

          for (const part of pathParts) {
            if (!part) continue;
            let child = currentNode.children?.find(
              (n) => n.type === "directory" && n.name === part
            );
            if (!child) {
              child = {
                name: part,
                type: "directory",
                path: `${currentNode.path}${part}/`,
                children: [],
              };
              currentNode.children = currentNode.children || [];
              currentNode.children.push(child);
            }
            currentNode = child;
          }

          currentNode.children = currentNode.children || [];
          currentNode.children.push({
            name: fileName,
            type: "file",
            path: path,
          });
        }
      }

      setRepository(structure);
    } catch (error) {
      toast.error("Failed to process ZIP file");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const truncateRepoName = (name: string) => {
    if (name.length > 40) {
      return name.substring(0, 28) + "...";
    }
    return name;
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col p-4 md:p-6">
      {isLoading && <LoadingSpinner />}

      <Link
        href="/"
        className="inline-flex items-center text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>

      <div className="flex gap-8 flex-1 overflow-hidden">
        <InputSection
          url={url}
          accessToken={accessToken}
          isLoading={isLoading}
          onUrlChange={setUrl}
          onAccessTokenChange={setAccessToken}
          onFetchRepository={handleFetchRepository}
          onFileUpload={handleFileUpload}
        />
        <RepositoryDisplay
          repository={repository}
          truncateRepoName={truncateRepoName}
        />
      </div>
    </div>
  );
};

export default Explorer;
