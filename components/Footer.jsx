"use client";

import React from 'react';

// The = {} ensures that if settings aren't loaded yet, the site won't crash
export default function Footer({ settings = {} }) {
  
  
  return (
    <footer className="bg-gradient-to-r from-[#081C35] to-[#0E2F4F] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-4 items-start">
          
          {/* LOGO SECTION */}
          <div>
            
            <p className="text-gray-300 text-sm">
              Building accessible and compliant digital experiences that help businesses grow with confidence.
            </p>
          </div>

          {/* Dummy columns to maintain layout while you finish links */}
          <div><h3 className="text-sm font-semibold mb-5 text-white tracking-wide">LEGAL</h3></div>
          <div><h3 className="text-sm font-semibold mb-5 text-white tracking-wide">CONTACT</h3></div>
          <div><h3 className="text-sm font-semibold mb-5 text-white tracking-wide">SOCIAL</h3></div>
        </div>

        {/* COPYRIGHT SECTION */}
        <div className="border-t border-white/10 mt-14 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {settings?.copyright || "Verified Equal Access"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}