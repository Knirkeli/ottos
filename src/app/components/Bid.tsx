import React, { useState, useEffect } from "react";
import { apiRequest, API_LISTINGS } from "../shared/apis";
import { getAccessToken, getApiKey } from "../shared/cookies";

const PlaceBidComponent = (
  { listingId }: { listingId: string },
  initialBidAmount = ""
) => {
  const [amount, setAmount] = useState(initialBidAmount);
  const [currentBid, setCurrentBid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("") as [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ]; // Explicitly type 'error' as a string
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchCurrentBid = async () => {
      try {
        const requestUrl = `${API_LISTINGS}/${listingId}?_bids=true`;
        const apiKey = getApiKey();
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        };
        // Only add the "X-Noroff-API-Key" header if apiKey is not undefined
        if (apiKey) {
          headers["X-Noroff-API-Key"] = apiKey;
        }

        const response = await fetch(requestUrl, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { data } = await response.json(); // Destructure to get data directly

        if (data.bids && data.bids.length > 0) {
          const highestBid = data.bids.reduce(
            (max: number, bid: { amount: number }) =>
              bid.amount > max ? bid.amount : max,
            data.bids[0].amount
          );
          setCurrentBid(highestBid); // Set the highest bid
        }
      } catch (error) {
        setError("Failed to fetch current bid.");
      }
    };

    fetchCurrentBid();
  }, [listingId]);

  const isValidAmount = () => {
    const num = Number(amount);
    return !isNaN(num) && num > 0;
  };

  const handleBidSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isValidAmount()) {
      setError("Please enter a valid positive number for the bid amount.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const accessToken = getAccessToken();
      const apiKey = getApiKey();
      if (!accessToken) {
        throw new Error("User is not authenticated.");
      }
      if (!apiKey) {
        throw new Error("API key is missing.");
      }

      const requestUrl = `${API_LISTINGS}/${listingId}/bids`;
      const response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify({
          amount: Number(amount),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      setSuccess(true);
      setAmount(""); // Reset amount after successful bid
      setCurrentBid(data.amount); // Update current bid with the new bid amount

      // Reload the page after successful bid placement
      window.location.reload();
    } catch (error) {
      // Check if error is an instance of Error
      if (error instanceof Error) {
        setError(error.message);
      } else {
        // Fallback error message if error is not an instance of Error
        setError("An error occurred while placing the bid.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10">
      <h2 className="text-2xl font-bold mb-4">Place a Bid</h2>
      {currentBid && (
        <p className="text-lg mb-2">Current Bid: {currentBid} NOK</p>
      )}
      {error && <p className="text-red-500">Error: {error}</p>}
      {success && <p className="text-green-500">Bid placed successfully!</p>}
      <form onSubmit={handleBidSubmit} className="space-y-4">
        <label className="block">
          Your Bid:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </label>
        <button
          type="submit"
          disabled={loading || !isValidAmount()}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading || !isValidAmount()
              ? "bg-gray-500"
              : "bg-indigo-600 hover:bg-indigo-700"
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          {loading ? "Placing..." : "Place Bid"}
        </button>
      </form>
    </div>
  );
};

export default PlaceBidComponent;
