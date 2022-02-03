import { updateShopifyContext } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export default async (req: NextRequest) => {
  // On first deploy to Vercel, the Vercel URL is randomly generated,
  // meaning the host is unknown until then. So this middleware updates
  // the host on every request.
  const host = req.headers.get("host");
  if (host) {
    updateShopifyContext({ HOST_NAME: host });
  }
  return NextResponse.next();
};
