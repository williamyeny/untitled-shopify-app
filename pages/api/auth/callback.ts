import type { NextApiRequest, NextApiResponse } from "next";
import { AuthQuery } from "@shopify/shopify-api";
import Shopify, { updateShopifyContext } from "lib/shopify";

// Handle auth callback from Shopify.
export default async (req: NextApiRequest, res: NextApiResponse) => {
  let redirectUrl = `/?host=${req.query.host}`;

  try {
    await Shopify.Auth.validateAuthCallback(
      req,
      res,
      req.query as unknown as AuthQuery
    );
    const currentSession = await Shopify.Utils.loadCurrentSession(req, res);

    if (currentSession && currentSession.accessToken) {
      const { accessToken, shop } = currentSession;

      const response = await Shopify.Webhooks.Registry.register({
        shop,
        accessToken,
        path: "/api/webhooks",
        topic: "APP_UNINSTALLED",
      });

      if (!response.APP_UNINSTALLED.success) {
        console.log(
          `Failed to register APP_UNINSTALLED webhook: ${response.result}`
        );
      } else {
        console.log("APP_UNINSTALLED Webhook was successfully registered");
      }

      Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
        path: "/api/webhooks",
        webhookHandler: async () => {
          console.log("App uninstalled.");
        },
      });
    }

    res.writeHead(302, { Location: redirectUrl });
    res.end();
  } catch (e) {
    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    } else {
      res.end(`Failed to complete OAuth process: ${JSON.stringify(e)}`);
    }
  }
};
