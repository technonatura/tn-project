import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import Router from "next/router";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

import styled from "@emotion/styled";

const BottomNav = styled(BottomNavigation)`
  width: 100%;
  display: flex;
  flexdirection: row;
  justifyitems: stretch;
`;

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("recents");
  const [show, setShow] = React.useState(false);

  const [] = useState({
    color: "#29D",
    startPosition: 0.3,
    stopDelayMs: 200,
    height: 3,
  });
  useEffect(() => {
    if (["/", "/explore", "/my"].includes(Router.pathname)) {
      setValue(Router.pathname.replace("/", ""));
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const routeChangeEnd = useCallback(() => {
    if (["/", "/explore", "/my"].includes(Router.pathname)) {
      if (!show) {
        setShow(true);
      }

      if (value !== Router.pathname.replace("/", "")) {
        setValue(Router.pathname.replace("/", ""));
      }
    } else {
      if (show) {
        setShow(false);
      }
    }
  }, []);

  useEffect(() => {
    Router.events.on("routeChangeComplete", routeChangeEnd);
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    if (value !== newValue) {
      setValue(newValue);
    }
    Router.push(`/${newValue}`);
  };

  if (!show) {
    return "";
  }

  return (
    <>
      <Box
        sx={{
          "& > :not(style)": { m: 1 },
          position: "fixed",
          right: 10,
          bottom: 60,
        }}
      >
        <Fab variant="extended" size="medium" color="primary" aria-label="add">
          <AddIcon sx={{ mr: 1 }} />
          Post Project
        </Fab>
      </Box>

      <Box
        sx={{
          position: "fixed",
          right: 10,
          bottom: 0,
          width: "100%",
        }}
      >
        <Divider />
        <BottomNav value={value} onChange={handleChange}>
          <BottomNavigationAction label="Home" value="" icon={<HomeIcon />} />
          <BottomNavigationAction
            label="Explore"
            value="explore"
            icon={<ExploreIcon />}
          />

          <BottomNavigationAction
            label="Account"
            value="my"
            icon={<AccountCircleIcon />}
          />
        </BottomNav>
      </Box>
    </>
  );
}
