import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "SOD",
  description: "Sodmaster Online platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
