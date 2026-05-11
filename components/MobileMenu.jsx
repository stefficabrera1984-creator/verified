"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileMenu({ menuOpen, setMenuOpen, theme = "dark", menuItems = [] }) {
  const pathname = usePathname();

  const normalize = (path) => path.replace(/\/$/, "") || "/";
  const currentPath = normalize(pathname);

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-[#0B1F3A]" : "bg-white";
  const textColor = isDark ? "text-white" : "text-gray-800";
  const activeColor = "text-[#2ED3B7] font-semibold";

  return (
    <>
      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9998]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm z-[9999] transform transition-transform duration-300 ${bgColor} shadow-2xl ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* CLOSE */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMenuOpen(false)}
              className="text-2xl cursor-pointer"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="mt-2 space-y-2">
            {menuItems.map((item, index) => {
              const rawSlug = item.slug || "";
              // Same logic as Header for path consistency
              const path =
                rawSlug === "/" || rawSlug === "home"
                  ? "/"
                  : rawSlug.startsWith("/")
                  ? rawSlug
                  : `/${rawSlug}`;

              const isItemActive = currentPath === path;

              // HOME / SCROLL LOGIC
              if (path === "/") {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setMenuOpen(false);
                      if (pathname === "/") {
                        const section = document.getElementById("why-care");
                        if (section) section.scrollIntoView({ behavior: "smooth" });
                      } else {
                        window.location.href = "/#why-care";
                      }
                    }}
                    className={`group relative block w-full text-left text-lg py-3 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                      isItemActive
                        ? activeColor
                        : `${textColor} hover:text-[#2ED3B7] hover:bg-white/5 active:scale-[0.98]`
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-[#2ED3B7] rounded-full transition-opacity duration-200 ${
                        isItemActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <span className="ml-3">{item.title}</span>
                  </button>
                );
              }

              // INTERNAL PAGES
              return (
                <Link
                  key={index}
                  href={path}
                  onClick={() => setMenuOpen(false)}
                  className={`group relative block text-lg py-3 px-3 rounded-md cursor-pointer transition-all duration-200 ${
                    isItemActive
                      ? activeColor
                      : `${textColor} hover:text-[#2ED3B7] hover:bg-white/5 active:scale-[0.98]`
                  }`}
                >
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] bg-[#2ED3B7] rounded-full transition-opacity duration-200 ${
                      isItemActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                  <span className="ml-3">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}