"use client";

import React, { useState } from "react";

const AdminPage: React.FC = () => {
  const [formData, setFormData] = useState({
    slug: "privatmajas",
    title: "",
    description: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    uploadedFiles.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not a valid image.`);
        return;
      }
      formDataToSend.append("images", file);
    });

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Service updated!");
      } else {
        alert("Failed to update service.");
      }
    } catch (err) {
      console.error("Request failed:", err);
      alert("An error occurred. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(filesArray);
    }
  };

  return (
    <div className="flex flex-col items-center py-16 px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
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

        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

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

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
