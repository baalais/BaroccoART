"use client";
import React, { useState, useEffect } from "react";

type ServicePageProps = {
  params: Promise<{ slug: string }>; // `params` is defined as a Promise
};

const ServicePage = ({ params }: ServicePageProps) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [serviceText, setServiceText] = useState<{ title: string; description: string }>({
    title: "Loading...",
    description: "",
  });
  const [error, setError] = useState<string | null>(null);

  // Fetch data when slug changes
  useEffect(() => {
    async function fetchData() {
      try {
        // Await the `params` promise to resolve
        const resolvedParams = await params;
        if (!resolvedParams.slug) return;

        // Fetch photos from the API endpoint
        const photosResponse = await fetch(`/api/photos?slug=${resolvedParams.slug}`);
        if (!photosResponse.ok) {
          throw new Error("Failed to fetch photos");
        }

        // Explicitly type the response data as an array of strings
        const photosData: string[] = await photosResponse.json() as string[];

        // Map the photo filenames to their full URLs
        const photoUrls = photosData.map((photo) => `/images/${resolvedParams.slug}/${photo}`);
        setPhotos(photoUrls);

        // Set service text based on the slug
        const text = getServiceText(resolvedParams.slug);
        setServiceText(text);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      }
    }

    void fetchData(); // Explicitly mark the promise as void to avoid floating promises
  }, [params]);

  return (
    <div className="p-6 max-w-7xl mx-auto"> {/* Center the content and add max-width */}
      <h1 className="text-4xl font-bold mb-4 text-center">{serviceText.title}</h1>
      <p className="text-lg text-gray-600 mb-6 text-center">{serviceText.description}</p>
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4"> {/* Add padding on sides */}
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden"
            >
              <img
                src={photo}
                alt={`Service photo ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to set service text based on the slug
const getServiceText = (slug: string) => {
  switch (slug) {
    case "privatmajas":
      return { title: "Privātmājas", description: "Description about private homes..." };
    case "lauksaimniecibas-ekas":
      return { title: "Lauksaimniecības", description: "Description about agriculture..." };
    case "razosanas-uznemumiem":
      return { title: "Ražošanas uzņēmumiem", description: "Description about production companies..." };
    case "uznemumiem":
      return { title: "Uzņēmumiem", description: "Description about businesses..." };
    default:
      return { title: "Service not found", description: "Sorry, no data available." };
  }
};

export default ServicePage;