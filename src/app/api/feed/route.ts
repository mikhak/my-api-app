import { NextRequest, NextResponse } from "next/server";

import RSSParser from "rss-parser";
const rssParser = new RSSParser();

export async function GET(request: NextRequest) {
  try {
    // Get the 'n' parameter from the URL
    const { searchParams } = new URL(request.url);
    const feedUrlParam = searchParams.get("url");

    // Validate the 'feedUrl' parameter
    let feedUrl = "https://www.belfercenter.org/rss/topic/3303/feed"; // Default to APPL
    if (feedUrlParam === null || feedUrlParam === undefined) {
      throw new Error(
        "Invalid 'url' parameter. Please provide a string for feed url."
      );
    } else {
      feedUrl = feedUrlParam;
    }

    const feed = await rssParser.parseURL(feedUrl);

    //Check if the request was successful
    if (feed?.items.length === 0) {
      throw new Error("Failed to fetch data");
    }

    // Parse the JSON response
    const data: any[] = feed.items;
    // console.log(data);

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
