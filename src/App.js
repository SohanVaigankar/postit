import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";

// routes
import PrivateRoute from "./routes/PrivateRoute";

// context
import { usePostContext } from "./context/PostContext";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const { setUser } = useAuthContext();
  const { setPost } = usePostContext();

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem("user")));
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setPost(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [setUser, setPost]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NewPost />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
