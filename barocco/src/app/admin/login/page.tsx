"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Check if the user is already logged in
  useEffect(() => {
    const savedPassword = localStorage.getItem("adminPassword");
    if (savedPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      router.push("/admin"); // Redirect to admin panel if already logged in
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // Save password to localStorage
      localStorage.setItem("adminPassword", password);

      // Redirect to admin panel
      router.push("/admin");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex items-center justify-center">
      <div className="bg-white dark:bg-black p-8 rounded-lg border border-gray-300 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Parole
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-black text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Pieteikšanās
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;