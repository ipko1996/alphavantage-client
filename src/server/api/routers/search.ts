import ky from "ky";
import { z } from "zod";
import { env } from "~/env";
import { customKy } from "~/lib/customKy";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

interface BestMatch {
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

interface BestMatchesResponse {
  bestMatches: BestMatch[];
}

const searchResponse = z.object({
  bestMatches: z.array(
    z.object({
      symbol: z.string(),
      name: z.string(),
      type: z.string(),
      region: z.string(),
      marketOpen: z.string(),
      marketClose: z.string(),
      timezone: z.string(),
      currency: z.string(),
      matchScore: z.string(),
    }),
  ),
});

export const searchRouter = createTRPCRouter({
  keywordQuery: publicProcedure
    .input(z.object({ keyword: z.string() }))
    .output(searchResponse)
    .query(async ({ input }) => {
      const SEARCH_URL = `query?function=SYMBOL_SEARCH&keywords=${input.keyword}&apikey=demo`;
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
});
