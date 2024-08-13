import React, {useState} from 'react';

import './PostForm.css';

function PostForm({ addPost }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && body) {
            addPost({ title, body, userId: 1 });
            setTitle('');
            setBody('');
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="form__field">
                <label className="form__label" htmlFor="title">Title:</label>
                <input
                    className="input"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form__field">
                <label className="form__label" htmlFor="body">Your post:</label>
                <textarea
                    className="input input--textarea"
                    name="body"
                    id="body"
                    placeholder="Enter a text..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    required
                ></textarea>
            </div>
            <button className="btn btn--submit" type="submit">Add Post</button>
        </form>
    );
}

export default PostForm;
