// components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        <a href="/">
        <h1 className="text-4xl font-extrabold tracking-wide">Barocco Art</h1>
        </a>
        <nav className="flex space-x-6">
          <a href="/contact" className="text-lg hover:underline">
            Kontakti
          </a>
          <a href="/services" className="text-lg hover:underline">
            Pakalpojumi
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
