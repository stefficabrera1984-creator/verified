export default function Testimonials({ data, title, desc }) {

  if (!data) return null;

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* HEADING */}
        <div className="text-center mb-14">
          <div className="text-3xl md:text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: title || "" }}
          />

          <div
            className="text-gray-600 max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: desc || "" }}
          />
        </div>

        {/* GRID */}
        <div className="grid gap-8 md:grid-cols-3">

          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition duration-300 h-full flex flex-col"
            >

              {/* TEXT BLOCK */}
              <div className="flex gap-4 items-start flex-1">

                {/* QUOTE ICON */}
                <div className="text-[#2ED3B7] text-3xl md:text-4xl leading-none mt-1 shrink-0">
                  “
                </div>

                {/* TEXT */}
                <div
                  className="text-gray-700 text-base md:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>

              {/* USER */}
              <div className="flex items-center gap-3 mt-8">

                <img
                  src={item.img ? `http://127.0.0.1:8000/storage/${item.img}` : "/user1.jpg"}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />

                <div>
                  <p className="text-base md:text-lg font-semibold text-gray-900 leading-tight">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500 italic">
                    {item.role || "Satisfied Client"}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}