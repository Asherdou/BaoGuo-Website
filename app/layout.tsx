import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") || incoming.get("host") || "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/baoguo-icon.png", metadataBase).toString();

  return {
    metadataBase,
    title: "BaoGuo｜美国 Permit 模拟考试",
    description: "按州练习美国 DMV Permit 笔试，查看正确率并自动复习错题。",
    icons: { icon: "/baoguo-icon.png", shortcut: "/baoguo-icon.png", apple: "/baoguo-icon.png" },
    openGraph: {
      title: "BaoGuo｜先选对州，再练对题",
      description: "覆盖美国 50 州与华盛顿特区，错题自动收集。",
      images: [socialImage],
    },
    twitter: { card: "summary_large_image", images: [socialImage] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <footer className="site-footer"><div className="shell"><span>© 2026 BaoGuo</span><span>独立学习工具 · 非政府官方网站</span></div></footer>
      </body>
    </html>
  );
}
