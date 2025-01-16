import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Repo Explorer",
  description: "Explore your repository with AI assistance.",
};

export default function Page() {
  return (
    <div className="bg-background h-screen">Welcome to Repo Explorer!</div>
  );
}
