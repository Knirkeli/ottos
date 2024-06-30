import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import Cookies
import { apiRequest, API_PROFILE } from "../shared/apis";
// Adjust the import path as necessary
interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  media: { url: string; alt: string }[];
  tags: string[];
  created: string;
  updated: string;
  endsAt: string;
  _count: { bids: number };
}

const UserListing: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      const userCookie = Cookies.get("user");
      if (!userCookie) {
        console.error("User cookie not found");
        return;
      }
      let user;
      try {
        user = JSON.parse(decodeURIComponent(userCookie));
      } catch (error) {
        console.error("Error parsing user cookie", error);
        return;
      }
      const userName = user.name;
      const endpoint = `${API_PROFILE}/${userName}/listings`; // Construct the endpoint using the user's name
      try {
        const response = await apiRequest(endpoint);
        const data = response.data; // Assuming the API response structure is {data: Array, meta: Object}
        if (Array.isArray(data)) {
          setListings(data);
        } else {
          console.error("Expected an array of listings, received:", data);
          setListings([]); // Default to an empty array if data is not as expected
        }
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, []);

  if (!listings || listings.length === 0) {
    return (
      <div>
        <h2>My Listings</h2>
        <p>No listings found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap -m-4">
      <h2 className="w-full p-4">Your Listings</h2>
      {listings.map((listing) => (
        <div key={listing.id} className="p-4 m-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-bold">{listing.title}</h3>
          {listing.media.map((mediaItem, index) => (
            <img
              key={index}
              src={mediaItem.url}
              alt={mediaItem.alt}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
          <p className="mt-2"> Bid: {listing.price} NOK</p>
        </div>
      ))}
    </div>
  );
};

export default UserListing;
