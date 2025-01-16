"use client";
import React, { useState, useEffect } from "react";

const services = [
  "privatmajas",
  "lauksaimniecibas-ekas",
  "razosanas-uznemumiem",
  "uznemumiem",
];

const AdminPanel = () => {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Fetch photos for the selected service
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/photos?slug=${selectedService}`);
        const data = await response.json();

        if (response.ok) {
          setPhotos(data);
        } else {
          setError(data.error || "Failed to fetch photos.");
        }
      } catch (err) {
        console.error(err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [selectedService]);

  // Handle photo upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("slug", selectedService);
    formData.append("photo", file);

    setUploading(true);
    try {
      const response = await fetch("/api/uploadPhoto", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        // Refresh the photos list after upload
        setFile(null);
        setPhotos((prev) => [...prev, file.name]);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to upload photo.");
      }
    } catch (error) {
      console.error(error);
      alert("An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Service Selection */}
      <div className="mb-4">
        <label htmlFor="service" className="block mb-2 font-semibold">
          Izvēlieties kategoriju (Select a category):
        </label>
        <select
          id="service"
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>

      {/* Photo Upload */}
      <div className="mb-4">
        <label className="block mb-2 font-semibold">
          Augšupielādēt fotoattēlu (Upload a photo):
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          className="block w-full mb-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Augšupielādē (Uploading)..." : "Augšupielādēt (Upload)"}
        </button>
      </div>

      {/* Photo Grid */}
      {loading ? (
        <p>Ielādē (Loading)...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : photos.length === 0 ? (
        <p className="text-gray-500">Nav fotoattēlu (No photos available).</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative">
              <img
                src={`/images/${selectedService}/${photo}`}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto rounded object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
