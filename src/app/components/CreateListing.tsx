import React, { useState } from "react";
import { apiRequest, API_LISTINGS } from "../shared/apis";
import Cookies from "js-cookie";

type ImageInfo = {
  url: string;
  alt: string;
};

export default function CreateListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [media, setMedia] = useState<ImageInfo[] | null>(null);
  const [endsAt, setEndsAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = Cookies.get("accessToken");
    if (!token) {
      setError("You must be logged in to create a listing.");
      setLoading(false);
      return;
    }

    try {
      const response = await apiRequest(API_LISTINGS, "POST", {
        title,
        description,
        tags,
        media,
        endsAt,
      });
      // Reset form or redirect user
      setTitle("");
      setDescription("");
      setTags([]);
      setMedia(null);
      setEndsAt("");

      // Refresh the page
      window.location.reload();
    } catch (err) {
      setError("Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="error text-red-500">{error}</div>
      <label className="block">
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </label>
      <label className="block">
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </label>
      <label className="block">
        Tags (comma separated)
        <input
          type="text"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
          placeholder="Tags (comma separated)"
          className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </label>
      <label className="block mb-2">
        Media URL
        <input
          type="text"
          onChange={(e) => setMedia([{ url: e.target.value, alt: "" }])}
          className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </label>
      <label className="block">
        End Date and Time
        <input
          type="datetime-local"
          value={endsAt}
          onChange={(e) => setEndsAt(e.target.value)}
          required
          className="mt-1 block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
}
