import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";

import LoginComponent from "components/login";
export default function Index() {
  return (
    <LoginComponent style={{ height: "100vh" }}>
      <Box sx={{ mb: 2, pt: 5 }}>
        <Button>
          <Typography component="p" gutterBottom color="gray">
            <NextLink href="/">
              <Link href="/">
                <ArrowBackIcon
                  // @ts-ignore
                  fontSize="1px"
                />{" "}
                Home
              </Link>
            </NextLink>
          </Typography>
        </Button>
      </Box>
    </LoginComponent>
  );
}
