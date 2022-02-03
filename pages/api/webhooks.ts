import type { NextApiRequest, NextApiResponse } from "next";
import Shopify, { updateShopifyContext } from "lib/shopify";

// Handle incoming webhooks.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`Webhook processed, returned status code 200`);
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
};
