import * as React from "react";
import { Grid, Container } from "@mui/material";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MainCard from "components/Cards/main";

import ProTip from "../components/ProTip";
import Link from "../components/Link";
import Copyright from "../components/Copyright";

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
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js v5-beta with TypeScript example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
