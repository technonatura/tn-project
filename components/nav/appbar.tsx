import * as React from "react";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";

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
import Paper from "@mui/material/Paper";
import CloseIcon from "@mui/icons-material/Close";
import Link from "@mui/material/Link";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import theme from "theme/theme";

import Stack from "@mui/material/Stack";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import NextLink from "next/link";

import { useRouter } from "next/router";
import { Divider } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Slide from "@mui/material/Slide";

import Langs from "./languageChanger";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.35),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  color: "white",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  width: "100%",

  "& .MuiInputBase-input": {
    color: "white",
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "100%",
      "&:focus": {
        width: "100%",
      },
    },
  },
}));

const blackListPages = ["/login"];

export default function ProminentAppBar() {
  const containerRef = React.useRef(null);

  const router = useRouter();
  const authState = useSelector((state: RootStore) => state.user);
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

      <Container
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          top: 0,
          width: "100%",
          padding: 0,
          zIndex: 999,
        }}
        style={{ padding: 0 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: 0,
          }}
        >
          <Box sx={{ flexGrow: 1 }} ref={containerRef}>
            <Slide
              direction="down"
              in={openSearchDialog}
              container={containerRef.current}
            >
              <Container
                sx={{
                  position: "absolute",
                  width: "100%",
                  right: 0,
                  left: 0,
                  height: "auto",
                  zIndex: 999,
                }}
                maxWidth="sm"
              >
                <AppBar position="static">
                  <Toolbar
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Paper
                      component={Search}
                      sx={{
                        backgroundColor: alpha(theme.palette.common.white, 0.3),
                        "::placeholder": {
                          color: "white",
                          opacity: 1,
                        },
                        width: "100% !important",
                      }}
                    >
                      <InputBase
                        sx={{
                          ml: 1,
                          flex: 1,
                          color: "white",
                          "::placeholder": {
                            color: "white",
                            opacity: 1,
                          },
                        }}
                        placeholder="Search Google Maps"
                        inputProps={{ "aria-label": "search google maps" }}
                      />
                      <IconButton
                        type="submit"
                        sx={{ p: "10px", color: "white" }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <Divider
                        sx={{
                          height: 30,
                          m: 0.5,
                          backgroundColor: alpha(
                            theme.palette.common.white,
                            0.5
                          ),
                        }}
                        orientation="vertical"
                      />
                      <IconButton
                        color="primary"
                        sx={{ p: "10px", color: "white" }}
                        aria-label="directions"
                        onClick={handleCloseSearchDialog}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Paper>
                  </Toolbar>
                </AppBar>
              </Container>
            </Slide>

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

      {!authState.me && authState.fetched && (
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
      )}
    </>
  );
}
