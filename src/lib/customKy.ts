import ky from "ky";
import { env } from "~/env";

export const customKy = ky
  .create({
    prefixUrl: `${env.ALPHAVANTAGE_API_URL}`,
  })
  .extend({
    hooks: {
      beforeRequest: [(request) => console.log(request.url)],
    },
  });
