"use client";

import { Button, Tooltip } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { Star } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { type GlobalQuoteSchema } from "~/server/types/alphavantage";

export const AddToFavoritesButton: React.FC<{ stock: GlobalQuoteSchema }> = ({
  stock,
}) => {
  const [storedStocks, setStoredStocks] = useLocalStorage<GlobalQuoteSchema[]>({
    key: "favorite-stocks",
    defaultValue: [],
  });

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(storedStocks.some((s) => s.symbol === stock.symbol));
  }, [storedStocks, stock]);

  const toggleFavorite = useCallback(() => {
    setStoredStocks((prevStocks) => {
      if (isFavorite) {
        return prevStocks.filter((s) => s.symbol !== stock.symbol);
      } else {
        const stockExists = prevStocks.some((s) => s.symbol === stock.symbol);
        if (stockExists) {
          return prevStocks;
        }
        return [stock, ...prevStocks];
      }
    });
    setIsFavorite((prev) => !prev);
  }, [isFavorite, setStoredStocks, stock]);

  return (
    <Tooltip label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
      <Button
        variant="subtle"
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        style={{ padding: 0 }}
      >
        <Star
          size={24}
          fill={isFavorite ? "#FFD700" : "none"}
          color={isFavorite ? "#FFD700" : "#A9A9A9"}
        />
      </Button>
    </Tooltip>
  );
};
