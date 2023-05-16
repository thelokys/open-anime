import "./globals.css";
import { Roboto } from "next/font/google";

export const metadata = {
  title: "Animes",
  description: "Open Animes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-800 text-zinc-50">{children}</body>
    </html>
  );
}
