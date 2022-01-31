// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export const shops = new Map();
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { shop } = req.query;
  console.log("HITTING");
  if (shops.has(shop)) {
    return res.send("hello");
  }
  return res.redirect(`/api/auth?shop=${shop}`);
};

export default handler;
