import type { NextApiRequest, NextApiResponse } from "next";
import Shopify, { updateShopifyContext } from "lib/shopify";

// Handle incoming webhooks.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Provide HOST_NAME here just in case it was not provided by env variable
  // This might occur during the first deploy to Vercel when you don't yet know
  // what domain your app is being hosted on
  if (req.headers.host) {
    updateShopifyContext({ HOST_NAME: req.headers.host });
  }

  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`Webhook processed, returned status code 200`);
  } catch (error) {
    console.log(`Failed to process webhook: ${error}`);
  }
};
