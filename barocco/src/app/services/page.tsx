import React from "react";

const ServiceSection: React.FC = () => {
  const services = [
    {
      src: "/image1.jpg",
      title: "PROJEKTĒŠANA",
      text: "Studija izstrādā daudzstāvu ēku projektus, sabiedrisku un biroju ēku būvprojektus. Realizēti arī viesnīcu un skolu projekti.",
    },
    {
      src: "/image2.jpg",
      title: "BŪVNORMATĪVI UN TERITORIJAS PLĀNI",
      text: "Kompetence valsts un pašvaldību būvniecību reglamentējošās likumdošanā. Sertificēta būvprojekta ekspertīze.",
    },
    {
      src: "/image3.jpg",
      title: "PROJEKTU VADĪBA",
      text: "Piedāvā sarežģītu būvniecības projektu vadību, no koncepcijas līdz būves nodošanai ekspluatācijā.",
    },
    {
      src: "/image4.jpg",
      title: "ĒKAS INFORMĀCIJAS MODELĒŠANA",
      text: "BIM 3D modelēšana samazina kļūdas būvprojektu saskaņošanas laikā un samazina kopējās būvniecības izmaksas.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white py-16 px-4">
      <h1 className="text-2xl font-bold mb-8 text-center">
        Pilns projektēšanas pakalpojumu serviss.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg"
          >
            <img
              src={service.src}
              alt={service.title}
              className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-yellow-400">{service.title}</h2>
              <p className="text-sm mt-2">{service.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
      </div>
    </div>
  );
};

export default ServiceSection;
