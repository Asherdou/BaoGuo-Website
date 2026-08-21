"use client";

import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a href="/" className="brand" aria-label="BaoGuo 首页">
          <img className="brand-mark" src="/baoguo-icon.png" alt="" />
          <span>BaoGuo</span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="/" className={pathname === "/" ? "active" : ""}>选择州</a>
          <a href="/exam" className={pathname === "/exam" ? "active" : ""}>模拟考试</a>
          <a href="/mistakes" className={pathname === "/mistakes" ? "active" : ""}>错题本</a>
        </nav>
      </div>
    </header>
  );
}
