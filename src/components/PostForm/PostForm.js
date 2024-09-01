import React, { useState } from "react";

import InputField from "../InputField/InputField";
import Button from "../Button/Button";

import "./PostForm.css";

function PostForm({ addPost }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!title.trim()) newErrors.title = "Please, write the title of your post";
        if (!body.trim()) newErrors.body = "Please, write the text of your post";
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
            <InputField
                id="title"
                label="Title:"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={errors.title}
            />
            <InputField
                id="body"
                label="Your post:"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                error={errors.body}
                textarea
            />
            <div className="form__actions">
                <Button type="submit" variant="primary" size="medium">
                    Add Post
                </Button>
            </div>
        </form>
    );
}

export default PostForm;

