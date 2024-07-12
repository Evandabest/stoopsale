import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Stoop Sale Sniper",
  description: "Stoop Sale Sniper is a platform for finding and sharing local stoop sales.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-black overflow-x-hidden">
        <Navbar />
        <main className="flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
