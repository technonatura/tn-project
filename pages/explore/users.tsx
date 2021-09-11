import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import NextLink from "next/link";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import SearchInput from "components/explore/Search";

const users = [
  {
    name: "Aldhaneka",
    username: "aldhanekaa",
    avatar: "http://google.com",
    bio: "Halo semua!!",
  },
  {
    name: "Bullitt",
    username: "zulfiqar",
    avatar: "http://google.com",
    bio: "Sup!",
  },
  {
    name: "Arsa Satria",
    username: "arsa",
    avatar: "http://google.com",
    bio: "https://arsa.me <- check it out",
  },
];

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Who are you looking for?
        </Typography>
        <Typography component="p" color="GrayText">
          Explore Your Friends Creations!
        </Typography>
      </Box>
      <Box>
        <SearchInput />
      </Box>
      <Stack direction="row" justifyItems="stretch" spacing={2} mb={2}>
        <NextLink href="/explore">
          <Button variant="outlined" fullWidth>
            Creations
          </Button>
        </NextLink>

        <Button variant="contained" fullWidth>
          Users
        </Button>
      </Stack>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {users.map((user) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                style={{ marginLeft: "10px", marginTop: "5px" }}
                primary={
                  <NextLink href={`/user/${user.username}`}>
                    <Link style={{ cursor: "pointer" }}>{user.name}</Link>
                  </NextLink>
                }
                secondary={<React.Fragment>{user.bio}</React.Fragment>}
              />
            </ListItem>
            <Divider component="li" style={{ margin: "5px 0px" }} />
          </>
        ))}
      </List>
    </Container>
  );
}
