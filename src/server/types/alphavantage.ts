import { z } from "zod";

export interface BestMatch {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface BestMatchesResponse {
  bestMatches: BestMatch[];
}

export interface GlobalQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

export interface QuoteResponse {
  "Global Quote": GlobalQuote;
}

export interface TimeSeriesDailyResponse {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Output Size": string;
    "5. Time Zone": string;
  };
  "Time Series (Daily)": Record<
    string,
    {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. volume": string;
    }
  >;
}

export const timeSeriesDailySchema = z.object({
  metaData: z.object({
    information: z.string(),
    symbol: z.string(),
    lastRefreshed: z.string(),
    outputSize: z.string(),
    timeZone: z.string(),
  }),
  timeSeriesDaily: z.record(
    z.object({
      open: z.string(),
      high: z.string(),
      low: z.string(),
      close: z.string(),
      volume: z.string(),
    }),
  ),
});

export const oneSearch = z.object({
  symbol: z.string(),
  name: z.string(),
  type: z.string(),
  region: z.string(),
  marketOpen: z.string(),
  marketClose: z.string(),
  timezone: z.string(),
  currency: z.string(),
  matchScore: z.string(),
});
export const searchResponse = z.object({
  bestMatches: z.array(oneSearch),
});

export const globalQuoteSchema = z.object({
  symbol: z.string(),
  open: z.string(),
  high: z.string(),
  low: z.string(),
  price: z.string(),
  volume: z.string(),
  latestTradingDay: z.string(),
  previousClose: z.string(),
  change: z.string(),
  changePercent: z.string(),
});

export const quoteResponseSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    data: globalQuoteSchema,
  }),
  z.object({
    status: z.literal("failed"),
    error: z.string(), // Error message
  }),
]);

export type OneSearchSchema = z.infer<typeof oneSearch>;
export type GlobalQuoteSchema = z.infer<typeof globalQuoteSchema>;
