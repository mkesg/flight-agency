import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-card-bg rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold text-white mb-3">Welcome</h2>
        <p className="text-gray-300 mb-4">
          Welcome to the Flight Search app. Use this app to search for imaginary
          flights from a sample REST API.
        </p>
        <Link
          href="/search"
          className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded transition-colors"
        >
          Search
        </Link>
      </div>
    </div>
  );
}

