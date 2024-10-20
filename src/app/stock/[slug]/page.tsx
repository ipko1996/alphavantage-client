import { api } from "~/trpc/server";
import { TrendingUp, TrendingDown } from "lucide-react";
import { notFound } from "next/navigation";
import StockChart from "~/app/_components/stock-chart";
import { AddToFavoritesButton } from "~/app/_components/add-to-favorites";

export default async function Page({ params }: { params: { slug: string } }) {
  const stockData = await api.stock.getQuote({ symbol: params.slug });

  if (stockData.status === "failed") {
    return notFound();
  }

  const { data: stock } = stockData;

  const priceChange = parseFloat(stock.change);

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-10">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{stock.symbol}</h2>
              <p className="text-sm text-gray-500">
                Last updated: {stock.latestTradingDay}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AddToFavoritesButton stock={stock} />
            </div>
          </div>
          <span
            className={`rounded-full px-4 py-2 text-xl font-bold ${
              priceChange >= 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } flex items-center`}
          >
            {priceChange >= 0 ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            {stock.price} USD
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
          <div className="col-span-1 rounded-lg border p-4 shadow-md md:col-span-5">
            <h3 className="mb-4 text-xl">Price Chart</h3>
            <StockChart symbol={params.slug} />
          </div>
          <div className="col-span-1 space-y-4 md:col-span-3">
            <div className="rounded-lg border p-4 shadow-md">
              <div className="flex justify-between">
                <span className="font-medium">Open</span>
                <span>{stock.open}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-medium">Close</span>
                <span>{stock.previousClose}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-medium">High</span>
                <span>{stock.high}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-medium">Low</span>
                <span>{stock.low}</span>
              </div>
            </div>
            <div className="rounded-lg border p-4 shadow-md">
              <div className="flex justify-between">
                <span className="font-medium">Volume</span>
                <span>{parseInt(stock.volume).toLocaleString()}</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="font-medium">Change</span>
                <span
                  className={
                    priceChange >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {stock.change} ({stock.changePercent})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
