// import React from "react";
// import {
//   File,
//   FileJson,
//   FileText,
//   FileCode,
//   FileType,
//   FileImage,
//   FileArchive,
//   FileAudio,
//   FileVideo,
//   FileSpreadsheet,
//   Folder,
//   Terminal,
//   Globe,
//   Database,
//   Settings,
//   Lock,
// } from "lucide-react";
// import clsx from "clsx";

// interface FileIconProps {
//   filename: string;
//   className?: string;
// }

// export const FileIcon: React.FC<FileIconProps> = ({ filename, className }) => {
//   const extension = filename.split(".").pop()?.toLowerCase();

//   if (filename === "folder") {
//     return <Folder className={className} />;
//   }

//   const getIcon = () => {
//     // Configuration files
//     if (
//       filename.match(/^\.env/i) ||
//       filename.match(/config\.(js|ts|json)$/i) ||
//       filename.match(/\.(yaml|yml)$/i)
//     ) {
//       return Settings;
//     }

//     // Security files
//     if (filename.match(/\.(pem|key|crt|cer|ca|csr)$/i)) {
//       return Lock;
//     }

//     // Code files
//     if (
//       extension &&
//       [
//         "js",
//         "jsx",
//         "ts",
//         "tsx",
//         "vue",
//         "svelte",
//         "py",
//         "rb",
//         "php",
//         "java",
//         "go",
//         "rs",
//         "c",
//         "cpp",
//         "h",
//         "hpp",
//         "cs",
//         "swift",
//       ].includes(extension)
//     ) {
//       return FileCode;
//     }

//     // Shell scripts
//     if (extension && ["sh", "bash", "zsh", "fish"].includes(extension)) {
//       return Terminal;
//     }

//     // Web files
//     if (
//       extension &&
//       ["html", "htm", "css", "scss", "sass"].includes(extension)
//     ) {
//       return Globe;
//     }

//     // Database files
//     if (extension && ["sql", "prisma", "graphql"].includes(extension)) {
//       return Database;
//     }

//     // JSON files
//     if (extension === "json") {
//       return FileJson;
//     }

//     // Text files
//     if (extension && ["txt", "md", "markdown", "log"].includes(extension)) {
//       return FileText;
//     }

//     // Font files
//     if (extension && ["ttf", "otf", "woff", "woff2"].includes(extension)) {
//       return FileType;
//     }

//     // Image files
//     if (
//       extension &&
//       ["jpg", "jpeg", "png", "gif", "svg", "webp"].includes(extension)
//     ) {
//       return FileImage;
//     }

//     // Archive files
//     if (extension && ["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
//       return FileArchive;
//     }

//     // Audio files
//     if (extension && ["mp3", "wav", "ogg", "m4a"].includes(extension)) {
//       return FileAudio;
//     }

//     // Video files
//     if (extension && ["mp4", "webm", "avi", "mov"].includes(extension)) {
//       return FileVideo;
//     }

//     // Spreadsheet files
//     if (extension && ["csv", "xlsx", "xls"].includes(extension)) {
//       return FileSpreadsheet;
//     }

//     return File;
//   };

//   const Icon = getIcon();
//   return <Icon className={clsx(className)} />;
// };

import React from "react";
import { File, Folder } from "lucide-react";

interface FileIconProps {
  filename: string;
  className?: string;
}

export const FileIcon: React.FC<FileIconProps> = ({ filename, className }) => {
  if (filename === "folder") {
    return <Folder className={className} />;
  }

  return <File className={className} />;
};
