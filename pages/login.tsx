import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";

export default function Index() {
  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
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
      <Box sx={{ mb: 2, pt: 5, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TechnoNatura Project Login
        </Typography>
        <Typography component="p" gutterBottom color="gray">
          To continue please login to your Social TechnoNatura Account
        </Typography>
      </Box>

      <Button
        style={{ width: "100%", marginBottom: "20px", marginTop: "10px" }}
        variant="contained"
        color="primary"
        href="https://app.technonatura.vercel.app/login?app=tn-project"
      >
        Login with TechnoNatura Social Account
      </Button>
      <Button
        style={{ width: "100%", marginBottom: "20px" }}
        variant="outlined"
        color="primary"
        href="https://app.technonatura.vercel.app/register?app=tn-project"
      >
        Register
      </Button>
      <Box sx={{ textAlign: "center" }}>
        <Typography component="p" fontSize={12} gutterBottom color="gray">
          By loging in you agree to TechnoNatura Project{" "}
          <Link href="/terms-of-use">Terms of Use</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </Typography>
      </Box>
    </Container>
  );
}
