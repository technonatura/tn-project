import * as React from "react";
import { useState, useCallback, useEffect } from "react";

import Router from "next/router";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Divider from "@mui/material/Divider";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExploreIcon from "@mui/icons-material/Explore";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { Container } from "@mui/material/";

import AddIcon from "@mui/icons-material/Add";

import styled from "@emotion/styled";

const BottomNav = styled(BottomNavigation)`
  width: 100%;
  display: flex;
  flexdirection: row;
  justifyitems: stretch;
`;

const navigations = [
  {
    urls: ["/"],
    link: "",
    name: "Home",
    icon: <HomeIcon />,
  },

  {
    urls: ["/explore", "/explore/users"],
    link: "explore",
    name: "Explore",
    icon: <ExploreIcon />,
  },
  {
    urls: ["/notifications"],
    link: "notifications",
    name: "Notifications",
    icon: <NotificationsIcon />,
  },
  {
    urls: ["/my", "/my/projects", "/my/projects/archives"],
    link: "my",
    name: "Account",
    icon: <AccountCircleIcon />,
  },
];

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
    if (["/", "/explore", "/my", "/explore/users"].includes(Router.pathname)) {
      setValue(Router.pathname.replace("/", ""));
      setShow(true);
    } else {
      setShow(false);
    }
  }, []);

  const routeChangeEnd = useCallback(() => {
    if (["/", "/explore", "/my", "/explore/users"].includes(Router.pathname)) {
      if (!show) {
        setShow(true);
      }

      if (value !== Router.pathname.replace("/", "")) {
        setValue(Router.pathname.replace("/", ""));
      }
    } else {
      setShow(false);
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
      <Container
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 0,
          width: "100%",
        }}
        style={{ padding: 0 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: 0,
          }}
        >
          <Box>
            <Divider />

            <BottomNav value={value} onChange={handleChange}>
              {navigations.map((nav) => (
                <BottomNavigationAction
                  label={nav.name}
                  value={nav.link}
                  icon={nav.icon}
                />
              ))}
            </BottomNav>
          </Box>
        </Container>
      </Container>
    </>
  );
}
