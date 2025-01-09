// components/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-6 text-center mt-auto">
      <div className="container mx-auto">
        <p className="mb-2 text-lg">Sazināties.</p>
        <a
          href="https://wa.me/"
          className="inline-block mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
        >
          WhatsApp
        </a>
        <p className="mt-4 text-sm">© Barocco Art 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
