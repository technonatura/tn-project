import * as React from "react";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import {
  Container,
  Avatar,
  Stack,
  Typography,
  Button,
  Divider,
  Paper,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootStore } from "global/index";

import getProject from "utils/getProject";
import Renderer from "components/project/content/index";

import { useWindowWidth } from "@react-hook/window-size/throttled";

import { ProjectPostInterface } from "types/models/Project/index";
import { LazyLoadImage } from "react-lazy-load-image-component";

export default function ProfilePage({
  project,
}: //   username,
//   user,
//   userProject,
{
  projectName: string;
  project: ProjectPostInterface;
}) {
  const authState = useSelector((state: RootStore) => state.user);
  const windowWidth = useWindowWidth();
  return (
    <>
      <NextSeo
        title={` - TechnoNatura Project`}
        description={`See 's Projects on TechnoNatura Project`}
      />
      <Container sx={{ pt: 5, pb: 10 }}>
        {" "}
        <LazyLoadImage
          alt={project.name}
          effect="blur"
          width="auto"
          src={project.thumbnail}
        />
        <Typography component="h1" fontWeight={900} fontSize={30}>
          {project.title}
        </Typography>
        <Typography component="p" fontSize={20} color="#454F5B">
          {project.desc}
        </Typography>
        <Typography component="p" color="#637381">
          {String(new Date(project.created))}
        </Typography>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Renderer content={project.content} editable={false} />
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Paper
          variant="outlined"
          sx={{
            p: "10px 20px",

            mb: 2,
          }}
        >
          Aldhanekaa
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            p: "10px 20px",
            display: "flex",
            justifyContent: "center",
            color: "#C4CDD5",
            cursor: "not-allowed",
          }}
        >
          Comment Section is not available for now
        </Paper>
        <Divider sx={{ mt: 5, mb: 5 }} />
        <Typography component="p" fontSize={20} color="#454F5B">
          More from this author
        </Typography>
      </Container>
    </>
  );
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps<
  {
    projectName: string;
  },
  {
    projectName: string;
  }
> = async (context) => {
  console.log(context.query.projectName);
  // @ts-ignore
  const project = await getProject(context.query.projectName);

  if (!project.project) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projectName: context.query.projectName,
      project: project.project,
      //   ...user,
    },
  };
};
