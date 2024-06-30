// "use client";
// import { useState, useEffect } from "react";
// import { apiRequest, API_LISTINGS } from "../shared/apis";

// export const useFetchListing = (id) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiRequest(`${API_LISTINGS}/${id}?_seller=true&_bids=true`);
//         setData(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return { data, loading, error };
// };

"use client";
import { useState, useEffect } from "react";
import { apiRequest, API_LISTINGS } from "../shared/apis";

export const useFetchListing = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await apiRequest(`${API_LISTINGS}/${id}?_seller=true&_bids=true`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};