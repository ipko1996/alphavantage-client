"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h1 className="mb-4 text-4xl font-bold text-red-600">
        Something went wrong!
      </h1>
      <p className="mb-6 text-lg text-gray-600">
        {error.message || "An unexpected error occurred."}
      </p>
      <Link href="/">
        <button className="rounded-md bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
          Return Home
        </button>
      </Link>
    </div>
  );
}
