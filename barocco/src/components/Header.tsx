// components/Header.tsx
import React from "react";
import Link from "next/link"; // Import the Link component

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black z-50">
      <div className="container mx-auto flex justify-between items-center py-6 px-4 md:px-8">
        {/* Use Link for the home page */}
        <Link href="/">
          <h1 className="text-4xl font-extrabold tracking-wide cursor-pointer">Barocco Art</h1>
        </Link>
        <nav className="flex space-x-6">
          {/* Use Link for the contact page */}
          <Link href="/contact" className="text-lg hover:underline">
            Kontakti
          </Link>
          {/* Use Link for the services page */}
          <Link href="/services" className="text-lg hover:underline">
            Pakalpojumi
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;