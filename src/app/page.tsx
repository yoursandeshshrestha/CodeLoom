import React from "react";
import Link from "next/link";
import { GitBranch, ArrowRight, Folder, File, FolderOpen } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#090909] selection:bg-purple-500/20 selection:text-purple-200">
      <div className="max-w-7xl mx-auto px-6 flex min-h-[calc(100vh-73px)]">
        <div className="flex flex-col justify-center items-center w-full gap-16 py-16">
          {/* Hero Section */}
          <div className="space-y-5 max-w-3xl mx-auto text-center">
            <div className="p-4 rounded-full bg-black/50 border border-zinc-800/50 backdrop-blur-sm w-16 h-16 flex items-center justify-center mx-auto">
              <GitBranch className="w-8 h-8 text-purple-500" />
            </div>

            <div className="space-y-5 max-w-2xl flex flex-col justify-center items-center">
              <h1 className="text-6xl text-center font-bold tracking-tight text-white flex items-center">
                <span>Repository</span>
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600">
                  Explorer
                </span>
              </h1>

              <p className="text-lg text-zinc-400  mx-auto font-light">
                Share your file structure, solve issues faster—AI debugging made
                simple.
              </p>
            </div>

            <Link
              href="/explore"
              className="group relative bg-purple-600 w-fit hover:bg-purple-700 text-white px-8 py-4 rounded-md text-lg font-medium 
                 transition-all duration-200 flex items-center gap-2 mx-auto shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
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
                <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/20" />
              </div>
              <div className="text-sm text-zinc-600 font-mono">explorer</div>
            </div>

            {/* File Structure */}
            <div className="p-6 font-mono text-sm bg-[#0A0A0A]">
              <div className="space-y-3">
                {/* Root folder */}
                <div className="flex items-center space-x-2 text-zinc-300 hover:text-purple-400 transition-colors">
                  <FolderOpen className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">repository-explorer</span>
                </div>

                {/* src folder */}
                <div className="ml-4 space-y-3">
                  <div className="flex items-center space-x-2 text-zinc-300 hover:text-purple-400 transition-colors">
                    <FolderOpen className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">src</span>
                  </div>

                  {/* src contents */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                      <File className="w-4 h-4 text-blue-500" />
                      <span>App.tsx</span>
                    </div>
                    <div className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                      <File className="w-4 h-4 text-emerald-500" />
                      <span>styles.css</span>
                    </div>

                    {/* components folder */}
                    <div className="flex items-center space-x-2 text-zinc-300 hover:text-purple-400 transition-colors">
                      <Folder className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">components</span>
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                        <File className="w-4 h-4 text-blue-500" />
                        <span>Explorer.tsx</span>
                      </div>
                      <div className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                        <File className="w-4 h-4 text-blue-500" />
                        <span>FileTree.tsx</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* public folder */}
                <div className="ml-4 flex items-center space-x-2 text-zinc-300 hover:text-purple-400 transition-colors">
                  <Folder className="w-4 h-4 text-purple-500" />
                  <span className="font-medium">public</span>
                </div>

                {/* Config files */}
                <div className="ml-4 space-y-2">
                  <div className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                    <File className="w-4 h-4 text-yellow-500" />
                    <span>package.json</span>
                  </div>
                  <div className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-300 transition-colors">
                    <File className="w-4 h-4 text-yellow-500" />
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
