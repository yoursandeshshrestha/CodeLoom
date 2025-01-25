import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Trash } from "lucide-react";
import { FileNode } from "../types/repository";
import { FileIcon } from "@/components/FIleIcon";

interface TreeViewProps {
  node: FileNode;
  onDelete?: (path: string) => void;
  isExpanded?: boolean; // Parent-driven expansion state
  initialExpanded?: boolean; // Initial expanded state for the main folder
  level?: number;
  onExpandChange?: (isExpanded: boolean) => void; // Notify parent of expand/collapse
}

export const TreeView: React.FC<TreeViewProps> = ({
  node,
  onDelete,
  isExpanded: parentExpanded,
  initialExpanded = false,
  level = 0,
  onExpandChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  useEffect(() => {
    if (parentExpanded !== undefined) {
      setIsExpanded(parentExpanded);
    }
  }, [parentExpanded]);

  useEffect(() => {
    if (onExpandChange) {
      onExpandChange(isExpanded);
    }
  }, [isExpanded, onExpandChange]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(node.path);
  };

  const levelPadding = `${level * 16}px`;

  if (node.type === "file") {
    return (
      <div
        className="flex items-center py-1 hover:bg-gray-800 rounded px-2 group"
        style={{ paddingLeft: levelPadding }}
      >
        <FileIcon filename={node.name} className="w-4 h-4 mr-2 text-gray-300" />
        <span className="text-gray-300">{node.name}</span>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="ml-auto opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"
            title="Delete"
          >
            <Trash className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center py-1 cursor-pointer hover:bg-gray-800 rounded px-2 group"
        style={{ paddingLeft: levelPadding }}
        onClick={toggleExpand}
      >
        <button
          onClick={toggleExpand}
          className="p-1 hover:bg-gray-700 rounded"
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>
        <FileIcon filename="folder" className="w-4 h-4 mr-2 text-gray-200" />
        <span className="text-gray-300">{node.name}</span>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="ml-auto opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"
            title="Delete"
          >
            <Trash className="w-4 h-4" />
          </button>
        )}
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeView
              key={child.path}
              node={child}
              onDelete={onDelete}
              isExpanded={parentExpanded}
              level={level + 1}
              onExpandChange={onExpandChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};
