"use client";

import React from "react";
import { LineChart } from "@mantine/charts";
import { Container, Loader, Alert, Text } from "@mantine/core";
import { api } from "~/trpc/react";
import { format } from "date-fns";

const StockChart: React.FC<{ symbol: string }> = ({ symbol }) => {
  const { data, isLoading, error } = api.stock.timeSeriesDaily.useQuery({
    symbol,
  });

  if (isLoading) {
    return (
      <Container className="flex h-[300px] items-center justify-center">
        <Loader size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Alert title="Error" color="red">
        Failed to load stock data. Please try again later.
      </Alert>
    );
  }

  if (
    !data?.timeSeriesDaily ||
    Object.keys(data.timeSeriesDaily).length === 0
  ) {
    return (
      <Alert title="No Data" color="yellow">
        No stock data available for {symbol}.
      </Alert>
    );
  }

  const chartData = Object.entries(data.timeSeriesDaily)
    .map(([date, values]) => ({
      date: format(new Date(date), "MM.dd"),
      open: parseFloat(values.open),
      high: parseFloat(values.high),
      low: parseFloat(values.low),
      close: parseFloat(values.close),
    }))
    .reverse()
    .slice(-50);

  return (
    <Container fluid p={0}>
      <Text size="sm" mb="md">
        Last updated: {data.metaData.lastRefreshed}
      </Text>
      <LineChart
        h={400}
        data={chartData}
        dataKey="date"
        series={[
          { name: "open", color: "indigo" },
          { name: "high", color: "green" },
          { name: "low", color: "red" },
          { name: "close", color: "blue" },
        ]}
        curveType="linear"
        withLegend
        withTooltip
        withDots
        yAxisProps={{ domain: ["auto", "auto"] }}
        tickLine="y"
      />
    </Container>
  );
};

export default StockChart;
