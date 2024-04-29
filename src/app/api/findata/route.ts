import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get the 'n' parameter from the URL
    const { searchParams } = new URL(request.url);
    const symbolParam = searchParams.get("symbol");

    // Validate the 'symbol' parameter
    let symbol = "AAPL"; // Default to APPL
    if (symbolParam === null || symbolParam === undefined) {
      throw new Error(
        "Invalid 'symbol' parameter. Please provide a string for ticker symbol."
      );
    } else {
      symbol = symbolParam;
    }

    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=A8GDX8XMSCO8JPE8`
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    // Parse the JSON response
    const data: { results: any[] } = await response.json();
    console.log(data);

    // Get the origin of the request
    const origin = request.headers.get("Origin");

    // Check if the origin is allowed
    const allowedPattern = /^(https?:\/\/)?([^.]*\.)*framercanvas\.com/;
    const isAllowed = allowedPattern.test(origin || "");

    // Set response headers
    const headers = new Headers({
      "Content-Type": "application/json",
    });

    // Set CORS header if the origin is allowed
    if (isAllowed) {
      headers.set("Access-Control-Allow-Origin", origin!);
    }

    // Return all fetched users as JSON
    return NextResponse.json({ data: data }, { status: 200, headers });
  } catch (error) {
    // Handle errors
    console.error("Error fetching or processing data:", error);
    return new NextResponse("Error fetching data", { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     // Get the 'n' parameter from the URL
//     const { searchParams } = new URL(request.url);
//     const nParam = searchParams.get("n");

//     // Validate the 'n' parameter
//     let n = 10; // Default to 10 users
//     if (nParam) {
//       const parsedN = parseInt(nParam, 10);
//       if (!isNaN(parsedN) && parsedN > 0) {
//         n = parsedN;
//       } else {
//         throw new Error(
//           "Invalid 'n' parameter. Please provide a positive integer."
//         );
//       }
//     }

//     // Fetch data from the Random User API with the specified number of users
//     const response = await fetch(`https://randomuser.me/api/?results=${n}`);

//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     // Parse the JSON response
//     const data: { results: any[] } = await response.json();
//     console.log(data);

//     // Get the origin of the request
//     const origin = request.headers.get("Origin");

//     // Define allowed origins (replace with your actual allowed origins)
//     const allowedOrigins = [
//       "https://short-parts-868351.framer.app/",
//       "https://framer.website/",
//     ];

//     // Check if the origin is allowed
//     const isAllowed = allowedOrigins.some((allowedOrigin) =>
//       origin?.startsWith(allowedOrigin)
//     );

//     // Set response headers
//     const headers = new Headers({
//       "Content-Type": "application/json",
//     });

//     // Set CORS header if the origin is allowed
//     if (isAllowed) {
//       headers.set("Access-Control-Allow-Origin", origin!);
//     }

//     // Return all fetched users as JSON
//     return NextResponse.json({ data: data.results }, { status: 200, headers });
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching or processing data:", error);
//     return new NextResponse("Error fetching data", { status: 500 });
//   }
// }

// import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     // Get the 'n' parameter from the URL
//     const { searchParams } = new URL(request.url);
//     const symbolParam = searchParams.get("symbol");

//     // Validate the 'symbol' parameter
//     let symbol = "AAPL"; // Default to APPL
//     if (symbolParam === null || symbolParam === undefined) {
//       return new Response(
//         "Invalid parameters. Please provide symbol and date.",
//         {
//           status: 400,
//           headers: { "Content-Type": "text/plain" },
//         }
//       );
//     } else {
//       symbol = symbolParam;
//     }

//     const response = await fetch(
//       `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=4CNGFTFLHSMIFKMP`
//     );

//     // Check if the request was successful
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     // Parse the JSON response
//     const data: { results: any[] } = await response.json();
//     console.log(data);

//     // Get the origin of the request
//     const origin = request.headers.get("Origin");

//     // Define allowed origins (replace with your actual allowed origins)
//     const allowedOrigins = [
//       "https://short-parts-868351.framer.app/",
//       "https://framer.website/",
//     ];

//     // Check if the origin is allowed
//     const isAllowed = allowedOrigins.some((allowedOrigin) =>
//       origin?.startsWith(allowedOrigin)
//     );

//     // Set response headers
//     const headers = new Headers({
//       "Content-Type": "application/json",
//     });

//     // Set CORS header if the origin is allowed
//     if (isAllowed) {
//       headers.set("Access-Control-Allow-Origin", origin!);
//     }

//     // Return all fetched users as JSON
//     return NextResponse.json({ data: data }, { status: 200, headers });
//   } catch (error) {
//     // Handle errors
//     console.error("Error fetching or processing data:", error);
//     return new NextResponse("Error fetching data", { status: 500 });
//   }
// }
