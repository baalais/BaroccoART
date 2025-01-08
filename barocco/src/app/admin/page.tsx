"use client";
import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    slug: "privatmajas", // Default category
    title: "",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files)); // Save uploaded files in state
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data
    const formDataToSend = new FormData();
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    // Append files to the form data
    uploadedFiles.forEach((file, index) => {
      formDataToSend.append(`images[${index}]`, file);
    });

    const response = await fetch("/api/services", {
      method: "POST",
      body: formDataToSend, // Send the FormData object
    });

    if (response.ok) {
      alert("Service updated!");
    } else {
      alert("Failed to update service.");
    }
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
        {/* Dropdown for category */}
        <label className="block text-sm font-medium">
          Category
          <select
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full p-2 border rounded mt-1"
          >
            <option value="privatmajas">Privātmājas</option>
            <option value="lauksaimniecibas-ekas">Lauksaimniecības ēkas</option>
            <option value="uznemumiem">Uzņēmumiem</option>
            <option value="razosanas-uznemumiem">Ražošanas uzņēmumiem</option>
          </select>
        </label>

        {/* Title input */}
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {/* Description input */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        {/* File upload input */}
        <label className="block text-sm font-medium">
          Upload Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full p-2 border rounded mt-1"
          />
        </label>

        {/* Preview uploaded files */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-medium">Uploaded Images:</p>
            <ul className="list-disc pl-5">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="text-sm">
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Save button */}
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
