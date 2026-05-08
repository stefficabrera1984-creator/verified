"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import QuotesSection from "@/components/QuotesSection";

export const dynamic = "force-dynamic";
export default function Home() {

  // EXISTING STATES
  const [menuOpen, setMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  // ✅ ADD THIS (IMPORTANT)
  const [data, setData] = useState<any>(null);


  // ✅ API CALL
  useEffect(() => {
    fetch("/api/home")
      .then(res => res.json())
      .then((res) => {
        console.log("RAW API:", res);
  
        let parsedContent = res.content;
  
        // ✅ ONLY parse if it's a string
        if (typeof res.content === "string") {
          try {
            parsedContent = JSON.parse(res.content);
          } catch (e) {
            console.error("PARSE ERROR:", e);
            parsedContent = {};
          }
        }
  
        const finalData = {
          ...res,
          content: parsedContent || {}
        };
  
        console.log("FINAL DATA:", finalData);
  
        setData(finalData);
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, []);
   // ✅ IMPORTANT FIX
   if (!data) {
    return <div>Loading...</div>;
  }
   const content = data.content;
 
  return (
    
    <main className="bg-white text-gray-900">

      {/* HEADER */}
      <Header />

      
     {/* HERO SECTION */}
      <section className="relative bg-[#0B1F3A] text-white overflow-hidden">

        {/* RIGHT SIDE GRADIENT */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-[#1FAF9A]/30 to-transparent"></div>

        {/* BACKGROUND DECORATIONS */}

       

        {/* STARS */}
        <div className="absolute right-24 top-16 text-[#2ED3B7] text-xl md:text-2xl hidden sm:block">
          ✦
        </div>

        <div className="absolute right-6 bottom-20 text-[#2ED3B7] text-lg md:text-xl hidden sm:block">
          ✦
        </div>

        {/* CONTENT */}
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24 text-center">

          {/* HEADING */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
          {content.hero_title}
</h1>

          {/* SUBTEXT */}
          <div
  className="text-gray-300 text-base sm:text-lg mb-10 max-w-2xl mx-auto"
  dangerouslySetInnerHTML={{ __html: content.hero_subtitle }}
/>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            
            <button className="bg-[#2ED3B7] text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition">
            {content.hero_btn1}
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-md hover:bg-white hover:text-black transition">
            {content.hero_btn2}
            </button>

          </div>

        </div>

      </section>

     

      {/* WHY CHOOSE SECTION */}
      <section className="bg-white text-gray-900" id="why-care">

  {/* 🔥 SINGLE CONTAINER WITH PADDING */}
  <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">

      {/* LEFT IMAGE */}
      <div className="flex justify-center md:justify-start">
        <div className="relative">
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-full h-full bg-[#1FAF9A] rounded-2xl z-0"></div>

          <div className="absolute -top-4 -right-4 w-20 sm:w-24 opacity-30 hidden sm:block">
            <img src="/dots.png" alt="" />
          </div>

          <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg z-10">
            <img 
              src="/why-image.jpg" 
              alt="Accessibility support"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="text-center md:text-left">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
        {content.why_title}
        </h2>
        <div
  className="text-gray-600 mb-6 leading-relaxed"
  dangerouslySetInnerHTML={{ __html: content.why_desc }}
/>
    
<ul className="space-y-4 mb-8 text-gray-600">
  {content.why_points?.map((text: string, i: number) => {
    const parts = text.split(":");

    return (
      <li key={i} className="mb-2">
        <span className="font-semibold text-[#0A1E39]">
          {parts[0]}:
        </span>{" "}
        {parts.slice(1).join(":")}
      </li>
    );
  })}
</ul>

        
       
      </div>

    </div>

    {/* ✅ STATEMENT INSIDE SAME CONTAINER */}
    <div className="mt-12 md:mt-14 flex justify-center">

      <div className="flex items-stretch gap-4 max-w-3xl">

        <div className="w-[3px] bg-[#2ED3B7]"></div>

        <div className="text-lg md:text-xl font-semibold text-[#0A1E39] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content.highlight_line }}
        />

      </div>

    </div>

  </div>

</section>

<QuotesSection data={content.quotes} />
     
      {/* THREE STEPS SECTION */}
<section className="relative text-gray-900 overflow-hidden">

  {/* BACKGROUND GRADIENT */}
  <div className="absolute inset-0 bg-gradient-to-b from-[#EAF4F2] to-white z-0"></div>

  {/* CONTENT */}
  <div className="relative max-w-6xl mx-auto px-6 md:px-12 py-14 sm:py-16 md:py-24">

    {/* HEADING */}
    <div className="text-center mb-14 md:mb-16">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
      {content.steps_title}
      </h2>
      <div className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: content.steps_desc }}
      />
    </div>

    {/* CARDS */}
    <div className="grid gap-8 md:grid-cols-3">

{content.steps?.map((item: any, index: number) => (

  <div
    key={index}
    className="group relative bg-white rounded-2xl border border-gray-200 px-6 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
  >

    {/* STEP NUMBER */}
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0A1E39] text-white flex items-center justify-center font-semibold shadow-md ring-4 ring-white">
      {index + 1}
    </div>

    {/* ICON */}
    <div className="mt-8 mb-6 flex justify-center">
      <img
        src={`/step${index + 1}.png`} // 👈 static for now
        alt={item.title}
        className="w-20 h-20 object-contain transition duration-300 group-hover:scale-105"
      />
    </div>

    {/* TITLE */}
    <h3 className="text-lg md:text-xl font-bold mb-3 tracking-[0.5px]">
      {item.title}
    </h3>

    {/* TEXT */}
    <div
      className="text-gray-600 text-sm leading-relaxed max-w-[240px] mx-auto"
      dangerouslySetInnerHTML={{ __html: item.desc }}
    />

  </div>

))}

</div>

  </div>

</section>

{/* TESTIMONIAL SECTION */}
<Testimonials 
  data={content.testimonials}
  title={content.test_title}
  desc={content.test_desc}
/>

{/* Footer SECTION */}
<Footer />

 {/* ✅ ADD THIS AT VERY END */}
 <ScrollToTop />

    </main>
  );
}