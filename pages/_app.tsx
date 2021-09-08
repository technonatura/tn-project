import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { CacheProvider, EmotionCache } from "@emotion/react";
import ThemeConfig from "../theme";
import createEmotionCache from "../components/createEmotionCache";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  MobileView,
  BrowserView,
  isMobile,
  isDesktop,
} from "react-device-detect";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeConfig>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <Component {...pageProps} />
      </ThemeConfig>
    </CacheProvider>
  );
}
