import PropTypes from "prop-types";
// material
import { CssBaseline, Container } from "@mui/material/";
import {
  ThemeProvider,
  StyledEngineProvider as StylesProvider,
  createTheme,
} from "@mui/material/styles";

import {
  MobileView,
  BrowserView,
  isMobile,
  isDesktop,
} from "react-device-detect";

import MobileNav from "components/nav/mobile";
import AppBar from "components/nav/appbar";
import NProgress from "components/nav/nprogress";

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

  theme.components = componentsOverride(theme);
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <NProgress />

        {/* <MobileView> */}
        <Container maxWidth="sm" style={{ padding: 0 }}>
          <AppBar />
          {children} <MobileNav />
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
