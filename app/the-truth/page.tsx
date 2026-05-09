"use client";

import { useState, useEffect } from "react";
import InnerHeader from "@/components/InnerHeader";
import Footer from "@/components/Footer";


export default function theTruth() {

  // ✅ ADD THIS (IMPORTANT)
  const [data, setData] = useState<any>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://verifiedequalaccess.com/backend/index.php/api/pages/the-truth"
      );
      
      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      const json = await res.json();

      console.log("FINAL DATA:", json);

      setData(json);

    } catch (error) {
      console.error("FETCH ERROR:", error);
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
          <div className="max-w-3xl mx-auto">

            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
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
            <div className="text-lg text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.intro }} /> 
          </div>
        </section>

        {/* PHASES */}
        <section className="py-16 md:py-20 px-6">
  <div className="max-w-5xl mx-auto space-y-12">

    {content?.steps?.map((step: any, i: number) => (
      <div key={i} className="flex gap-6">

        {/* NUMBER */}
        <div className="text-[#2ED3B7] font-bold text-xl">
          {String(i + 1).padStart(2, "0")}
        </div>

        {/* CONTENT */}
        <div>

          <h3 className="text-xl font-semibold mb-2">
            {step.title}
          </h3>

          {/* ✅ FIXED: subtitle instead of desc */}
          <div
            className="text-gray-600 text-sm mb-4"
            dangerouslySetInnerHTML={{ __html: step.subtitle }}
          />

          {/* SUB POINTS */}
          <div className="space-y-4">
            {step?.points?.map((point: string, j: number) => (
              <div
                key={j}
                className="bg-[#F9FBFB] p-4 rounded-lg border-l-4 border-[#2ED3B7]"
              >
                <p className="text-sm text-gray-700">
                  {point} {/* ✅ FIXED: simple string */}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    ))}

  </div>
</section>

        {/* GOAL SECTION */}
        <section className="bg-white py-16 md:py-20 text-center px-6">
  <div className="max-w-3xl mx-auto">

    {/* subtle accent */}
    <div className="w-12 h-[2px] bg-[#2ED3B7] mx-auto mb-6"></div>

    <h3 className="text-2xl md:text-3xl font-semibold text-[#0A1E39] mb-4">
    {content.goal_title}
    </h3>

    <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.goal_desc }} />
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