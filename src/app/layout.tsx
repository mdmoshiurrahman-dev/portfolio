import type { Metadata } from "next";
import "./globals.css";
import { ScrollProgress } from "@/components/scroll-progress";

export const metadata: Metadata = {
  title: "MOSHIUR",
  description: "Building digital experiences with code and curiosity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
