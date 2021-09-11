import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Container from "@mui/material/Container";

import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import Stack from "@mui/material/Stack";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";

import NextLink from "next/link";

import { useRouter } from "next/router";
import { Divider } from "@mui/material";

import Langs from "./languageChanger";

const blackListPages = ["/login"];

export default function ProminentAppBar() {
  const router = useRouter();
  const [openSearchDialog, setOpenSearchDialog] = React.useState(false);
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const [openLoginAlert, setopenLoginAlert] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenSearchDialog = () => {
    setOpenSearchDialog(true);
  };

  const handleCloseSearchDialog = () => {
    setOpenSearchDialog(false);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpenSidebar(open);
    };

  const sidebar = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box sx={{ paddingLeft: 2, paddingTop: 2, paddingRight: 2 }}>
        <Stack direction="row" spacing={2}>
          <Typography variant="h3" color="primary">
            TN Project
          </Typography>{" "}
        </Stack>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Stack direction="row" spacing={2} mb={2}>
          <Langs />
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<ManageAccountsIcon />}
          >
            Account
          </Button>

          <Tooltip title="Logout" arrow>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <LogoutIcon />{" "}
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Box>
  );

  if (blackListPages.includes(router.pathname)) {
    return "";
  }
  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={openSidebar}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {sidebar()}
      </SwipeableDrawer>
      <Dialog open={openSearchDialog} onClose={handleCloseSearchDialog}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSearchDialog}>Cancel</Button>
          <Button onClick={handleCloseSearchDialog}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <Container
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          width: "100%",
          padding: 0,
        }}
        style={{ padding: 0 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: 0,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { sm: "block" } }}
                >
                  TechnoNatura Project
                </Typography>

                <IconButton
                  size="large"
                  aria-label="search"
                  color="inherit"
                  onClick={handleClickOpenSearchDialog}
                >
                  <SearchIcon />
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="display more actions"
                  edge="end"
                  color="inherit"
                  onClick={handleClick}
                >
                  <MoreIcon />
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <NextLink href="/my">
                    <MenuItem onClick={handleClose}>My Account</MenuItem>
                  </NextLink>
                  <NextLink href="/login">
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                  </NextLink>
                  <Divider />
                  <NextLink href="/api/logout">
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </NextLink>

                  {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                </Menu>
              </Toolbar>
            </AppBar>
          </Box>
        </Container>
      </Container>
      <Container>
        <Box sx={{ width: "100%", mt: 2 }}>
          <Collapse in={openLoginAlert}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setopenLoginAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <Link href="/login">Login</Link> to post your project.
            </Alert>
          </Collapse>
        </Box>
      </Container>
    </>
  );
}
