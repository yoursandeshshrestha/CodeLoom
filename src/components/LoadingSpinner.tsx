import React from "react";

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-3">
        <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-300">Loading...</span>
      </div>
    </div>
  );
};
