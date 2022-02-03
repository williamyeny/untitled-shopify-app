import Shopify, { ApiVersion, ContextParams } from "@shopify/shopify-api";

const context = {
  API_KEY: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY ?? "",
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET ?? "",
  SCOPES: process.env.SHOPIFY_SCOPES?.split(",") ?? [],
  HOST_NAME: process.env.HOST ?? "",
  IS_EMBEDDED_APP: true,
  API_VERSION: ApiVersion.October21,
};

Shopify.Context.initialize(context);

export const updateShopifyContext = (
  partialContext: Partial<ContextParams>
) => {
  Shopify.Context.initialize({ ...context, ...partialContext });
};

export default Shopify;
