// import type { NextApiRequest, NextApiResponse } from "next";

// export async function GET(request: NextApiRequest, response: NextApiResponse) {
//   const url = new URL(request.url);
//   const symbol = url.searchParams.get("symbol");
//   const date = url.searchParams.get("date");

//   // Input validation
//   if (
//     symbol === null ||
//     symbol === undefined ||
//     date === null ||
//     date === undefined
//   ) {
//     return new Response("Invalid parameters. Please provide symbol and date.", {
//       status: 400,
//       headers: { "Content-Type": "text/plain" },
//     });
//   }

//   async function fetchData(symbol: string, date: string) {
//     try {
//       const response = await fetch(
//         `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=4CNGFTFLHSMIFKMP`
//       );
//       if (!response.ok) {
//         throw new Error(`Error fetching data: ${response.statusText}`);
//       }
//       return response.json();
//     } catch (error) {
//       return new Response(error.message, {
//         status: 500, // Internal Server Error
//         headers: { "Content-Type": "text/plain" },
//       });
//     }
//   }

//   try {
//     const data = await fetchData(symbol, date);
//     return new Response(JSON.stringify({ data }), {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Origin": "*", // Adjust origin as needed (consider specific origins for security)
//         "Access-Control-Allow-Methods": "GET", // Adjust methods as needed
//         "Access-Control-Allow-Headers": "Content-Type, Authorization", // Adjust headers as needed
//       },
//     });
//   } catch (error) {
//     return new Response(error.message, {
//       status: 500, // Internal Server Error
//       headers: { "Content-Type": "text/plain" },
//     });
//   }
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    const getDailyStocks = async (symbol: string, date: string) => {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&date=${date}&apikey=4CNGFTFLHSMIFKMP`
      );
      const data = await response.json();
      return data;
    };

    const data = await getDailyStocks("AAPL", "2021-09-10");
    res.status(201).json({ data });
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
}
