import "@shopify/polaris/build/esm/styles.css";
import type { AppProps } from "next/app";
import { PolarisProvider } from "providers/PolarisProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PolarisProvider>
      <Component {...pageProps} />
    </PolarisProvider>
  );
}

export default MyApp;
