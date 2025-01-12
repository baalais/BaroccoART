"use client"; // Add this directive at the very top

import { useEffect, useState } from "react";

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const response = await fetch(`/api/photos?slug=${params.slug}`);
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const imageFiles = await response.json(); // Get list of filenames
        const imageUrls = imageFiles.map(
          (file: string) => `/images/${params.slug}/${file}`
        ); // Map filenames to URLs
        setPhotos(imageUrls);
      } catch (err: any) {
        console.error("Error fetching photos:", err.message);
        setError(err.message);
      }
    }

    fetchPhotos();
  }, [params.slug]);

  return (
    <div>
      <h1>{params.slug}</h1>
      {error && <p>Error: {error}</p>}
      <div className="grid grid-cols-2 gap-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Service image ${index + 1}`}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
}
