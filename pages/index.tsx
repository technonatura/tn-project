import * as React from "react";
import { Grid, Container } from "@mui/material";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MainCard from "components/Cards/main";

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard
              title="TechnoNatura Project"
              description="Welcome to TechnoNatura Project!"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
