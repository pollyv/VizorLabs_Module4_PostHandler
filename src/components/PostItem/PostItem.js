import React, { useState } from "react";

import InputField from "../InputField/InputField";
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
                    <InputField
                        id={`title-${post.id}`}
                        label="Title:"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <InputField
                        id={`body-${post.id}`}
                        label="Body:"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        textarea
                    />
                    <div className="form__actions">
                        <Button variant="primary" size="medium" onClick={handleSave}>
                            Save
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <span className="post__title">{post.title}</span>
                    <span className="post__body">{post.body}</span>
                    <div className="form__actions">
                        <Button variant="secondary" size="medium" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                        <Button variant="danger" size="medium" onClick={() => deletePost(post.id)}>
                            Delete
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default PostItem;
