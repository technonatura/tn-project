import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Tooltip from "@mui/material/Tooltip";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Explore Your Friends Creations!
        </Typography>
        <Typography component="p" color="GrayText">
          Explore Your Friends Creations!
        </Typography>
      </Box>
      <Box>
        <SearchInput />
      </Box>
    </Container>
  );
}

function SearchInput() {
  return (
    <Paper
      component="form"
      sx={{
        p: "1px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        mb: 5,
      }}
      elevation={2}
    >
      <Tooltip title="Search Filter">
        <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search TechnoNatura Project"
        inputProps={{ "aria-label": "search TechnoNatura project" }}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
