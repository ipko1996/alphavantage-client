"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { api } from "~/trpc/react";
import { type OneSearchSchema } from "~/server/types/alphavantage";

export const StockSearch = () => {
  const [value, setValue] = useState("tesco");
  const [debouncedValue] = useDebouncedValue(value, 500);
  const [_, setStoredStocks] = useLocalStorage<OneSearchSchema[]>({
    key: "stocks",
    defaultValue: [],
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const { data, error, isFetching } = api.stock.keywordQuery.useQuery(
    {
      keyword: debouncedValue,
    },
    {
      enabled: debouncedValue.length > 0,
      retry: false,
    },
  );

  const handleStockClick = (match: OneSearchSchema) => {
    setStoredStocks((prevStocks) => {
      // Check if the stock is already in the favorites
      const isStockAlreadyAdded = prevStocks.some(
        (stock) => stock.symbol === match.symbol,
      );

      // If it's already added, return the existing stocks
      if (isStockAlreadyAdded) {
        return prevStocks;
      }

      // Otherwise, add the new stock to the start of the array
      const updatedStocks = [match, ...prevStocks];

      // Limit to a maximum of 5 stocks
      return updatedStocks.length > 5
        ? updatedStocks.slice(0, 5)
        : updatedStocks;
    });
  };

  const options = (data?.bestMatches ?? []).map((match) => (
    <Combobox.Option value={`${match.name} ${match.symbol}`} key={match.symbol}>
      <Link
        href={`/stock/${match.symbol}`}
        onClick={() => handleStockClick(match)}
      >
        <div>{match.name}</div>
        <div className="text-sm text-gray-500">{match.symbol}</div>
      </Link>
    </Combobox.Option>
  ));
  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="Search for a stock"
          placeholder="Enter stock name or symbol"
          value={value}
          onChange={(event) => {
            const newValue = event.currentTarget.value;
            setValue(newValue);
            combobox.resetSelectedOption();
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => {
            combobox.openDropdown();
          }}
          onBlur={() => combobox.closeDropdown()}
          rightSection={isFetching && <Loader size={18} />}
          error={error ? "Something went wrong" : undefined}
        />
      </Combobox.Target>

      {!error && !isFetching && (
        <Combobox.Dropdown>
          <Combobox.Options>
            {options}
            {data?.bestMatches.length === 0 && (
              <Combobox.Empty>No results found</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      )}
    </Combobox>
  );
};
