import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NextLink from "next/link";

import SearchInput from "components/explore/Search";

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
      <Stack direction="row" justifyItems="stretch" spacing={2}>
        <Button variant="contained" fullWidth>
          Creations
        </Button>
        <NextLink href="/explore/users">
          <Button variant="outlined" fullWidth>
            Users
          </Button>
        </NextLink>
      </Stack>
    </Container>
  );
}
