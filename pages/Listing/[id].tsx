// "use client";
// import { useRouter } from "next/router";
// import { useFetchListing } from "../../src/app/hooks/useFetchListing";
// import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";
// import PlaceBidComponent from "@/app/components/Bid";

// // Function to format date
// function formatDateTime(dateString) {
//   const date = new Date(dateString);
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-indexed
//   const year = date.getFullYear();
//   const hour = date.getHours().toString().padStart(2, "0");
//   const minute = date.getMinutes().toString().padStart(2, "0");

//   return `${day}-${month}-${year}-${hour}-${minute}`;
// }

// export default function Listing() {
//   const router = useRouter();
//   const { id } = router.query;

//   // Always call the hook at the top level
//   const { data, loading, error } = useFetchListing(id);

//   // Don't render the component if id is not defined yet
//   if (!id) {
//     return null;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading listing.</div>;
//   }

//   if (!data) {
//     return null; // Render nothing if data is not available yet
//   }

//   return (
//     <>
//       <Header />
//       <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-16">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
//         <img
//           src={data.media[0].url}
//           alt={data.media[0].alt}
//           className="w-full h-auto mb-6 rounded"
//         />{" "}
//         <p className="text-gray-700 mb-6">{data.description}</p>
//         <p className="text-sm text-gray-600 mb-2">
//           Created:{" "}
//           <span className="font-semibold">{formatDateTime(data.created)}</span>
//         </p>
//         <p className="text-sm text-gray-600 mb-4">
//           Ends:{" "}
//           <span className="font-semibold">{formatDateTime(data.endsAt)}</span>
//         </p>
//         <p className="text-sm text-gray-600 mb-6">
//           Number of bids:{" "}
//           <span className="font-semibold">{data._count.bids}</span>
//         </p>
//         <div className="flex justify-center"></div>
//         <PlaceBidComponent listingId={id} className="mt-6" />
//       </div>
//       <Footer />
//     </>
//   );
// }

import React from "react"; // Ensure React is imported
import { useRouter } from "next/router";
import { useFetchListing } from "../../src/app/hooks/useFetchListing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PlaceBidComponent from "@/app/components/Bid";

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
  const { id } = router.query;

  const { data, loading, error } = useFetchListing(id as string);

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

  // Add type guard to ensure data is not undefined
  if (!data) {
    return null;
  }

  // Rest of the code remains the same

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-16">
        {data && (
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {data.title}
          </h1>
        )}
        <img
          src={data.media[0].url}
          alt={data.media[0].alt}
          className="w-full h-auto mb-6 rounded"
        />
        <p className="text-gray-700 mb-6">{data.description}</p>
        <p className="text-sm text-gray-600 mb-2">
          Created:{" "}
          <span className="font-semibold">{formatDateTime(data.created)}</span>
        </p>
        <p className="text-sm text-gray-600 mb-4">
          Ends:{" "}
          <span className="font-semibold">{formatDateTime(data.endsAt)}</span>
        </p>
        <p className="text-sm text-gray-600 mb-6">
          Number of bids:{" "}
          <span className="font-semibold">{data._count.bids}</span>
        </p>
        <PlaceBidComponent listingId={id as string} className="mt-6" />
      </div>
      <Footer />
    </>
  );
}
