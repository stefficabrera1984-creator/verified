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
      const res = await fetch(
        "https://verifiedequalaccess.com/backend/index.php/api/pages/red-flags"
      );

      const json = await res.json();

      console.log("API RAW:", json);

      // ✅ SAFE PARSE (no crash)
      let parsedContent = {};
      try {
        parsedContent = json.content ? JSON.parse(json.content) : {};
      } catch (e) {
        console.error("JSON PARSE ERROR:", e);
      }

      const finalData = {
        ...json,
        content: parsedContent,
      };

      console.log("FINAL DATA:", finalData);

      setData(finalData);

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
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

            {/* FLAG 1 */}
            <div className="p-6 border border-red-100 rounded-xl hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2 text-[#0A1E39]">
                🚩 The “100% Guaranteed” Myth
              </h3>

              <p className="text-gray-600 text-sm mb-4">
              If a company claims their software can make you "100% compliant in 48 hours," walk away.
              </p>

              <div className="space-y-2 text-sm">
                <p><span className="font-semibold text-[#0A1E39]">Reality:</span> ADA compliance is highly contextual. No AI can perfectly determine if your video captions are accurate or if your custom navigation menu makes sense to a human user. Automated tools typically only catch 25–30% of accessibility issues.</p>
              </div>
            </div>

            {/* FLAG 2 */}
            <div className="p-6 border border-red-100 rounded-xl hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2 text-[#0A1E39]">
                🚩 Over-Reliance on "Overlays" as a Permanent Fix
              </h3>

              <p className="text-gray-600 text-sm mb-4">
              While a widget is a helpful first step, some vendors sell them as a total solution.
              </p>

              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Trap:</span> These companies use JavaScript to "mask" errors rather than fixing your website’s source code.</p>
                <p><span className="font-semibold">Consequence:</span> Plaintiff attorneys and "troll" bots can target websites with these overlays only because they know the underlying code is likely still broken. In 2024 and 2025, over 1,000 businesses were sued despite having these widgets installed and this number is starting to exponentially grow.</p>
              </div>
            </div>

            {/* FLAG 3 */}
            <div className="p-6 border border-red-100 rounded-xl hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2 text-[#0A1E39]">
                🚩 Predatory "Demand Letter" Vendors
              </h3>

              <p className="text-gray-600 text-sm mb-4">
              Some companies have been known to work in a "sue-and-settle" cycle, where they scan for non-compliant sites to trigger legal threats, then offer their own subpar software as the "solution."
              </p>

              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Trap:</span> They profit from the problem they’ve identified.</p>
                <p><span className="font-semibold">Consequence:</span> This creates a conflict of interest where their goal is a quick paycheck, not your long-term legal protection.</p>
              </div>
            </div>

            {/* FLAG 4 */}
            <div className="p-6 border border-red-100 rounded-xl hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-2 text-[#0A1E39]">
                🚩 The "Set It and Forget It" Deception
              </h3>

              <p className="text-gray-600 text-sm mb-4">
              Compliance is not a one-time event.
              </p>

              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Trap:</span> Bad players promise that their AI will monitor your site forever with zero input from you.</p>
                <p><span className="font-semibold">Consequence:</span> Digital content is dynamic. When you add a new product or a blog post, these "hands-off" tools often fail to tag images or structure headers correctly, leaving you open to new risks every single day.</p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#E6F6F3] py-16 md:py-20 text-center px-6">
          <div className="max-w-3xl mx-auto">

            <h3 className="text-2xl md:text-3xl font-semibold text-[#0A1E39] mb-4">
              Don’t fall for shortcuts—
            </h3>

            <p className="text-gray-600 mb-6">
              build accessibility the right way from the start.
            </p>

            <button className="bg-[#2ED3B7] text-black px-6 py-3 rounded-md font-medium hover:opacity-90 transition">
              Request an Audit
            </button>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}