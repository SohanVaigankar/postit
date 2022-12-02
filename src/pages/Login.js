import React from "react";
import { Box, Backdrop, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
// firebase
import { auth, googleAuthProvider } from "../config/firebaseConfig";
import { signInWithPopup } from "firebase/auth";
// context
import { useAuthContext } from "../context/AuthContext";
import { Google } from "@mui/icons-material";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, googleAuthProvider);
      await setUser(res.user);
      window.sessionStorage.setItem("user", JSON.stringify(res.user));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={true}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box
        zIndex="2000"
        sx={{ width: 300 }}
      >
        <Box
          onClick={handleLogin}
          display="flex"
          alignItems={"center"}
          justifyContent="center"
          gap="1rem"
          sx={{ padding: "1rem", cursor: "pointer", backgroundColor:"#CAF0F8", borderRadius:2 }}
        >
          <Google /> <p>sign in with google</p>
        </Box>
      </Box>
    </Modal>
  );
};

export default Login;
