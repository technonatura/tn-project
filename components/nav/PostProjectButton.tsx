import * as React from "react";

import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

import AddIcon from "@mui/icons-material/Add";

export default function LabelBottomNavigation() {
  return (
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
  );
}
