import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import {
  Container,
  Alert,
  Avatar,
  Stack,
  Button,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";
import SearchBar from "components/Profile/Search";

export default function ProfilePage({ username }: { username: string }) {
  // const authState = useSelector((state: RootStore) => state.user);

  return (
    <Container>
      <Stack sx={{ mt: 4, mb: 2 }} direction="row" justifyItems="stretch">
        <Avatar
          sx={{ width: 70, height: 70, marginRight: 2 }}
          src={username}
          // @ts-ignore
          alt={username}
        ></Avatar>
        <Stack direction="column" justifyItems="stretch">
          <Typography variant="h3" component="h1" gutterBottom>
            Aldhaneka
          </Typography>
          {/* @ts-ignore */}
          <Typography variant="p" component="p" gutterBottom>
            @{username}
          </Typography>
        </Stack>
      </Stack>
      <SearchBar />
    </Container>
  );
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  {
    username: string;
  },
  {
    username: string;
  }
> = async (context) => {
  // ...
  return {
    props: {
      username: context.query.username,
    },
  };
};
