import { AppProvider } from "@shopify/polaris";
import Link from "next/link";
import translations from "@shopify/polaris/locales/en.json";
import type { LinkLikeComponent } from "@shopify/polaris/build/ts/latest/src/utilities/link";
import type { ReactNode } from "react";

const CustomLinkComponent: LinkLikeComponent = ({
  as,
  children,
  url,
  external,
  ...rest
}) => {
  if (external) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={url}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

export const PolarisProvider = ({ children }: { children: ReactNode }) => (
  <AppProvider i18n={translations} linkComponent={CustomLinkComponent}>
    {children}
  </AppProvider>
);
