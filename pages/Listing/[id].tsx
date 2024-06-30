import React from "react";
import { useRouter } from "next/router";
import { useFetchListing } from "../../src/app/hooks/useFetchListing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PlaceBidComponent from "@/app/components/Bid";

// Define interfaces for the expected shapes
interface Media {
  url: string;
  alt?: string;
}

interface ListingData {
  title: string;
  description: string;
  created: string;
  endsAt: string;
  media: Media[];
  _count: {
    bids: number;
  };
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hour}:${minute}`;
}

export default function Listing() {
  const router = useRouter();
  // Ensure id is treated as a string
  const id = typeof router.query.id === "string" ? router.query.id : undefined;

  const { data, loading, error } = useFetchListing(id);

  if (!id) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading listing.</div>;
  }

  if (!data) {
    return null;
  }

  // Ensure data has the expected shape
  const listingData = data as ListingData;

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {listingData.title}
        </h1>
        {listingData.media.length > 0 && (
          <img
            src={listingData.media[0].url}
            alt={listingData.media[0].alt || "Listing image"}
            className="w-full h-auto mb-6 rounded"
          />
        )}
        <p className="text-gray-700 mb-6">{listingData.description}</p>
        <p className="text-sm text-gray-600 mb-2">
          Created:{" "}
          <span className="font-semibold">
            {formatDateTime(listingData.created)}
          </span>
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Ends:{" "}
          <span className="font-semibold">
            {formatDateTime(listingData.endsAt)}
          </span>
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Number of bids:{" "}
          <span className="font-semibold">{listingData._count.bids}</span>
        </p>
        <PlaceBidComponent listingId={id} />
      </div>
      <Footer />
    </>
  );
}
