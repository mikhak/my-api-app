// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";
import RSSParser from "rss-parser";

const rssParser = new RSSParser();

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
  let feedUrl = "https://www.nasa.gov/rss/dyn/breaking_news.rss";
  // Run the middleware
  await runMiddleware(req, res, cors);

  if (req.method === "GET") {
    const feed = await rssParser.parseURL(feedUrl);

    res.status(201).json({ feed });
  } else {
    return res
      .status(405)
      .json({ message: `${req.method} requests are not allowed` });
  }
}
