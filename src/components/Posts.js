import React from "react";
import { usePostContext } from "../context/PostContext";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditModal from "./EditModal";

const Posts = ({ info, user }) => {
  const { post, setPost } = usePostContext();

  const deletePost = (id) => {
    if (user) {
      let filteredPosts = post.filter((eachPost) => eachPost.id !== id);
      setPost(filteredPosts);
    }
  };

  return (
    <Paper elevation={1}>
      <Box
        padding="1rem 2rem"
        display="flex"
        alignItems="center"
        flexDirection="column"
        backgroundColor={"#90e0ef"}
      >
        <Box color="#03045E" padding="1rem 0">
          <Typography variant="h5">{info.title}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">{info.body}</Typography>
        </Box>
        {user && (
          <Box
            marginTop="2rem"
            display="flex"
            justifyContent={"space-around"}
            width={"100%"}
          >
            <EditModal info={info} />
            <Button
              color="error"
              onClick={() => {
                deletePost(info.id);
              }}
            >
              <Delete />
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default Posts;
