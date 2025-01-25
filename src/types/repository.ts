export interface FileNode {
  name: string;
  type: "file" | "directory";
  path: string;
  children?: FileNode[];
  content?: string;
}

export interface RepositoryState {
  url: string;
  structure: FileNode | null;
  isLoading: boolean;
  error: string | null;
}
