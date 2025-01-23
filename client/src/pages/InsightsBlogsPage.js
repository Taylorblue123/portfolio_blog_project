import React, { useEffect, useState } from "react";
import Post from "../Post";

export default function InsightsBlogsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://host-5kkf.onrender.com/posts", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      {posts.length > 0 && posts.map((post) => (
        <Post {...post} />
      ))}
    </>
  );
}