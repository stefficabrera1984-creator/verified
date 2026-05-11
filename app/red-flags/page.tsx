"use client";

import { useState, useEffect } from "react";
import InnerHeader from "@/components/InnerHeader";
import Footer from "@/components/Footer";


export default function redFlags() {

  // ✅ ADD THIS (IMPORTANT)
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://backend.verifiedequalaccess.com/api/pages/red-flags");
        const json = await res.json();
  
        if (json) {
          // Laravel returns the object directly: { id: 1, slug: 'red-flags', content: {...} }
          let parsedContent = json.content;
  
          // If for some reason it comes back as a string, parse it
          if (typeof parsedContent === 'string') {
            parsedContent = JSON.parse(parsedContent);
          }
  
          setData({ ...json, content: parsedContent });
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchData();
  }, []);

if (!data || !data.content) {
  return <p className="p-10 text-center">Loading...</p>;
}
console.log("DATA:", data); // 👈 ADD HERE
const content = data?.content || {};
return (
    <>
      <InnerHeader />

      <main className="bg-white text-gray-900">

        {/* HERO */}
        <section className="bg-gradient-to-r from-[#1FAF9A] to-[#1FAF9A] text-white py-16 md:py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight mb-6">
          {content.hero_title}
            </h1>

         
            <div
  className="text-gray-600 text-lg leading-relaxed"
  dangerouslySetInnerHTML={{ __html: content.hero_subtitle }}
/>

          </div>
        </section>

        {/* INTRO */}
        <section className="py-12 md:py-16 px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              The accessibility space is filled with quick fixes and bold promises.
              Understanding the difference between real remediation and risky shortcuts
              is essential to protecting your business.
            </p>
          </div>
        </section>

        {/* RED FLAGS */}
     {/* RED FLAGS GRID */}
<section className="py-16 md:py-20 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
    
    {/* Explicitly telling TypeScript that 'card' is an object and 'index' is a number */}
    {Array.isArray(content?.cards) ? (
      content.cards.map((card: any, index: number) => (
        <div 
          key={index} 
          className="p-6 border border-red-100 rounded-xl hover:shadow-md transition bg-white"
        >
          <h3 className="text-lg font-semibold mb-2 text-[#0A1E39]">
            🚩 {card?.title || "No Title"}
          </h3>

          <p className="text-gray-600 text-sm mb-4">
            {card?.desc || "No Description"}
          </p>
        </div>
      ))
    ) : (
      /* Fallback in case cards aren't an array yet */
      <p className="text-gray-400">Loading flags...</p>
    )}

  </div>
</section>
        {/* CTA */}
        <section className="bg-[#E6F6F3] py-16 md:py-20 text-center px-6">
          <div className="max-w-3xl mx-auto">

          <h3 className="text-2xl md:text-3xl font-semibold text-[#0A1E39] mb-4">
    {content.cta_title}
    </h3>

    <div className="text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: content.cta_desc }} />

    <button className="bg-[#2ED3B7] text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition">
    {content.cta_button}
    </button>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}