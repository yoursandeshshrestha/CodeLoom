import React, { useState, useEffect } from "react";
import { TreeView } from "./TreeView";
import { toast } from "sonner";
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { generateTreeText } from "../utils/fileUtils";
import { FileNode } from "../types/repository";

interface RepositoryExplorerProps {
  structure: FileNode;
}

export const RepositoryExplorer: React.FC<RepositoryExplorerProps> = ({
  structure,
}) => {
  const [expandAll, setExpandAll] = useState(false);
  const [repository, setRepository] = useState(structure);
  const [copied, setCopied] = useState(false);
  const [hasExpandedFolders, setHasExpandedFolders] = useState(false);

  // Synchronize local state with prop
  useEffect(() => {
    setRepository(structure);
  }, [structure]);

  const handleCopyStructure = () => {
    const treeText = generateTreeText(repository);
    navigator.clipboard.writeText(treeText);
    toast.success("Repository structure copied to clipboard");
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const handleDelete = (path: string) => {
    const deleteNode = (node: FileNode): FileNode => {
      if (node.children) {
        node.children = node.children
          .filter((child) => child.path !== path)
          .map((child) => deleteNode({ ...child }));
      }
      return node;
    };

    const newStructure = deleteNode({ ...repository });
    setRepository(newStructure);
    toast.success(`Deleted ${path}`);
  };

  const handleExpandChange = (isExpanded: boolean) => {
    setHasExpandedFolders(isExpanded);
  };

  return (
    <div className="flex flex-col h-full rounded-lg">
      <div className="flex justify-between items-center rounded-lg mb-4 p-4 bg-gray-800/50">
        <h2 className="text-xl font-semibold text-white">{repository.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopyStructure}
            className="flex items-center text-nowrap gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {copied ? "Copied" : "Copy Structure"}
          </button>
          <button
            onClick={() => {
              const newExpandState = !expandAll;
              setExpandAll(newExpandState);
              setHasExpandedFolders(newExpandState);
            }}
            className="flex items-center text-nowrap gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
          >
            {hasExpandedFolders ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {hasExpandedFolders ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        {repository.children && (
          <div>
            {repository.children.map((child) => (
              <TreeView
                key={child.path}
                node={child}
                onDelete={handleDelete}
                isExpanded={expandAll}
                initialExpanded={expandAll}
                onExpandChange={handleExpandChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
