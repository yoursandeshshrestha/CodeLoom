import React, { useState } from "react";
import { FileNode } from "../types/repository";
import { TreeView } from "./TreeView";
import { generateTreeText } from "../utils/fileUtils";
import { toast } from "sonner";
import { Copy, ChevronDown, ChevronUp } from "lucide-react";

interface RepositoryExplorerProps {
  structure: FileNode;
}

export const RepositoryExplorer: React.FC<RepositoryExplorerProps> = ({
  structure,
}) => {
  const [expandAll, setExpandAll] = useState(true);
  const [repository, setRepository] = useState(structure);

  const handleCopyStructure = () => {
    const treeText = generateTreeText(repository);
    navigator.clipboard.writeText(treeText);
    console.log("Repository structure copied to clipboard");
    toast.success("Repository structure copied to clipboard");
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

  return (
    <div className="flex flex-col h-full rounded-lg">
      <div className="flex justify-between items-center rounded-lg mb-4 p-4 bg-gray-800/50">
        <h2 className="text-xl font-semibold text-white">{repository.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopyStructure}
            className="flex items-center text-nowrap gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
          >
            <Copy className="w-4 h-4" />
            Copy Structure
          </button>
          <button
            onClick={() => setExpandAll(!expandAll)}
            className="flex items-center text-nowrap gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white"
          >
            {expandAll ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
            {expandAll ? "Collapse All" : "Expand All"}
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <TreeView
          node={repository}
          onDelete={handleDelete}
          isExpanded={expandAll}
        />
      </div>
    </div>
  );
};
