import { FileNode } from "../types/repository";

export const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
};

export const generateTreeText = (
  node: FileNode,
  options: {
    prefix?: string;
    isLast?: boolean;
  } = {}
): string => {
  const { prefix = "", isLast = true } = options;

  const treeSymbols = {
    vertical: "│   ",
    branch: "├── ",
    lastBranch: "└── ",
  };

  let result = `${prefix}${
    isLast ? treeSymbols.lastBranch : treeSymbols.branch
  }${node.name}\n`;

  if (node.type === "directory" && node.children && node.children.length > 0) {
    const sortedChildren = node.children.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    sortedChildren.forEach((child, index) => {
      const isLastChild = index === sortedChildren.length - 1;
      const newPrefix = prefix + (isLast ? "    " : treeSymbols.vertical);

      result += generateTreeText(child, {
        prefix: newPrefix,
        isLast: isLastChild,
      });
    });
  }

  return result;
};

export const processGithubTree = (tree: any[], url: string): FileNode => {
  const structure: FileNode = {
    name: url.split("/").pop() || "Repository",
    type: "directory",
    path: "/",
    children: [],
  };
  const sortNodes = (nodes: FileNode[]) => {
    return nodes.sort((a, b) => {
      if (a.type === "directory" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "directory") return 1;
      return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });
  };

  const sortedItems = tree.sort((a, b) => {
    const aIsDir = a.type === "tree";
    const bIsDir = b.type === "tree";

    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;

    return a.path.toLowerCase().localeCompare(b.path.toLowerCase());
  });

  for (const item of sortedItems) {
    const pathParts = item.path.split("/");
    const fileName = pathParts.pop()!;
    let currentNode = structure;

    for (const part of pathParts) {
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

    if (item.type === "tree") {
      currentNode.children = currentNode.children || [];
      currentNode.children.push({
        name: fileName,
        type: "directory",
        path: item.path,
        children: [],
      });
    } else if (item.type === "blob") {
      currentNode.children = currentNode.children || [];
      currentNode.children.push({
        name: fileName,
        type: "file",
        path: item.path,
      });
    }
  }

  const sortDirectory = (node: FileNode) => {
    if (node.children) {
      node.children = sortNodes(node.children);
      node.children.forEach((child) => {
        if (child.type === "directory") {
          sortDirectory(child);
        }
      });
    }
  };

  sortDirectory(structure);

  return structure;
};
