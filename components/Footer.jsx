"use client";

import React from 'react';

export default function Footer({ settings = {} }) { // ✅ Added = {} as a default
  
  // Create a safe URL with a fallback
  const logoPath = settings?.inner_logo 
    ? `https://backend.verifiedequalaccess.com/storage/${settings.inner_logo}` 
    : "/logonew.png";

  return (
    <footer className="bg-gradient-to-r from-[#081C35] to-[#0E2F4F] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-4 items-start">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logoPath} 
                alt="logo" 
                className="w-44 md:w-52 h-auto object-contain" 
              />
            </div>
            <p className="text-gray-300 text-sm">
              Building accessible and compliant digital experiences that help businesses grow with confidence.
            </p>
          </div>

          {/* Dummy Legal/Contact/Social columns to keep structure */}
          <div><h3 className="text-sm font-semibold mb-5">LEGAL</h3></div>
          <div><h3 className="text-sm font-semibold mb-5">CONTACT</h3></div>
          <div><h3 className="text-sm font-semibold mb-5">SOCIAL</h3></div>
        </div>

        <div className="border-t border-white/10 mt-14 pt-6 text-center">
        <p className="text-sm text-gray-500">
          {/* ✅ Safely checks for copyright, falls back to default if empty */}
          © {currentYear} {settings?.footer_copyright}
        </p>
        </div>
      </div>
    </footer>
  );
}