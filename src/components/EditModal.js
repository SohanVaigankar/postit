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
import { usePostContext } from "../context/PostContext";

const EditModal = ({ info }) => {
  const [open, setOpen] = useState(false);
  const { post, setPost } = usePostContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      ...info,
      title: e.target.title.value,
      body: e.target.description.value,
    };

    const filteredPosts = post.filter((eachPost) => eachPost.id !== info.id);
    await setPost([...filteredPosts, data]);
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
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
        onClose={() => setOpen(false)}
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
                <Typography style={{ textAlign: "center" }}>Edit </Typography>
                <Box
                  sx={{ width: "100%" }}
                  display="flex"
                  flexDirection="column"
                >
                  <InputLabel>Title</InputLabel>
                  <Input
                    size="small"
                    name="title"
                    defaultValue={info.title}
                    required
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <InputLabel>Description</InputLabel>
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
                  style={{
                    color: "#03045E",
                    borderColor: "#03045E",
                    width: "50%",
                  }}
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
