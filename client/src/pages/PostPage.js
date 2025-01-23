import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";

export default function PostPage() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  if (redirect) {
    return <Navigate to="/" />;
  }

  async function createPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("cover", cover); // 使用 append 而不是 set

    const response = await fetch("https://host-5kkf.onrender.com/posts", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (response.status === 200) {
      alert("Post Created");
      setRedirect(true);
    } else {
      alert("Post Failed");
    }
  }

  return (
    <div className="apple-post-container">
      <h1>Create Post</h1>
      <div className="create">
        <form className="apple-post-form" onSubmit={createPost}>
          <input
            className="apple-post-input"
            type="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="apple-post-input"
            type="summary"
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            className="apple-post-input-file"
            type="file"
            onChange={(e) => setCover(e.target.files[0])} // 只选择第一个文件
          />
          <Editor value={content} onChange={(e) => setContent(e)} />
          <button className="apple-post-button" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}