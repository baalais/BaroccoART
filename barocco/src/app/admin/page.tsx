"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image';

const services = [
  "privatmajas",
  "lauksaimniecibas-ekas",
  "razosanas-uznemumiem",
  "uznemumiem",
];

// Define the response data type for fetch
interface FetchResponse {
  error?: string;
  photos?: string[];
}

const AdminPanel = () => {
  const [selectedService, setSelectedService] = useState<string>(services[0] ?? "privatmajas");
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Fetch photos for the selected service
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`/api/photos?slug=${selectedService}`);
      const data = await response.json() as FetchResponse;
  
      if (response.ok) {
        setPhotos(data.photos ?? []);
      } else {
        setError(data.error ?? "Failed to fetch photos.");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [selectedService]);

  useEffect(() => {
    void fetchPhotos();
  }, [selectedService, fetchPhotos]);

  // Handle photo upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
  
    if (!selectedService) {
      alert("Please select a valid service category.");
      return;
    }
  
    const formData = new FormData();
    formData.append("slug", selectedService);
    formData.append("photo", file);
  
    setUploading(true);
    try {
      const response = await fetch("/api/photos", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json() as FetchResponse;
      if (response.ok) {
        alert("Photo uploaded successfully.");
        setFile(null);
        await fetchPhotos();
      } else {
        alert(data.error ?? "Failed to upload photo.");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  // Handle photo delete
  const handleDelete = async (photo: string) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    setDeleting(photo);
    try {
      const response = await fetch(`/api/photos?file=${encodeURIComponent(photo)}`, {
        method: "DELETE",
      });

      const data = await response.json() as FetchResponse;
      if (response.ok) {
        alert("Photo deleted successfully.");
        setPhotos((prev) => prev.filter((p) => p !== photo));
      } else {
        alert(data.error ?? "Failed to delete photo.");
      }
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred during deletion.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Panel</h1>

        {/* Service Selection */}
        <div className="mb-6">
          <label
            htmlFor="service"
            className="block text-lg font-medium text-gray-300 mb-2"
          >
            Select Category
          </label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value ?? services[0])}
            className="w-full border border-gray-700 bg-gray-900 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {services.map((service) => (
              <option key={service} value={service}>
                {service.replace("-", " ").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Photo Upload */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-300 mb-2">
            Upload a Photo
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="block w-full border border-gray-700 bg-gray-900 text-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleUpload}
            className={`w-full py-3 mt-3 rounded-lg font-semibold ${
              uploading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Photo"}
          </button>
        </div>

        {/* Photo Grid */}
        <div>
          {loading ? (
            <p className="text-center text-gray-400">Loading photos...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : photos.length === 0 ? (
            <p className="text-center text-gray-400">
              No photos available for this category.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={`/images/${selectedService}/${photo}`}
                    alt={`Photo ${index + 1}`}
                    width={500}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                  <button
                    onClick={() => handleDelete(photo)}
                    className={`absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md ${
                      deleting === photo ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={deleting === photo}
                  >
                    {deleting === photo ? "..." : "🗑"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
