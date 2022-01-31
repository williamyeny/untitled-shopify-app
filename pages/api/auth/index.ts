// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Shopify } from "@shopify/shopify-api";
import { initShopify } from "../../../utils/shopify";

initShopify();

// Authenticate w/ Shopify oauth.
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { shop } = req.query;
  if (!shop || Array.isArray(shop)) {
    return res.status(400).end();
  }
  let authRoute = await Shopify.Auth.beginAuth(
    req,
    res,
    shop,
    "api/auth/callback",
    false
  );
  return res.send(authRoute);
};

export default handler;
