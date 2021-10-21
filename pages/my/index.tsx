import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import FolderIcon from "@mui/icons-material/Folder";
import ArchiveIcon from "@mui/icons-material/Archive";
import DashboardIcon from "@mui/icons-material/Dashboard";

import NextLink from "next/link";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";
import { Stack } from "@mui/material";

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export default function Account() {
  const authState = useSelector((state: RootStore) => state.user);

  return (
    <Container maxWidth="sm">
      <Stack sx={{ mt: 4, mb: 2 }} direction="row" justifyItems="stretch">
        <Avatar>
          <FolderIcon />
        </Avatar>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello {authState.me?.fullName}
        </Typography>
        <Typography component="p" gutterBottom color="gray">
          Welcome to Account Page, you can customise your TechnoNatura Project
          Page
        </Typography>
      </Stack>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <NextLink href="/my/projects">
          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="My Projects"
              sx={{ marginLeft: "10px" }}
              // @ts-ignore
              secondary={`My projects in grade ${authState.me?.roleInTechnoNatura.grade}`}
            />
          </ListItem>
        </NextLink>
        <Divider />
        <NextLink href="/my/projects/archives">
          <ListItem button divider>
            <ListItemAvatar>
              <Avatar>
                <ArchiveIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="My Archived Projects"
              sx={{ marginLeft: "10px" }}
              secondary="My archive projects."
            />
          </ListItem>
        </NextLink>

        <ListItem button divider>
          <ListItemAvatar>
            <Avatar>
              <DashboardIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="TechnoNatura Dashboard"
            sx={{ marginLeft: "10px" }}
          />
        </ListItem>
      </List>

      <Button
        style={{ width: "100%", marginBottom: "100px", marginTop: "10px" }}
        variant="contained"
        color="error"
      >
        Logout
      </Button>
    </Container>
  );
}
