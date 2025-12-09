import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Flight Search",
  description: "Search for flights from a sample REST API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {/* Header */}
        <header className="bg-primary py-4 px-4 shadow-md">
          <Link href="/" className="text-white text-xl font-semibold">
            Flight Search
          </Link>
        </header>

        {/* Main Content */}
        <main className="py-8">{children}</main>
      </body>
    </html>
  );
}

