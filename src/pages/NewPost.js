import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Backdrop,
  Fade,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// context
import { usePostContext } from "../context/PostContext";

const NewPost = () => {
  const navigate = useNavigate();
  const { post, setPost } = usePostContext();
  const [open, setOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      body: e.target.description.value,
      id: String(post.length + 69),
    };
    await setPost([...post, data]);
    navigate("/");
  };

  const handleModalClose = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <Navbar />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box zIndex="2000">
            <form onSubmit={handleSubmit}>
              <Box
                border=".5px solid #03045E"
                borderRadius={2}
                padding="3rem 2rem"
                gap="2rem"
                display="flex"
                flexDirection="column"
                alignItems="center"
                backgroundColor="#90E0EF"
              >
                <Typography style={{ fontSize: "1.5rem", textAlign: "center" }}>
                  New Post
                </Typography>
                <TextField name="title" label="title" size="small" required />
                <TextField
                  name="description"
                  label="description"
                  size="medium"
                  multiline
                  rows={5}
                  required
                  style={{ width: "100%" }}
                />
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                  gap="1rem"
                  justifyContent="space-around"
                  style={{ width: "100%" }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={handleModalClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="outlined" size="small">
                    Create
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default NewPost;
