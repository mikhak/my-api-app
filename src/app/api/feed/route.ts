// app/api/feed.route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import RSSParser from "rss-parser";

const rssParser = new RSSParser();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const feedUrl = searchParams.get("url");

  if (!feedUrl) {
    return new NextResponse(JSON.stringify({ error: "No URL provided" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const feed = await rssParser.parseURL(feedUrl);
    return new NextResponse(JSON.stringify(feed), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to parse RSS feed" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
