"use client";
import React from "react";
import { Github, Upload } from "lucide-react";
import { toast } from "sonner";

interface InputSectionProps {
  url: string;
  accessToken: string;
  isLoading: boolean;
  onUrlChange: (value: string) => void;
  onAccessTokenChange: (value: string) => void;
  onFetchRepository: () => void;
  onFileUpload: (file: File) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  url,
  accessToken,
  isLoading,
  onUrlChange,
  onAccessTokenChange,
  onFetchRepository,
  onFileUpload,
}) => {
  return (
    <div className="bg-gray-800/50 w-[40%]  rounded-lg p-6 h-fit">
      <div>
        <div>
          <input
            type="text"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Paste GitHub or Bitbucket repository URL"
            className="w-full mb-[10px] px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <input
            type="password"
            value={accessToken}
            onChange={(e) => onAccessTokenChange(e.target.value)}
            placeholder="Access token (optional, for private repositories)"
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
          />
          <a
            href="https://github.com/settings/tokens?type=beta"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 hover:text-purple-300 mt-2 ml-2 inline-block"
          >
            Get an access token →
          </a>
        </div>

        <button
          onClick={onFetchRepository}
          disabled={isLoading}
          className="w-full mt-[10px] bg-purple-500 hover:bg-purple-600 text-white px-10 py-3 rounded-md font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Github className="w-5 h-5" />
          {isLoading ? "Fetching..." : "Fetch Repository"}
        </button>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const file = e.dataTransfer.files[0];
            if (file && file.name.endsWith(".zip")) {
              onFileUpload(file);
            } else {
              toast.error("Please upload a ZIP file");
            }
          }}
          className="border-2 mt-[20px] border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors"
        >
          <input
            type="file"
            accept=".zip"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onFileUpload(file);
              }
            }}
            className="hidden"
            id="zip-upload"
          />
          <label
            htmlFor="zip-upload"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-gray-400">
              Drop ZIP file or click to upload
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
