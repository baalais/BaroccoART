"use client";

import { useEffect, useState } from "react";

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [serviceText, setServiceText] = useState<{
    title: string;
    description: string;
  }>({
    title: "",
    description: "",
  });

  // Fetch photos and set text based on slug
  useEffect(() => {
    if (!params.slug) return;

    async function fetchPhotos() {
      try {
        const response = await fetch(`/api/photos?slug=${params.slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const imageFiles: string[] = await response.json();
        const imageUrls = imageFiles.map(
          (file) => `/images/${params.slug}/${file}`
        );
        setPhotos(imageUrls);

        // Set service text based on slug
        switch (params.slug) {
          case "privatmajas":
            setServiceText({
              title: "Privātmājas",
              description:
                "Teksts par privātmājām teksts par privātmājām teksts par privātmājām teksts par privātmājām",
            });
            break;
          case "lauksaimniecibas-ekas":
            setServiceText({
              title: "Lauksaimniecības",
              description:
                "Teksts par lauksaimniecību teksts par lauksaimniecību teksts par citu lauksaimniecību",
            });
            break;
          case "razosanas-uznemumiem":
            setServiceText({
              title: "Ražošanas uzņēmumiem",
              description:
                "Teksts par ražošanas uzņēmumiem teksts par ražošanas uzņēmumiem teksts par ražošanas uzņēmumiem",
            });
            break;
          case "uznemumiem":
            setServiceText({
              title: "Uzņēmumiem",
              description:
                "Teksts par uzņēmumiem teksts par uzņēmumiem teksts par uzņēmumiem",
            });
            break;
          default:
            setServiceText({
              title: "Service not found",
              description:
                "Atvainojiet, nevarējām atrast informāciju par šo pakalpojumu.",
            });
            break;
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error fetching photos:", err.message);
          setError(err.message);
        } else {
          console.error("Unexpected error:", err);
          setError("Nezināma kļūda");
        }
      }
    }

    fetchPhotos();
  }, [params.slug]);

  return (
    <div className="p-6">
      {/* Pakalpojuma nosaukums un apraksts */}
      <h1 className="text-4xl font-bold mb-4">
        {serviceText.title || "Notiek ielāde..."}
      </h1>
      <p className="text-lg text-gray-600 mb-6">{serviceText.description}</p>

      {/* Attēlu režģis */}
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
