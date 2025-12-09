"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Flight {
  AirlineLogoAddress: string;
  AirlineName: string;
  InboundFlightsDuration: string;
  ItineraryId: string;
  OutboundFlightsDuration: string;
  Stops: number;
  TotalAmount: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [departureCode, setDepartureCode] = useState(
    searchParams.get("DepartureAirportCode") || ""
  );
  const [arrivalCode, setArrivalCode] = useState(
    searchParams.get("ArrivalAirportCode") || ""
  );
  const [departureDate, setDepartureDate] = useState(
    searchParams.get("DepartureDate")
      ? new Date(searchParams.get("DepartureDate")!).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [returnDate, setReturnDate] = useState(
    searchParams.get("ReturnDate")
      ? new Date(searchParams.get("ReturnDate")!).toISOString().split("T")[0]
      : new Date(Date.now() + 25 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0]
  );

  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  // Auto-search if URL has params
  useEffect(() => {
    if (
      searchParams.get("DepartureAirportCode") &&
      searchParams.get("ArrivalAirportCode")
    ) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!departureCode || !arrivalCode) {
      setError("Please enter both departure and arrival airport codes");
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    // Create ISO date strings
    const depDateISO = new Date(departureDate).toISOString();
    const retDateISO = new Date(returnDate).toISOString();

    // Update URL
    const params = new URLSearchParams({
      DepartureAirportCode: departureCode.toUpperCase(),
      ArrivalAirportCode: arrivalCode.toUpperCase(),
      DepartureDate: depDateISO,
      ReturnDate: retDateISO,
    });
    router.push(`/search?${params.toString()}`, { scroll: false });

    try {
      const apiUrl = `https://nmflightapi.azurewebsites.net/api/flight/?DepartureAirportCode=${encodeURIComponent(
        departureCode.toUpperCase()
      )}&ArrivalAirportCode=${encodeURIComponent(
        arrivalCode.toUpperCase()
      )}&DepartureDate=${encodeURIComponent(
        depDateISO
      )}&ReturnDate=${encodeURIComponent(retDateISO)}`;

      const response = await fetch(apiUrl, {
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      setFlights(data);
    } catch (err) {
      setError("Failed to search for flights. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Search Form */}
      <div className="bg-card-bg rounded-lg p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-white mb-4">Search</h2>
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Departure Airport Code
            </label>
            <input
              type="text"
              value={departureCode}
              onChange={(e) => setDepartureCode(e.target.value.toUpperCase())}
              placeholder="e.g. BCN"
              className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-primary"
              maxLength={3}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Arrival Airport Code
            </label>
            <input
              type="text"
              value={arrivalCode}
              onChange={(e) => setArrivalCode(e.target.value.toUpperCase())}
              placeholder="e.g. VVI"
              className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-primary"
              maxLength={3}
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Departure Date
            </label>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-transparent border-b border-gray-600 py-2 text-white focus:outline-none focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {/* Flight Results */}
      {searched && !loading && flights.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Flights</h2>
          <div className="space-y-4">
            {flights.map((flight, index) => (
              <FlightCard key={flight.ItineraryId || index} flight={flight} />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searched && !loading && flights.length === 0 && !error && (
        <div className="text-center text-gray-400 py-8">
          No flights found for this search.
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-400 py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></div>
          <p className="mt-4">Searching for flights...</p>
        </div>
      )}
    </div>
  );
}

function FlightCard({ flight }: { flight: Flight }) {
  return (
    <div className="bg-card-bg rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        {flight.AirlineLogoAddress && (
          <div className="w-12 h-12 relative rounded-full overflow-hidden bg-white flex items-center justify-center">
            <Image
              src={flight.AirlineLogoAddress}
              alt={flight.AirlineName}
              width={48}
              height={48}
              className="object-contain"
              unoptimized
            />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-white">{flight.AirlineName}</h3>
          <p className="text-gray-400">${flight.TotalAmount.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          <span className="text-gray-400">Outbound Duration:</span>
          <span className="text-white">{flight.OutboundFlightsDuration}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
          <span className="text-gray-400">Inbound Duration:</span>
          <span className="text-white">{flight.InboundFlightsDuration}</span>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-card-bg rounded-lg p-6 shadow-lg animate-pulse">
            <div className="h-8 bg-gray-600 rounded w-24 mb-4"></div>
            <div className="space-y-4">
              <div className="h-12 bg-gray-600 rounded"></div>
              <div className="h-12 bg-gray-600 rounded"></div>
              <div className="h-12 bg-gray-600 rounded"></div>
              <div className="h-12 bg-gray-600 rounded"></div>
              <div className="h-12 bg-primary rounded"></div>
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}

