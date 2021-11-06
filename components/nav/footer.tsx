import * as React from "react";

import { useRouter } from "next/router";

import { Container, Typography, Divider, Link } from "@mui/material/";

export default function LabelBottomNavigation() {
  const router = useRouter();

  if (["/profile/[username]"].includes(router.pathname)) {
    return (
      <Container
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 0,
          width: "100%",
        }}
        style={{ padding: 0 }}
      >
        <Container
          maxWidth="sm"
          sx={{
            padding: "20px 10px",
            backgroundColor: (theme) => theme.palette.grey[100],
          }}
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            TechnoNatura Project
          </Typography>
          <Link href="#" fontSize={12}>
            About
          </Link>{" "}
          –{" "}
          <Link href="#" fontSize={12}>
            Terms of Use
          </Link>{" "}
          –{" "}
          <Link href="#" fontSize={12}>
            Privacy Policy
          </Link>
          <Divider sx={{ marginTop: 2 }} />
          <Typography
            component="div"
            fontSize={10}
            mt={2}
            color="gray"
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            {"Copyright © 2021 Aldhanekaa  "}
            <br /> All art works are copyrighted by their owner | This App is
            part of Aldhanekaa
          </Typography>
        </Container>
      </Container>
    );
  }

  return <p></p>;
}
