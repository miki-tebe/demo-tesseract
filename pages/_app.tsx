import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { HeaderResponsive } from "../components/HeaderMenu";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <HeaderResponsive
        links={[
          { link: "/", label: "Amharic OCR" },
          { link: "/convert", label: "English Amharic to Amharic" },
        ]}
      />
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;
