import {  Button, Toolbar, Typography, Container } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig";
import { useAuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();

  const handleLogout = async (e) => {
    e.preventDefault();
    signOut(auth);
    sessionStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav
      position="static"
      style={{ backgroundColor: "#caf0f8", boxShadow: "none" }}
    >
      <Container >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1 }}
            color="black"
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          >
            post it
          </Typography>
          {user === null || user === undefined ? (
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </Button>
          ) : (
            <div>
              <Button
                style={{ textTransform: "lowercase", fontSize: "1.1rem" }}
                onClick={() => {
                  navigate("/new");
                }}
              >
                New Post
              </Button>
              <Button
                style={{ textTransform: "lowercase", fontSize: "1.1rem" }}
                onClick={handleLogout}
                color="error"
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>
    </nav>
  );
}

export default Navbar;
