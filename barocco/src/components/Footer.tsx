import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full backdrop-blur-md bg-white/30 dark:bg-black/30 py-6 text-center">
      <div className="container mx-auto">
        <p className="mb-2 text-lg text-black dark:text-white">Sazināties.</p>
        <a
          href="https://wa.me/"
          className="inline-block mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
        >
          WhatsApp
        </a>
        <p className="mt-4 text-sm text-black dark:text-white">© Barocco Art 2025</p>
      </div>
    </footer>
  );
};

export default Footer;