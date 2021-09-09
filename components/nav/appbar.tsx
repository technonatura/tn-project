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
import Drawer from "@mui/material/Drawer";

import NextLink from "next/link";

import { useRouter } from "next/router";
import { Divider } from "@mui/material";

const blackListPages = ["/login"];

export default function ProminentAppBar() {
  const router = useRouter();
  const [openSearchDialog, setOpenSearchDialog] = React.useState(false);

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

  if (blackListPages.includes(router.pathname)) {
    return "";
  }
  return (
    <>
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

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
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
