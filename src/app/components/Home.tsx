"use client";
import { useState } from "react";
import { useFetch } from "../hooks/FetchListings";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { SearchComponent } from "./Search";

export default function Home() {
  const {
    data: listings = [] as {
      media: any;
      id: any;
      tags: any;
      description: any;
      title: string;
    }[],
    loading,
    setCount,
  } = useFetch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery) ||
      listing.description?.toLowerCase().includes(searchQuery) || // Use optional chaining here
      (listing.tags &&
        listing.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery)
        ))
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mb-16">
      <SearchComponent onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredListings.map((listing, index) => (
          <Link href={`/Listing/${listing.id}`} key={listing.id}>
            <Card
              className="flex flex-col border border-gray-300 rounded p-4 mb-4 max-w-md m-auto h-auto transform transition duration-500 ease-in-out hover:shadow-lg hover:scale-105"
              data-id={listing.id}
            >
              <div className="w-4/5 h-48 self-center overflow-hidden m-auto">
                <img
                  src={
                    listing.media && listing.media.length > 0
                      ? listing.media[0].url
                      : "https://th.bing.com/th/id/OIP.rp6FgZxMJP4j3AbhaoHPrAHaFL?rs=1&pid=ImgDetMain"
                  }
                  className="object-cover w-full h-full"
                  alt={listing.title}
                />
              </div>
              <CardTitle className="text-lg text-center font-semibold mb-2">
                {listing.title}
              </CardTitle>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
