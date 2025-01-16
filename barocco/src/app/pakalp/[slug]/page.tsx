"use client";

import { useEffect, useState } from "react";

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [serviceText, setServiceText] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function resolveParams() {
      try {
        const resolvedParams = await params;
        if (isMounted) setSlug(resolvedParams.slug);
      } catch (err) {
        console.error("Error resolving params:", err);
      }
    }

    resolveParams();

    return () => {
      isMounted = false;
    };
  }, [params]);

  useEffect(() => {
    if (!slug) return;
  
    // Fetch images and set text based on slug
    async function fetchPhotos() {
      try {
        const response = await fetch(`/api/photos?slug=${slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
  
        const imageFiles = await response.json();
        const imageUrls = imageFiles.map(
          (file: string) => `/images/${slug}/${file}`
        );
        setPhotos(imageUrls);
  
        // Set text based on slug
        switch (slug) {
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
              description: "Sorry, we couldn't find the details for this service.",
            });
            break;
        }
      } catch (err: any) {
        console.error("Error fetching photos:", err.message);
        setError(err.message);
      }
    }
  
    fetchPhotos();
  }, [slug]);
  

  return (
    <div className="p-6">
      {/* Title and Description */}
      <h1 className="text-4xl font-bold mb-4">{serviceText.title || "Loading..."}</h1>
      <p className="text-lg text-gray-600 mb-6">{serviceText.description}</p>

      {/* Image Grid */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Service image ${index + 1}`}
              className="w-full h-auto rounded-lg object-cover"
            />
          ))}
        </div>
      )}
    </div>
  );
}
