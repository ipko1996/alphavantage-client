"use client";

import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { type GlobalQuoteSchema } from "~/server/types/alphavantage";

export default function Favorites() {
  const [storedStocks] = useLocalStorage<GlobalQuoteSchema[]>({
    key: "favorite-stocks",
    defaultValue: [],
  });

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <h2 className="mb-4 text-lg font-semibold">Favorite Stocks</h2>
      {storedStocks.length === 0 ? (
        <div>No favorite stocks added yet.</div>
      ) : (
        <ul className="space-y-2">
          {storedStocks.map((stock, index) => (
            <li
              key={index}
              className="flex w-full justify-between border-b py-2"
            >
              <Link
                href={`/stock/${stock.symbol}`}
                className="flex-1 text-blue-500 hover:underline"
              >
                {stock.symbol}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
