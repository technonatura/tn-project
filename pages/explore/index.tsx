import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import NextLink from "next/link";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import SearchInput from "components/explore/Search";
import Chip from "@mui/material/Chip";

const heights = [
  { title: "This is title @1", desc: "Hello this is the desc!!" },
  {
    title: "This is title @1",
    desc: "Hello this is the desc!. Do ya know that that that that uhhhh i forgot :Dasdasdsdmaoksmdokasdm",
  },
  {
    title: "This is title @1",
    desc: "Anyways, speaking of which would you like a cup of tea?",
  },
  {
    title: "This is title @1",
    desc: "Lorem Ipsum is simpng software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "This is title @1",
    desc: " It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and m",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function ExplorePage() {
  const [tab, setTab] = React.useState<"creations" | "users">("creations");

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {tab == "users"
            ? "Who are you looking for?"
            : "Explore Your Friends Creations!"}
        </Typography>
        <Typography component="p" color="GrayText">
          {tab == "users"
            ? "Looking for someone?"
            : "Explore Your Friends Creations, and give it a like if you like it!"}
        </Typography>
      </Box>
      <Box>
        <SearchInput />
      </Box>
      <Stack direction="row" justifyItems="stretch" spacing={2} mb={4}>
        <Button
          variant={tab == "creations" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setTab("creations")}
        >
          Creations
        </Button>
        <Button
          variant={tab == "users" ? "contained" : "outlined"}
          fullWidth
          onClick={() => setTab("users")}
        >
          Users
        </Button>
      </Stack>
      <Box sx={{ width: "100%", paddingBottom: "200px" }}>
        <Masonry
          style={{ overflow: "unset" }}
          columns={{ xs: 1, sm: 2 }}
          spacing={{ xs: 4, sm: 5 }}
        >
          {heights.map((item, index) => (
            <MasonryItem key={index} component={Paper}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://next.material-ui.com/static/images/cards/contemplative-reptile.jpg"
                  alt="green iguana"
                />
                <CardContent sx={{ p: 2 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    19/09/2021
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.desc}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{
                    justifyContent: "space-between",
                    paddingLeft: 15,
                    paddingBottom: "20px",
                  }}
                >
                  <Stack direction="row">
                    <Button size="small" variant="contained">
                      View
                    </Button>
                  </Stack>
                  <Stack direction="row">
                    <Chip label="Category" />
                  </Stack>
                </CardActions>
              </Card>
            </MasonryItem>
          ))}
        </Masonry>
      </Box>
    </Container>
  );
}
