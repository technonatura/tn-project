import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import Router from "next/router";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";

import styled from "@emotion/styled";

const BottomNav = styled(BottomNavigation)`
  width: 100%;
  display: flex;
  flexdirection: row;
  justifyitems: stretch;
`;

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");

  const [] = useState({
    color: "#29D",
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3,
  });
  useEffect(() => {
    if (["/", "/explore", "/account"].includes(Router.pathname)) {
      setValue(Router.pathname.replace("/", ""));
    }
  }, []);

  const routeChangeStart = useCallback(() => {
    //  NProgress.set(state.startPosition);
    //  NProgress.start();
    console.log(Router);
  }, []);
  //  const routeChangeEnd = useCallback(() => {
  //    clearTimeout(timer);
  //    timer = setTimeout(() => void NProgress.done(true), state.stopDelayMs);
  //   //  dispatch(AuthMethods.AuthRemoveErrors());
  //  }, []);

  useEffect(() => {
    //  NProgress.configure({ easing: "ease", speed: 500 });

    Router.events.on("routeChangeStart", routeChangeStart);
    //  Router.events.on("routeChangeComplete", routeChangeEnd);
    //  Router.events.on("routeChangeError", routeChangeEnd);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    Router.push(`/${newValue}`);
  };

  return (
    <>
      <Divider light />

      <BottomNav value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Explore"
          value="explore"
          icon={<ExploreIcon />}
        />

        <BottomNavigationAction
          label="Account"
          value="account"
          icon={<AccountCircleIcon />}
        />
      </BottomNav>
    </>
  );
}
