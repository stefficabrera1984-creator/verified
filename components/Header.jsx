"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoAlt, setLogoAlt] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const normalize = (path) => path.replace(/\/$/, "");
  const isActive = (path) => normalize(pathname) === path;

  const linkBase =
    "group relative px-2 py-1 text-base md:text-[16px] font-medium tracking-wide transition-all duration-300";

  // Use the Environment Variable we set in Vercel
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // 🔹 FETCH MENUS
    fetch(`${API_BASE_URL}/menu-pages`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MENU DATA:", data);
        // Ensure we are getting the array of pages correctly
        setMenuItems(Array.isArray(data) ? data : data.data || []);
      })
      .catch((err) => console.error("Menu fetch error:", err));

    // 🔹 FETCH SETTINGS
    fetch(`${API_BASE_URL}/settings`)
      .then((res) => res.json())
      .then((data) => {
        const settings = data?.data || data;
        setLogo(settings?.site_logo || null);
        setLogoAlt(settings?.logo_alt || "");
      })
      .catch((err) => console.error("Settings error:", err));
  }, [API_BASE_URL]);

  return (
    <header className="bg-[#0B1F3A] text-white sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
        {/* LOGO */}
        <Link href="/">
        {logo && (
          <img
            src={`${API_BASE_URL.replace('/api', '')}/storage/${logo}`}
            alt={logoAlt || "Logo"}
            width={140}
          />
        )}
      </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item, index) => {
            const rawSlug = item.slug || "";
            const path =
              rawSlug === "/" || rawSlug === "home"
                ? "/"
                : rawSlug.startsWith("/")
                ? rawSlug
                : `/${rawSlug}`;

            if (path === "/") {
              return (
                <button
                  key={index}
                  onClick={() => {
                    const section = document.getElementById("why-care");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`${linkBase} ${
                    pathname === "/" ? "text-white" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.title}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#2ED3B7] ${
                      pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </button>
              );
            }

            return (
              <Link
                key={index}
                href={path}
                className={`${linkBase} ${
                  pathname === path ? "text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.title}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#2ED3B7] ${
                    pathname === path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* MOBILE BUTTON */}
        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme="dark"
        menuItems={menuItems}
      />
    </header>
  );
}