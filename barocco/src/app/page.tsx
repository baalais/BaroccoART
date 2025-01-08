"use client"
import React from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  const images = [
    { src: "/image1.jpg", text: "Privātmājas", slug: "privatmajas" },
    { src: "/image2.jpg", text: "Lauksaimniecības ēkas", slug: "lauksaimniecibas-ekas" },
    { src: "/image3.jpg", text: "Uzņēmumiem", slug: "uznemumiem" },
    { src: "/image4.jpg", text: "Ražošanas uzņēmumiem", slug: "razosanas-uznemumiem" },
  ];

  const handleImageClick = (slug: string) => {
    router.push(`/pakalp/${slug}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 gap-8 max-w-4xl">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-lg aspect-square cursor-pointer"
            onClick={() => handleImageClick(image.slug)}
          >
            <img
              src={image.src}
              alt={image.text}
              className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">{image.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
