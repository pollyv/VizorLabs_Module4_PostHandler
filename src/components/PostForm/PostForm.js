import React, { useState } from "react";

import "./PostForm.css";

function PostForm({ addPost }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Please, write the title of your post";
    }

    if (!body.trim()) {
      newErrors.body = "Please, write the text of your post";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      addPost({ title, body, userId: 1 });
      setTitle("");
      setBody("");
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__field">
          <label className="form__label" htmlFor="title">
            Title:
          </label>
          <input
              className={`input ${errors.title ? "input--error" : ""}`}
              type="text"
              name="title"
              id="title"
              placeholder="Enter a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className="error-message">{errors.title}</div>}
        </div>
        <div className="form__field">
          <label className="form__label" htmlFor="body">
            Your post:
          </label>
          <textarea
              className={`input input--textarea ${errors.body ? "input--error" : ""}`}
              name="body"
              id="body"
              placeholder="Enter a text..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
          ></textarea>
          {errors.body && <div className="error-message">{errors.body}</div>}
        </div>
        <button className="btn btn--submit" type="submit">
          Add Post
        </button>
      </form>
  );
}

export default PostForm;
