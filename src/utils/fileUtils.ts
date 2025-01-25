import { FileNode } from "../types/repository";

export const getFileExtension = (filename: string): string => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
};

export const generateTreeText = (node: FileNode, level = 0): string => {
  const indent = "  ".repeat(level);
  const prefix = level === 0 ? "" : node.type === "directory" ? "├── " : "│   ";

  let result = `${indent}${prefix}${node.name}\n`;

  if (node.type === "directory" && node.children) {
    result += node.children
      .map((child) => generateTreeText(child, level + 1))
      .join("");
  }

  return result;
};

// export const processGithubTree = (tree: any[], url: string): FileNode => {
//   const structure: FileNode = {
//     name: url.split("/").pop() || "Repository",
//     type: "directory",
//     path: "/",
//     children: [],
//   };

//   // Sort items by path depth and then alphabetically
//   const sortedItems = tree.sort((a, b) => {
//     const aDepth = a.path.split("/").length;
//     const bDepth = b.path.split("/").length;
//     if (aDepth !== bDepth) return aDepth - bDepth;
//     return a.path.localeCompare(b.path);
//   });

//   for (const item of sortedItems) {
//     const pathParts = item.path.split("/");
//     const fileName = pathParts.pop()!;
//     let currentNode = structure;

//     for (const part of pathParts) {
//       let child = currentNode.children?.find(
//         (n) => n.type === "directory" && n.name === part
//       );
//       if (!child) {
//         child = {
//           name: part,
//           type: "directory",
//           path: `${currentNode.path}${part}/`,
//           children: [],
//         };
//         currentNode.children = currentNode.children || [];
//         currentNode.children.push(child);
//       }
//       currentNode = child;
//     }

//     if (item.type === "blob") {
//       currentNode.children = currentNode.children || [];
//       currentNode.children.push({
//         name: fileName,
//         type: "file",
//         path: item.path,
//       });
//     }
//   }

//   return structure;
// };

export const processGithubTree = (tree: any[], url: string): FileNode => {
  const structure: FileNode = {
    name: url.split("/").pop() || "Repository",
    type: "directory",
    path: "/",
    children: [],
  };

  // GitHub-like sorting:
  // 1. Directories come before files
  // 2. Within directories/files, alphabetical order (case-insensitive)
  const sortedItems = tree.sort((a, b) => {
    // Determine if items are directories
    const aIsDir = a.type === "tree";
    const bIsDir = b.type === "tree";

    // First, sort directories before files
    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;

    // Then sort alphabetically (case-insensitive)
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

    // Use 'tree' for directories in GitHub API
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

  // Recursively sort children of each directory
  const sortDirectory = (node: FileNode) => {
    if (node.children) {
      node.children.sort((a, b) => {
        // Directories before files
        if (a.type === "directory" && b.type === "file") return -1;
        if (a.type === "file" && b.type === "directory") return 1;

        // Then alphabetical (case-insensitive)
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });

      // Recursively sort child directories
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

export const getFileIcon = (filename: string): string => {
  const extension = getFileExtension(filename);

  const iconMap: { [key: string]: string } = {
    // Code files
    js: "📄",
    ts: "📄",
    jsx: "📄",
    tsx: "📄",
    py: "🐍",
    java: "☕",
    cpp: "🧩",
    cs: "🔷",
    html: "🌐",
    css: "🎨",
    scss: "🎨",
    sass: "🎨",

    // Document files
    md: "📝",
    txt: "📄",
    json: "{}",
    yml: "📋",
    yaml: "📋",

    // Image files
    png: "🖼️",
    jpg: "🖼️",
    jpeg: "🖼️",
    gif: "🖼️",
    svg: "🖼️",

    // Archive files
    zip: "🗄️",
    rar: "🗄️",
    tar: "🗄️",
    gz: "🗄️",

    // Other common files
    pdf: "📕",
    xlsx: "📊",
    csv: "📊",
  };

  return iconMap[extension] || "📁";
};
