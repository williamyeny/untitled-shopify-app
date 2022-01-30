import Shopify, { ApiVersion } from '@shopify/shopify-api'

export const initShopify = () => {
  const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_SCOPES, HOST } =
    process.env
  if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET || !SHOPIFY_SCOPES || !HOST) {
    console.error('Required env not found.')
    return
  }

  Shopify.Context.initialize({
    API_KEY: SHOPIFY_API_KEY,
    API_SECRET_KEY: SHOPIFY_API_SECRET,
    SCOPES: SHOPIFY_SCOPES.split(','),
    HOST_NAME: HOST.replace(/https:\/\//, ''),
    IS_EMBEDDED_APP: true,
    API_VERSION: ApiVersion.October21,
  })
}
