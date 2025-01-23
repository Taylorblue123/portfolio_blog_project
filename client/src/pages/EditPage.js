import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Editor from "../Editor";
import { Navigate } from "react-router-dom";
import { set } from "mongoose";

export default function PostPage() {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  //Fetch orginal text from database
  useEffect(() => {
    async function fetchData() {
        try {
            const response = await fetch(`https://host-5kkf.onrender.com/post/${id}`);
            const data = await response.json();

            setTitle(data.title);
            setSummary(data.summary);
            setContent(data.content);
            if(data.cover) {
                setCover(data.cover);
            }

        } catch (err) {
            console.error(err);
        }
    }
    fetchData();
}, [id]);
  
  async function updatePost(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.set("title", title);
    formData.set("summary", summary);
    formData.set("content", content);
    formData.set("cover", cover);
    formData.set("id", id);


    const response = await fetch(`https://host-5kkf.onrender.com/post/`, {
      method: "PUT",
      credentials: "include",
      body: formData,
    });

    if (response.status === 200) {
      alert("Post Updated");
      setRedirect(true);
    } else {
      alert("Update Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="apple-post-container">
      <h1>Update Post</h1>
      <div className="create">
        <form className="apple-post-form" onSubmit={updatePost}>
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
        <Editor value={content} onChange={setContent} />
          <button className="apple-post-button" type="submit">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
