import React from "react";

import PostForm from "../PostForm/PostForm";
import PostList from "../PostList/PostList";
import Loader from "../Loader/Loader";
import { usePosts } from "../../hooks/usePosts";

import "./MainContent.css";

function MainContent() {
    const { posts, loading, error, addPost, updatePost, deletePost, loadMorePosts } = usePosts();

    return (
        <main className="main">
            <PostForm addPost={addPost} />
            {loading && <Loader />}
            {error && <div className="error-message">{error}</div>}
            <PostList
                posts={posts}
                updatePost={updatePost}
                deletePost={deletePost}
            />
            <button className="btn btn--load-more" onClick={loadMorePosts}>
                Load more
            </button>
        </main>
    );
}

export default MainContent;

