import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import {
  Container,
  Avatar,
  Stack,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";

import getUser from "utils/getUser";

import { useWindowWidth } from "@react-hook/window-size/throttled";

import SearchBar from "components/Profile/Search";

import { UserProjectInterface } from "models/userProject";
import { UserInterface } from "models/User/index";

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
          ":active": {
            color: "#637381",
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
          ":active": {
            color: "#637381",
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
          ":active": {
            color: "#637381",
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

export default function ProfilePage({
  username,
  user,
  userProject,
}: {
  username: string;
  message: string;
  status: "success" | "error" | "info";
  userProject: UserProjectInterface & { _id: string; followers: Array<string> };
  user: UserInterface;
}) {
  const authState = useSelector((state: RootStore) => state.user);
  const windowWidth = useWindowWidth();
  console.log(authState);
  return (
    <>
      <NextSeo
        title={`${user.fullName} Projects - TechnoNatura Project`}
        description={`See ${user.fullName}'s Projects on TechnoNatura Project`}
      />
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
                {user.fullName}
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
                @{user.username}
              </Typography>
            </Stack>

            {windowWidth >= 466 && (
              <UserInformationData
                followers={userProject.followers.length}
                follows={userProject.follows.length}
                projects={userProject.projects}
              />
            )}
          </Stack>
        </Stack>
        <Typography
          sx={{
            wordBreak: "break-word",
            maxWidth: "100%",
            textAlign: "justify",
            color: "#637381",
          }}
          component="p"
          gutterBottom
        >
          {userProject.bio}
        </Typography>
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          {windowWidth < 466 && (
            <UserInformationData followers={100} follows={10} projects={1} />
          )}
        </Container>
        {authState.me && authState.me._id != userProject.userId && (
          <Stack sx={{ width: "100%" }} direction="row" justifyItems="stretch">
            <Button
              sx={{ mt: 1, mr: 1 }}
              fullWidth
              variant={
                authState.self?.follows.includes(userProject.userId)
                  ? "outlined"
                  : "contained"
              }
            >
              {authState.self?.follows.includes(userProject.userId)
                ? "Followed"
                : "Follow"}
            </Button>
          </Stack>
        )}
        {/* {authState.me && authState.me._id == userProject.userId && (
          <Stack sx={{ width: "100%" }} direction="row" justifyItems="stretch">
            <Button
              sx={{ mt: 1, mr: 1 }}
              fullWidth
              variant="contained"
              startIcon={<SettingsIcon />}
            >
              Edit Profile
            </Button>
          </Stack>
        )} */}

        <SearchBar />
      </Container>
    </>
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
  // @ts-ignore
  const user = await getUser(context.query.username);
  // console.log(user);

  if (!user.user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      username: context.query.username,
      ...user,
    },
  };
};
