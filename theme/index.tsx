import { useEffect } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";

import PropTypes from "prop-types";
// material
import { CssBaseline, Container } from "@mui/material/";
import {
  ThemeProvider,
  StyledEngineProvider as StylesProvider,
  createTheme,
} from "@mui/material/styles";

import MobileNav from "components/nav/mobile";
import AppBar from "components/nav/appbar";
import NProgress from "components/nav/nprogress";

import useUser from "hooks/useUser";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//
import shape from "./shape";
import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
// eslint-disable-next-line import/no-cycle
import GlobalStyles from "./globalStyles";
import componentsOverride from "./overrides";
import shadows, { customShadows } from "./shadows";

// ----------------------------------------------------------------------

const theme = createTheme({
  palette,
  shape,
  // @ts-ignore
  typography,
  breakpoints,
  // @ts-ignore
  shadows,
  customShadows,
});

export { theme };
export default function ThemeConfig({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const router = useRouter();
  const { user } = useUser();
  const authState = useSelector((state: RootStore) => state.user);

  // const themeOptions = useMemo(
  //   () => ({
  //     palette,
  //     shape,
  //     typography,
  //     breakpoints,
  //     shadows,
  //     customShadows,
  //   }),
  //   [],
  // );

  useEffect(() => {
    console.log("hey");
    if (
      authState.fetched &&
      !authState.me &&
      !["/login", "/signin", "/register", "/signup"].includes(
        router.pathname
      ) &&
      ["/account", "/my", "/"].includes(router.pathname)
    ) {
      router.push(`/login?to=${router.pathname}`);
    }
  }, [router.pathname]);

  theme.components = componentsOverride(theme);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <NProgress />

        {/* <MobileView> */}
        <Container maxWidth="sm" style={{ padding: 0, paddingTop: 70 }}>
          {/* @ts-ignore */}
          <AppBar />
          {["/account", "/my", "/"].includes(router.pathname) &&
          !authState.me ? (
            <Box
              sx={{ display: "flex", justifyContent: "center" }}
              width="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            children
          )}

          {/* @ts-ignore */}
          <MobileNav />
        </Container>
        {/* </MobileView> */}
      </ThemeProvider>
    </StylesProvider>
  );
}

ThemeConfig.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
};
