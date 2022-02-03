// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Shopify, { updateShopifyContext } from "lib/shopify";

// Handle login and begin Shopify OAuth.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { shop } = req.query;
  if (!shop || Array.isArray(shop)) {
    res.status(400);
    res.end();
    return;
  }

  try {
    const authRoute = await Shopify.Auth.beginAuth(
      req,
      res,
      shop,
      "/api/auth/callback",
      true
    );
    console.log("New OAuth process begining.");
    res.writeHead(302, { Location: authRoute }).end();
  } catch (e) {
    console.log(e);

    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    } else {
      res.end(`Failed to complete OAuth process: ${JSON.stringify(e)}`);
    }
  }
  return;
};
