import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  url: string;
  setUrl: (url: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  url,
  setUrl,
  onSubmit,
  loading,
  error,
}) => (
  <form onSubmit={onSubmit} className="mb-6">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste GitHub or Bitbucket repository URL"
        className="w-full pl-12 pr-32 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-medium"
      >
        {loading ? "Loading..." : "Generate"}
      </button>
    </div>
    {error && (
      <p className="mt-2 text-red-500 dark:text-red-400 text-sm">{error}</p>
    )}
  </form>
);
