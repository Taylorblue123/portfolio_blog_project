import React, { useState } from "react";
import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
    return (
          <ReactQuill 
            className="apple-quill" 
            modules={{ toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ]}}
            value={value}  
            onChange= {onChange} />
    );
}