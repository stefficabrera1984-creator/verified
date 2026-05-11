"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import MobileMenu from "@/components/MobileMenu";

export default function InnerHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoAlt, setLogoAlt] = useState("");
  const [menuItems, setMenuItems] = useState([]); // Default to empty array

  const normalize = (path) => path.replace(/\/$/, "");

  // WHY CARE SCROLL
  const goToWhyCare = () => {
    setMenuOpen(false);
    if (normalize(pathname) === "/") {
      const section = document.getElementById("why-care");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
      setTimeout(() => {
        const section = document.getElementById("why-care");
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  };

  const linkBase =
    "group relative px-2 py-2 text-base md:text-[16px] font-medium tracking-wide transition-all duration-300";

  useEffect(() => {
    // 🔹 FETCH MENUS
    fetch("https://backend.verifiedequalaccess.com/api/menu-pages")
      .then(res => res.json())
      .then(data => {
        // Safety check to ensure menuItems is always an array
        const items = Array.isArray(data) ? data : (data.data || []);
        setMenuItems(items);
      })
      .catch(err => {
        console.error("Menu error:", err);
        setMenuItems([]); // Fallback
      });
      
    // 🔹 FETCH SETTINGS
    fetch("https://backend.verifiedequalaccess.com/api/settings")
      .then(res => res.json())
      .then(data => {
        // Look for 'setting' (singular) as verified in your JSON response
        const config = data?.setting || data?.data || data;
        if (config) {
          // For InnerHeader, use inner_logo
          setLogo(config.inner_logo || null);
          setLogoAlt(config.logo_alt || "");
        }
      })
      .catch(err => console.error("Settings error:", err));
  }, []);

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link href="/">
            {logo ? (
              <img
                src={`https://backend.verifiedequalaccess.com/storage/${logo}`}
                alt={logoAlt || "Logo"}
                width={140}
                className="object-contain"
              />
            ) : (
              <span className="text-gray-800 font-bold">Verified Access</span>
            )}
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Added check to ensure menuItems is an array before mapping */}
            {Array.isArray(menuItems) && menuItems.map((item, index) => {
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
                    onClick={goToWhyCare}
                    className={`${linkBase} ${
                      pathname === "/" ? "text-black" : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {item.title}
                    <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#2ED3B7] ${pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                  </button>
                );
              }

              return (
                <Link
                  key={index}
                  href={path}
                  className={`${linkBase} ${
                    pathname === path ? "text-black" : "text-gray-700 hover:text-black"
                  }`}
                >
                  {item.title}
                  <span className={`absolute left-0 -bottom-1 h-[2px] w-full bg-[#2ED3B7] ${pathname === path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
              );
            })}
          </nav>

          {/* MOBILE BUTTON */}
          <button className="md:hidden text-2xl text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        theme="light"
        menuItems={menuItems}
      />
    </>
  );
}