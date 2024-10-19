import ky from "ky";
import { env } from "~/env";

export const customKy = ky
  .create({
    prefixUrl: `${env.ALPHAVANTAGE_API_URL}`,
  })
  .extend({
    hooks: {
      beforeRequest: [
        (request) => console.log(request.url),
        (request) => {
          const url = new URL(request.url);
          url.searchParams.set("apikey", "demo" /*env.ALPHAVANTAGE_API_KEY*/);
          return new Request(url.toString(), request);
        },
      ],
    },
  });
