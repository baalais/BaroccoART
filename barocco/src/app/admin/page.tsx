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

    // Create form data
    const formDataToSend = new FormData();
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    // Validate and append files
    uploadedFiles.forEach((file, index) => {
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not a valid image.`);
        return;
      }
      formDataToSend.append(`images`, file); // Appending images with same key
    });

    try {
      // Debugging the FormData
      for (const [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await fetch("/api/services", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Service updated!");
        console.log("Saved files:", data.files);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
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

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
