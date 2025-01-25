import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { FileNode } from "../types/repository";
import { getFileIcon } from "../utils/fileUtils";
import clsx from "clsx";
import { FileIcon } from "./FIleIcon";

interface TreeViewProps {
  node: FileNode;
  onDelete?: (path: string) => void;
  isExpanded?: boolean;
  level?: number;
}

export const TreeView: React.FC<TreeViewProps> = ({
  node,
  onDelete,
  isExpanded: parentExpanded,
  level = 0,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const iconColor = getFileIcon(node.name);

  useEffect(() => {
    if (parentExpanded !== undefined) {
      setIsExpanded(parentExpanded);
    }
  }, [parentExpanded]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(node.path);
  };

  if (node.type === "file") {
    return (
      <div className="flex items-center py-1 hover:bg-gray-800 rounded px-2 group">
        <div style={{ width: `${level * 16}px` }} />
        <FileIcon filename={node.name} className="w-4 h-4 mr-2 text-gray-300" />
        <span className="text-gray-300">{node.name}</span>
        {onDelete && (
          <button
            onClick={handleDelete}
            className="ml-auto opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div
        className="flex items-center py-1 cursor-pointer hover:bg-gray-800 rounded px-2 group"
        onClick={toggleExpand}
      >
        <div style={{ width: `${level * 16}px` }} />
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
          >
            Delete
          </button>
        )}
      </div>
      {isExpanded && node.children && (
        <div>
          {node.children.map((child, index) => (
            <TreeView
              key={`${child.path}-${index}`}
              node={child}
              onDelete={onDelete}
              isExpanded={parentExpanded}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
