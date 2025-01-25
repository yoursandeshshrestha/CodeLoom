"use client";
import React from "react";
import { FileNode } from "@/types/repository";
import { RepositoryExplorer } from "@/components/RepositoryExplorer";

interface RepositoryDisplayProps {
  repository: FileNode | null;
  truncateRepoName: (name: string) => string;
}

export const RepositoryDisplay: React.FC<RepositoryDisplayProps> = ({
  repository,
  truncateRepoName,
}) => {
  return (
    <div className="bg-gray-800/50 rounded-lg w-[60%] flex flex-col">
      {repository ? (
        <RepositoryExplorer
          structure={{
            ...repository,
            name: truncateRepoName(repository.name),
          }}
        />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          No repository loaded
        </div>
      )}
    </div>
  );
};
