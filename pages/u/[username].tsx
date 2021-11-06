import { GetServerSideProps } from "next";
import {
  Container,
  Avatar,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useWindowWidth } from "@react-hook/window-size/throttled";

import SearchBar from "components/Profile/Search";

function UserInformationData({
  followers,
  follows,
  projects,
}: {
  followers: number;
  follows: number;
  projects: number;
}) {
  return (
    <Stack sx={{ width: "100%" }} direction="row" justifyItems="stretch">
      <Typography
        sx={{
          ":hover": {
            color: "#454F5B",
            cursor: "pointer",
          },
        }}
        component="p"
        gutterBottom
      >
        <b>{followers}</b> Followers
      </Typography>
      <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" flexItem />

      <Typography
        sx={{
          ":hover": {
            color: "#454F5B",
            cursor: "pointer",
          },
        }}
        component="p"
        gutterBottom
      >
        <b>{projects}</b> Projects
      </Typography>
      <Divider sx={{ ml: 1, mr: 1 }} orientation="vertical" flexItem />

      <Typography
        sx={{
          ":hover": {
            color: "#454F5B",
            cursor: "pointer",
          },
        }}
        component="p"
        gutterBottom
      >
        <b>{follows}</b> Follows
      </Typography>
    </Stack>
  );
}

export default function ProfilePage({ username }: { username: string }) {
  // const authState = useSelector((state: RootStore) => state.user);
  const windowWidth = useWindowWidth();
  console.log(windowWidth);
  return (
    <Container>
      <Stack
        sx={{ mt: 4, mb: 2 }}
        direction="row"
        alignItems="center"
        justifyItems="stretch"
      >
        <Avatar
          sx={{
            width: windowWidth >= 466 ? 100 : 60,
            height: windowWidth >= 466 ? 100 : 60,
            marginRight: 2,
          }}
          src={username}
          // @ts-ignore
          alt={username}
        ></Avatar>
        <Stack
          sx={{ width: "100%" }}
          alignSelf="ceter"
          justifySelf="center"
          direction="column"
          justifyItems="stretch"
        >
          <Stack
            sx={{ width: "100%" }}
            direction={windowWidth >= 466 ? "row" : "column"}
            justifyItems="stretch"
          >
            <Typography
              sx={{
                wordBreak: "break-word",
                maxWidth: windowWidth >= 466 ? "60%" : "100%",
              }}
              variant="h3"
              component="h1"
              gutterBottom
            >
              Aldhaneka
            </Typography>
            <Typography
              sx={{
                wordBreak: "break-word",
                maxWidth: windowWidth >= 466 ? "40%" : "100%",
              }}
              alignSelf={windowWidth >= 466 ? "center" : "unset"}
              component="p"
              gutterBottom
              ml={windowWidth >= 466 ? 1 : 0}
            >
              @{username}
            </Typography>
          </Stack>

          {windowWidth >= 466 && (
            <UserInformationData followers={100} follows={10} projects={1} />
          )}
        </Stack>
      </Stack>

      <Container sx={{ display: "flex", justifyContent: "center" }}>
        {windowWidth < 466 && (
          <UserInformationData followers={100} follows={10} projects={1} />
        )}
      </Container>
      <Stack sx={{ width: "100%" }} direction="row" justifyItems="stretch">
        <Button sx={{ mt: 1, mr: 1 }} fullWidth variant="contained">
          Follow
        </Button>
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
