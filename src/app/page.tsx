import { StockSearch } from "./_components/stock-search";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Find Your Next Investment
        </h1>
        <StockSearch />
        <p className="text-muted-foreground mt-4 text-center text-sm">
          Search for stocks, analyze market trends, and make informed decisions.
        </p>
      </div>
    </div>
  );
}
