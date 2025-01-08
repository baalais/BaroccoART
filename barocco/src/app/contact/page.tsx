import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-black text-white py-16 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Projektēšanas birojs <br />
        <span className="text-yellow-400">BAROCCO ART</span>
      </h1>
      <p className="text-center text-sm mb-8">
        Arhitektūra Interjers Projektēšana Būvniecība
      </p>

      <div className="space-y-8 w-full max-w-3xl">
        {/* Interjers, Dizains */}
        <div>
          <h2 className="text-lg font-bold mb-2">Industriālais, dizains</h2>
          <p>Armands Lūsis</p>
          <p className="text-sm">Email: armands@baroccoart.lv</p>
          <p className="text-sm">Telefons: +371 2 949 4338 gsm</p>
        </div>

        {/* Arhitektūra, Projektēšana */}
        <div>
          <h2 className="text-lg font-bold mb-2">Arhitektūra, projektēšana</h2>
          <p>Armands Lūsis</p>
          <p className="text-sm">Email: armands@baroccoart.lv</p>
          <p className="text-sm">Telefons: +371 2 949 4338 gsm</p>
        </div>

        {/* Birojs */}
        <div>
          <h2 className="text-lg font-bold mb-2">Birojs</h2>
          <p>Adrese: Brīvības iela 137, Rīga, Latvija</p>
          <p className="text-sm">Email: barocco@baroccoart.lv</p>
          <p className="text-sm">WhatsApp: +371 26226288</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
