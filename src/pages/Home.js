import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
// context
import { usePostContext } from "../context/PostContext";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { post } = usePostContext();
  const { user } = useAuthContext();
  return (
    <>
      <Navbar />
        {user && (
          <Typography
            padding="1rem 0rem 0rem 0rem"
            textAlign="center"
            fontSize={"1.7rem"}
          >{`Hello, ${user?.displayName}!`}</Typography>
        )}
      <Box padding="3rem 1rem" height="100vh"  marginBottom="2rem">
        <Container >
          <Grid container spacing={3}>
            {post &&
              post.map((item) => {
                return (
                  <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                    <Posts info={item} user={user} />
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
