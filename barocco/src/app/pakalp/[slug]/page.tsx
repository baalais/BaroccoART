import React from "react";

interface ServicePageProps {
  params: { slug: string };
}

const services = {
  "privatmajas": "Privātmājas Details Here",
  "lauksaimniecibas-ekas": "Lauksaimniecības ēkas Details Here",
  "uznemumiem": "Uzņēmumiem Details Here",
  "razosanas-uznemumiem": "Ražošanas uzņēmumiem Details Here",
};

const ServicePage: React.FC<ServicePageProps> = ({ params }) => {
  const { slug } = params;
  const serviceDetail = services[slug] || "Service not found";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-gray-100 rounded-lg shadow-lg max-w-xl">
        <h1 className="text-2xl font-bold mb-4">{slug.replace("-", " ")}</h1>
        <p className="text-gray-700">{serviceDetail}</p>
      </div>
    </div>
  );
};

export default ServicePage;
