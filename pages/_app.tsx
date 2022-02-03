import "@shopify/polaris/build/esm/styles.css";
import type { AppProps } from "next/app";
import { PolarisProvider } from "providers/PolarisProvider";
import { useEffect, useState } from "react";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";

function MyApp({ Component, pageProps }: AppProps) {
  const apiKey = process.env.NEXT_PUBLIC_SHOPIFY_API_KEY;
  const [host, setHost] = useState<string>();

  useEffect(() => {
    const url = new URL(window.location.href);
    const host = url.searchParams.get("host");

    // If host is not set, than the page is being loaded outside of App Bridge
    // so we should proceed with starting OAuth
    if (host) {
      setHost(host);
    } else {
      window.location.pathname = `/api/auth/shopify/login`;
    }
  }, []);

  if (!apiKey) {
    return "Error: no Shopify API key found.";
  }

  if (!host) {
    return <div>Redirecting...</div>;
  }

  return (
    <PolarisProvider>
      <AppBridgeProvider config={{ apiKey, host, forceRedirect: true }}>
        <Component {...pageProps} />
      </AppBridgeProvider>
    </PolarisProvider>
  );
}

export default MyApp;
