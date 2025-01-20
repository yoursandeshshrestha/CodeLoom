import React from "react";
import { Key } from "lucide-react";

interface AuthInputProps {
  token: string;
  setToken: (token: string) => void;
}

export const AuthInput: React.FC<AuthInputProps> = ({ token, setToken }) => (
  <div className="mb-6">
    <div className="flex items-center mb-2">
      <Key className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
      <label
        htmlFor="token"
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        GitHub Token (optional, required for private repos)
      </label>
    </div>
    <input
      type="password"
      id="token"
      value={token}
      onChange={(e) => setToken(e.target.value)}
      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
    />
    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
      Generate a token at{" "}
      <a
        href="https://github.com/settings/tokens"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub Settings
      </a>{" "}
      with 'repo' scope
    </p>
  </div>
);
