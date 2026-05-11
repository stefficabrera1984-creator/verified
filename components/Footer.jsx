export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#081C35] to-[#0E2F4F] text-white pt-20 pb-10">

      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-4 items-start">

          {/* LOGO + TEXT */}
          <div>
          <div className="flex items-center gap-2 mb-6">
            <img 
              src={settings?.inner_logo ? `https://backend.verifiedequalaccess.com/storage/${settings.inner_logo}` : "/logonew.png"} 
              alt="logo" 
              className="w-44 md:w-52 h-auto object-contain" 
            />
          </div>

            <p className="text-gray-300 text-base leading-relaxed max-w-sm">
              Building accessible and compliant digital experiences that help businesses grow with confidence.
            </p>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold mb-5 text-white tracking-wide">
              LEGAL
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {["About Us", "Compliance Tools", "Pricing & Audit"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-semibold mb-5 text-white tracking-wide">
              CONTACT
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              {["Blog", "Pricing", "About Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-white transition duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-sm font-semibold mb-5 text-white tracking-wide">
              SOCIAL
            </h3>

            <div className="flex gap-3">

              {[
                "fab fa-facebook-f",
                "fab fa-twitter",
                "fab fa-linkedin-in",
              ].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#2ED3B7] hover:text-black transition duration-300"
                >
                  <i className={`${icon} text-sm`}></i>
                </a>
              ))}

            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

        <p className="text-sm text-gray-500 text-center">
    © {new Date().getFullYear()} {settings?.site_name || "Verified Equal Access"}. All rights reserved.
  </p>
          

        </div>

      </div>

    </footer>
  );
}