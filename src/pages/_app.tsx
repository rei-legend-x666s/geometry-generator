import "../styles/globals.css";
import { CacheProvider } from "@emotion/react";
// eslint-disable-next-line import/named
import { EmotionCache } from "@emotion/utils";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Layout from "../components/Layout/Layout";
import DummyDataProvider from "../context/DummyDataProvider";
import GlobalDataProvider from "../context/GlobalDataProvider";
import createEmotionCache from "../styles/createEmotionCache";
import { lightTheme } from "../styles/theme";
import "../styles/Map.css";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <GlobalDataProvider>
          <DummyDataProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </DummyDataProvider>
        </GlobalDataProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
