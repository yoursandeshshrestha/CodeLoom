import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Repo Explorer",
  description: "Simplify debugging with AI-powered repository exploration.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            className: "bg-gray-800 text-white",
            duration: 1000,
            style: {
              background: "#1F1F24",
              color: "#fff",
              border: "1px solid rgba(139, 92, 246, 0.3)",
            },
          }}
        />
      </body>
    </html>
  );
}
