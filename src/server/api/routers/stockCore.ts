import {
  type BestMatchesResponse,
  type QuoteResponse,
  TimeSeriesDailyResponse,
  globalQuoteSchema,
  quoteResponseSchema,
  searchResponse,
  timeSeriesDailySchema,
} from "../../types/alphavantage";
import { z } from "zod";
import { customKy } from "~/lib/customKy";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const stockCoreRoute = createTRPCRouter({
  keywordQuery: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .output(searchResponse)
    .query(async ({ input }) => {
      const SEARCH_URL = `query?function=SYMBOL_SEARCH&keywords=${input.keyword}`;
      const response = await customKy<BestMatchesResponse>(SEARCH_URL).json();

      const matches = response.bestMatches.map((match) => ({
        symbol: match["1. symbol"],
        name: match["2. name"],
        type: match["3. type"],
        region: match["4. region"],
        marketOpen: match["5. marketOpen"],
        marketClose: match["6. marketClose"],
        timezone: match["7. timezone"],
        currency: match["8. currency"],
        matchScore: match["9. matchScore"],
      }));
      return {
        bestMatches: matches,
      };
    }),
  getQuote: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .output(quoteResponseSchema)
    .query(async ({ input }) => {
      const GLOBAL_QUOTE_URL = `query?function=GLOBAL_QUOTE&symbol=${input.symbol}`;

      try {
        const response = await customKy<QuoteResponse>(GLOBAL_QUOTE_URL).json();

        const matches = response["Global Quote"];
        if (!matches || Object.keys(matches).length === 0) {
          return {
            status: "failed",
            error: "No quote found for the given symbol",
          };
        }

        return {
          status: "success",
          data: {
            symbol: matches["01. symbol"],
            open: matches["02. open"],
            high: matches["03. high"],
            low: matches["04. low"],
            price: matches["05. price"],
            volume: matches["06. volume"],
            latestTradingDay: matches["07. latest trading day"],
            previousClose: matches["08. previous close"],
            change: matches["09. change"],
            changePercent: matches["10. change percent"],
          },
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "PARSE_ERROR",
          message: "Cannot parse object",
        });
      }
    }),
  getChart: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .output(globalQuoteSchema)
    .query(async ({ input }) => {
      const GLOBAL_QUOTE_URL = `query?function=GLOBAL_QUOTE&symbol=${input.symbol}`;
      const response = await customKy<QuoteResponse>(GLOBAL_QUOTE_URL).json();
      const matches = response["Global Quote"];
      return {
        symbol: matches["01. symbol"],
        open: matches["02. open"],
        high: matches["03. high"],
        low: matches["04. low"],
        price: matches["05. price"],
        volume: matches["06. volume"],
        latestTradingDay: matches["07. latest trading day"],
        previousClose: matches["08. previous close"],
        change: matches["09. change"],
        changePercent: matches["10. change percent"],
      };
    }),
  timeSeriesDaily: publicProcedure
    .input(z.object({ symbol: z.string() }))
    .output(timeSeriesDailySchema)
    .query(async ({ input }) => {
      const TIME_SERIES_DAILY_URL = `query?function=TIME_SERIES_DAILY&symbol=${input.symbol}`;
      const response = await customKy<TimeSeriesDailyResponse>(
        TIME_SERIES_DAILY_URL,
      ).json();

      const metaData = response["Meta Data"];
      const timeSeries = response["Time Series (Daily)"];
      const transformedTimeSeriesDaily = Object.fromEntries(
        Object.entries(timeSeries).map(([date, data]) => [
          date,
          {
            open: data["1. open"],
            high: data["2. high"],
            low: data["3. low"],
            close: data["4. close"],
            volume: data["5. volume"],
          },
        ]),
      );

      return {
        metaData: {
          information: metaData["1. Information"],
          symbol: metaData["2. Symbol"],
          lastRefreshed: metaData["3. Last Refreshed"],
          outputSize: metaData["4. Output Size"],
          timeZone: metaData["5. Time Zone"],
        },
        timeSeriesDaily: transformedTimeSeriesDaily,
      };
    }),
});
