"use client";

import { useState, useEffect } from "react";
import InnerHeader from "@/components/InnerHeader";
import Footer from "@/components/Footer";

export default function theTruth() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/the-truth")
      .then(res => res.json())
      .then((res) => {
        console.log("truth:", res);
        setData(res);
      })
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return <p className="p-10 text-center">Loading...</p>;
  }

  const content = data.content; // ✅ IMPORTANT FIX
  console.log("LEGAL FULL DATA:", data);
  return (
    <>
      <InnerHeader />
    <main className="bg-white text-gray-900">

      {/* HERO */}
      <section className="bg-gradient-to-r from-[#1FAF9A] to-[#1FAF9A] text-white py-16 md:py-20 px-6 text-center z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight mb-6">
          {content?.hero_title}
          </h1>

          <div className="text-gray-300 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: content?.hero_subtitle }}
          />
        </div>
      </section>

      {/* INTRO */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          {content.section_title}
          </h2>
          <div className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.section_desc }}
          />
        </div>
      </section>

      {/* RISK CARDS */}
      <section className="pb-16 md:pb-20 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

    {data?.content?.cards?.map(
      (card: { title: string; desc: string }, index: number) => (
        <div
          key={index}
          className="p-6 border border-green-100 rounded-xl hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold mb-2">
            📈 {card.title}
          </h3>

          <div
            className="text-gray-600 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: card.desc,
            }}
          />
        </div>
      )
    )}

  </div>
</section>

      {/* HIGHLIGHT STRIP */}
      <section className="bg-[#F3F8F7] py-12 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-lg md:text-xl font-medium text-[#0A1E39] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content.highlight_text }}
          />
        </div>
      </section>

      {/* DEFENSE SECTION */}
      <section className="py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">

          <h2 className="text-2xl md:text-3xl font-semibold">
          {content.final_title}
          </h2>

          <p className="text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: content.final_desc }}
          />

          <p className="text-xl md:text-2xl font-semibold text-[#0A1E39]" dangerouslySetInnerHTML={{ __html: content.final_bold }}
          />

        </div>
      </section>

      {/* FINAL CTA */}
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