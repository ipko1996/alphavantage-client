import {
  type BestMatchesResponse,
  type QuoteResponse,
  globalQuoteSchema,
  searchResponse,
} from "../../types/alphavantage";
import { z } from "zod";
import { customKy } from "~/lib/customKy";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
});
