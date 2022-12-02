import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Modal,
  Typography,
  InputLabel,
  Input,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import axios from "axios";
import { usePostContext } from "../context/PostContext";

const EditModal = ({ info }) => {
  const [open, setOpen] = useState(false);
  const { post, setPost } = usePostContext();

  const handleEditOpen = () => {
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    let data = {
      ...info,
      title: event.target.title.value,
      body: event.target.description.value,
    };
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${info.id}`, data)
      .then((res) => {
        let arr = post.map((item) => {
          if (item.id === res.data.id) {
            return res.data;
          } else {
            return item;
          }
        });
        setPost(arr);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={handleEditOpen}>
        <Edit />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={open}
        onClose={handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box zIndex="2000" sx={{ width: 350 }}>
            <form onSubmit={handleSubmit}>
              <Box
                display="flex"
                flexDirection="column"
                backgroundColor="#90E0EF"
                alignItems="center"
                boxShadow="3px 2px 1px gray"
                padding="2.5rem"
                gap="2rem"
                borderRadius={2}
                sx={{ width: "100%" }}
              >
                <Typography textAlign="center">Edit </Typography>
                <Box
                  sx={{ width: "100%" }}
                  display="flex"
                  flexDirection="column"
                >
                  <InputLabel textAlign="start">Title</InputLabel>
                  <Input
                    size="small"
                    name="title"
                    defaultValue={info.title}
                    required
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <InputLabel textAlign="start">Description</InputLabel>
                  <Input
                    size="medium"
                    name="description"
                    defaultValue={info.body}
                    multiline
                    rows={5}
                    required
                    style={{ width: "100%" }}
                  />
                </Box>
                <Button
                  type="submit"
                  variant="outlined"
                  style={{ color: "#03045E", borderColor:"#03045E", width: "50%" }}
                >
                  save
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default EditModal;
