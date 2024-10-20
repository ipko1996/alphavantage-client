# Stock Search App

## Overview

This project is a simple stock search and detail viewing application built with **Next.js**, utilizing the **Alphavantage API** to retrieve stock data. The application allows users to search for stock quotes by symbol or name and view detailed information on the selected stock, including its current price and historical performance in a chart. Additionally, users can view their favorite stocks in a favorites section, stored in **local storage**.

The application is mobile-friendly, responsive, and features server-side rendering (SSR) for enhanced performance. A caching mechanism is also implemented using **tRPC** and **Tanstack Query** to minimize API requests and optimize data retrieval.

You can access the deployed version of the app [here](https://alphavantage-client.vercel.app/).

## Features

### 1. **Search View**
   - Allows users to search for stocks by entering a stock symbol or name.
   - Implements a stock suggestion feature with autocomplete as the user types.
   - Mobile-friendly design using **CSS**/ **TailwindCSS** for styling.

### 2. **Detail View**
   - Displays detailed information about the selected stock, such as:
     - Name
     - Symbol
     - Current price
     - Additional stock data fetched from Alphavantage API.
   - Includes a chart (rendered client-side) that shows the stock's price history.
   - Implemented using **Next.js** server-side rendering (SSR) for faster loading.
   
### 3. **Favorites View**
   - A separate view where users can see their favorite stocks.
   - Uses **local storage** to store and retrieve the user's search history.

### 4. **Error Handling**
   - A custom **Not Found** page is implemented for when a stock search returns no results.
   - A general **Error Page** is also provided to handle unexpected issues.
   - Due to the free API's limitation of 25 requests per day, error pages might show if the limit is exceeded. However, in a production environment, this scenario is unlikely to occur frequently.

### 5. **Caching Mechanism**
   - Implemented caching using **tRPC** with **Tanstack Query** for efficient data fetching and to reduce the number of API requests.

### 6. **Mobile-friendly Design**
   - The app is responsive and optimized for both desktop and mobile devices.

## Challenges
- The main challenge was dealing with the **Alphavantage API’s** daily request limit (25 requests per day). While I implemented basic error handling for when the API limit is exceeded, in a real-world scenario, a more sophisticated error-handling solution could be implemented.
- Implementing **SSR** on the detail page required some additional consideration to ensure the chart could be rendered correctly on the client side after the initial server-side render.

## Installation & Setup

### 1. Clone the repository:
```bash
git clone https://github.com/ipko1996/alphavantage-client.git
cd alphavantage-client
```

### 2. Install dependencies:
```bash
pnpm install
```

3. Environment Variables:
```bash
ALPHAVANTAGE_API_KEY=demo
ALPHAVANTAGE_API_URL=https://www.alphavantage.co
```

4. Run the development server:
```bash
pnpm run dev
```

Open http://localhost:3000 to view the app in your browser.

## Deployment

The application is deployed on **Vercel** and can be accessed publicly at [https://alphavantage-client.vercel.app/](https://alphavantage-client.vercel.app/).

## Tech Stack

- **Next.js with T3 Starter**: A React-based framework for server-side rendering and routing using the [T3 Starter](https://create.t3.gg/).
- **Alphavantage API**: A public data source for retrieving stock information.
- **tRPC (Tanstack Query)**: Used for efficient data fetching and caching.
- **TailwindCSS**: A utility-first framework for responsive and mobile-friendly design.
- **Local Storage**: Used to store the last five searched stocks.
- **Mantine**: A library used for the autocomplete component and other UI elements.

## Future Improvements

- **Advanced Error Handling**: Improved feedback when the API request limit is reached or other network errors occur.
- **Expanded Search Autocomplete**: Provide more detailed suggestions as the user types.
- **User Accounts**: Allow users to save favorite stocks across sessions using user accounts instead of local storage.
- **Chart Customization**: Enhance the stock chart with more customization and interactivity.

## Known Limitations

- **API Request Limit**: The Alphavantage API has a daily request limit of 25 requests, which may cause errors when testing the app extensively. In a production setup, an upgraded API plan or alternative data sources would resolve this issue.
