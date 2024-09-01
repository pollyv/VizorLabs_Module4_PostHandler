import React, { useState } from "react";

import Button from "../Button/Button";

import "./PostItem.css";

function PostItem({ post, updatePost, deletePost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSave = () => {
    if (title.trim() && body.trim()) {
      updatePost(post.id, { title, body });
      setIsEditing(false);
    }
  };

  return (
      <div className="post" data-id={post.id}>
        {isEditing ? (
            <>
              <input
                  className="post__input-title input"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                  className="post__input-body input"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
              ></textarea>
              <Button variant="primary" size="medium" onClick={handleSave}>
                Save
              </Button>
            </>
        ) : (
            <>
              <span className="post__title">{post.title}</span>
              <span className="post__body">{post.body}</span>
              <Button variant="secondary" size="medium" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </>
        )}
        <Button variant="danger" size="medium" onClick={() => deletePost(post.id)}>
          Delete
        </Button>
      </div>
  );
}

export default PostItem;
