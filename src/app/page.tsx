import React from "react";
import Link from "next/link";
import { ArrowRight, Folder, File, FolderOpen, Code } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen max-h-screen overflow-hidden bg-background selection:bg-primary/20 selection:text-primary">
      <div className="max-w-7xl mx-auto px-6 flex min-h-[calc(100vh-73px)]">
        <div className="flex flex-col justify-center items-center w-full gap-16 py-16">
          {/* Hero Section */}
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-full bg-black/50 border border-zinc-800/50 backdrop-blur-sm w-16 h-16 flex items-center justify-center mx-auto">
              <Code className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-5 max-w-2xl flex flex-col justify-center items-center">
              <h1 className="text-6xl text-center font-bold tracking-tight text-foreground flex items-center">
                <span>Code</span>
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                  Loom
                </span>
              </h1>
              <h1 className="text-6xl text-center font-bold tracking-tight text-foreground flex items-center">
                <span>The </span>
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary">
                  Repository
                </span>
                <span>Explorer</span>
              </h1>

              <p className="text-lg text-zinc-400 mx-auto font-light">
                Share your file structure, solve issues faster—AI debugging made
                simple.
              </p>
            </div>

            <Link
              href="/explore"
              className="group relative bg-primary w-fit hover:bg-secondary text-foreground px-8 py-4 rounded-md text-lg font-medium 
                 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg shadow-primary/20 hover:shadow-secondary/30"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* File Explorer Preview */}
          <div className="rounded-xl overflow-hidden border border-zinc-800/50 bg-black shadow-2xl max-w-4xl mx-auto w-full backdrop-blur-sm">
            {/* Window Controls */}
            <div className="px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/50 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-danger/30 border border-danger/20" />
                <div className="w-3 h-3 rounded-full bg-warning/30 border border-warning/20" />
                <div className="w-3 h-3 rounded-full bg-success/30 border border-success/20" />
              </div>
              <div className="text-sm text-zinc-600 font-mono">explorer</div>
            </div>

            {/* File Structure */}
            <div className="p-6 font-mono text-sm bg-[#0A0A0A]">
              <div className="space-y-3">
                {/* Root folder */}
                <div className="flex items-center space-x-2 text-zinc-300  transition-colors">
                  <FolderOpen className="w-4 h-4 text-primary" />
                  <span className="font-medium">repository-explorer</span>
                </div>

                {/* src folder */}
                <div className="ml-4 space-y-3">
                  <div className="flex items-center space-x-2 text-zinc-300  transition-colors">
                    <FolderOpen className="w-4 h-4 text-gray-300" />
                    <span className="font-medium">src</span>
                  </div>

                  {/* src contents */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                      <File className="w-4 h-4 text-gray-300" />
                      <span>App.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                      <File className="w-4 h-4 text-gray-300" />
                      <span>styles.css</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                      <File className="w-4 h-4 text-gray-300" />
                      <span>.gitignore</span>
                    </div>

                    {/* components folder */}
                    <div className="flex items-center space-x-2 text-zinc-300  transition-colors">
                      <Folder className="w-4 h-4 text-gray-300" />
                      <span className="font-medium">components</span>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                        <File className="w-4 h-4 text-gray-300" />
                        <span>Explorer.tsx</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                        <File className="w-4 h-4 text-gray-300" />
                        <span>FileTree.tsx</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* public folder */}
                <div className="ml-4 flex items-center space-x-2 text-zinc-300  transition-colors">
                  <Folder className="w-4 h-4 text-gray-300" />
                  <span className="font-medium">public</span>
                </div>

                {/* Config files */}
                <div className="ml-4 space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                    <File className="w-4 h-4 text-gray-300" />
                    <span>package.json</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-500  transition-colors">
                    <File className="w-4 h-4 text-gray-300" />
                    <span>tsconfig.json</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
