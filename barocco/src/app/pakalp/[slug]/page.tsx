"use client";

import { useEffect, useState } from "react";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export default function ServicePage({ params }: ServicePageProps) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [serviceText, setServiceText] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const resolvedParams = await params; // Await the promise for `params`
        if (!resolvedParams.slug) return;

        const response = await fetch(`/api/photos?slug=${resolvedParams.slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const imageFiles: string[] = await response.json();
        const imageUrls = imageFiles.map(
          (file) => `/images/${resolvedParams.slug}/${file}`
        );
        setPhotos(imageUrls);

        switch (resolvedParams.slug) {
          case "privatmajas":
            setServiceText({
              title: "Privātmājas",
              description: "Teksts par privātmājām...",
            });
            break;
          case "lauksaimniecibas-ekas":
            setServiceText({
              title: "Lauksaimniecības",
              description: "Teksts par lauksaimniecību...",
            });
            break;
          case "razosanas-uznemumiem":
            setServiceText({
              title: "Ražošanas uzņēmumiem",
              description: "Teksts par ražošanas uzņēmumiem...",
            });
            break;
          case "uznemumiem":
            setServiceText({
              title: "Uzņēmumiem",
              description: "Teksts par uzņēmumiem...",
            });
            break;
          default:
            setServiceText({
              title: "Service not found",
              description: "Atvainojiet, nevarējām atrast informāciju.",
            });
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Nezināma kļūda");
        }
      }
    }

    fetchData();
  }, [params]);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">
        {serviceText.title || "Notiek ielāde..."}
      </h1>
      <p className="text-lg text-gray-600 mb-6">{serviceText.description}</p>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Pakalpojuma attēls ${index + 1}`}
              className="w-full h-auto rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
