import { useState, useEffect } from 'react';
import { API_LISTINGS } from '../shared/apis';

export const useFetch = (initialCount = 100, active = true) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(initialCount); // For pagination
  const [isError, setIsError] = useState(false);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const url = `${API_LISTINGS}?_active=${active}&limit=${count}&page=1&sort=created&sortOrder=desc`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const jsonResponse = await response.json();
      
      // Check if jsonResponse is an array; if not, attempt to access the listings array via a property (e.g., 'data')
      const listings = Array.isArray(jsonResponse) ? jsonResponse : jsonResponse.data;
      
      if (!Array.isArray(listings)) {
        throw new Error('Expected an array of listings, but did not find one.');
      }
      
      // Filter out listings with titles "Test", "test", or "testing"
      const filteredData = listings.filter(listing => !/test|testing/i.test(listing.title));
      setData(filteredData); // Set data with filtered listings
    } catch (error) {
      console.error('Error fetching listings:', error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [count]); // Dependency on count for re-fetching when pagination changes

  return { data, loading, isError, setCount };
};