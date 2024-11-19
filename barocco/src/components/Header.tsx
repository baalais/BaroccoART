// components/Header.tsx
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        <h1 className="text-4xl font-extrabold tracking-wide">Barocco Art</h1>
        <nav className="flex space-x-6">
          <a href="/" className="text-lg hover:underline">
            Sākumlapa
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
