import React, { createContext, useContext, useState } from "react";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [post, setPost] = useState();
  return (
    <PostContext.Provider value={{ post, setPost }}>{children}</PostContext.Provider>
  );
};

export const usePostContext = () => {
  return useContext(PostContext);
};
