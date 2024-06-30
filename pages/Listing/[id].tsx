// "use client";
// import { useRouter } from "next/router";
// import { useFetchListing } from "../../src/app/hooks/useFetchListing";
// import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";
// import { Button } from "@/components/ui/button";
// import PlaceBidComponent from "@/app/components/Bid";

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
//       <div className="max-w-lg mx-auto p-4 mb-16">
//         <h1 className="text-2xl text-gray-800">{data.title}</h1>
//         <p className="text-gray-600">{data.description}</p>
//         <img
//           src={data.media[0].url}
//           alt={data.media[0].alt}
//           className="w-full h-auto"
//         />
//         <p className="text-gray-600">Created at: {data.created}</p>
//         <p className="text-gray-600">Ends at: {data.endsAt}</p>
//         <p className="text-gray-600">Number of bids: {data._count.bids}</p>
//         <Button
//           variant="default"
//           size="default"
//           onClick={() => console.log("Button clicked!")}
//         >
//           Place bid
//         </Button>
//         <PlaceBidComponent listingId={id} />
//       </div>
//       <Footer />
//     </>
//   );
// }

"use client";
import { useRouter } from "next/router";
import { useFetchListing } from "../../src/app/hooks/useFetchListing";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PlaceBidComponent from "@/app/components/Bid";

// Function to format date
function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // JavaScript months are 0-indexed
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year}-${hour}-${minute}`;
}

export default function Listing() {
  const router = useRouter();
  const { id } = router.query;

  // Always call the hook at the top level
  const { data, loading, error } = useFetchListing(id);

  // Don't render the component if id is not defined yet
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
    return null; // Render nothing if data is not available yet
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
        <img
          src={data.media[0].url}
          alt={data.media[0].alt}
          className="w-full h-auto mb-6 rounded"
        />{" "}
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
        <div className="flex justify-center"></div>
        <PlaceBidComponent listingId={id} className="mt-6" />
      </div>
      <Footer />
    </>
  );
}
