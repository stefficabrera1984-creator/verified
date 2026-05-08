export default function QuotesSection({ data }) {

  if (!data) return null;

  return (
    <section className="bg-[#F9FBFB] px-6 py-16">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

        {data.map((quote, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 border-l-4 border-[#2ED3B7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >

            <p className="text-[#2ED3B7] text-2xl mb-3">“</p>

            <div
              className="text-[#0A1E39] italic leading-relaxed text-base md:text-lg"
              dangerouslySetInnerHTML={{ __html: quote.text }}
            />

            <p className="mt-4 text-sm text-gray-500 font-medium">
              — {quote.author}
            </p>

          </div>

        ))}

      </div>

    </section>
  );
}