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

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Hello Aldhaneka!
        </Typography>
        <Typography component="p" gutterBottom color="gray">
          Welcome to Account Page, you can customise your TechnoNatura Project
          Page
        </Typography>
      </Box>
      <List sx={style} component="nav" aria-label="mailbox folders">
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <FolderIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="My Projects"
            sx={{ marginLeft: "10px" }}
            secondary="My projects in grade ..."
          />
        </ListItem>
        <Divider />
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
        style={{ width: "100%", marginBottom: "20px", marginTop: "10px" }}
        variant="contained"
        color="error"
      >
        Logout
      </Button>
    </Container>
  );
}
