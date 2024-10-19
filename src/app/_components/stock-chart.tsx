"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { LineChart } from "@mantine/charts";
import { useInputState } from "@mantine/hooks";
import { TextInput, Button, Container, Loader, Alert } from "@mantine/core";
import { api } from "~/trpc/react";

const StockChart: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { data } = api.stock.timeSeriesDaily.useQuery({
    symbol,
  });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default StockChart;
