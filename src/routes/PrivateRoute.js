import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { user } = useAuthContext();

  return user !== null || user !== undefined ? (
     children 
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
