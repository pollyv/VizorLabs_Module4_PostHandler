import React from "react";

import PostForm from "../PostForm/PostForm";
import PostList from "../PostList/PostList";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import { usePosts } from "../../hooks/usePosts";

import "./MainContent.css";

function MainContent() {
    const { posts, loading, error, addPost, updatePost, deletePost, loadMorePosts } = usePosts();

    return (
        <main className="main-content">
            <PostForm addPost={addPost} />
            {/* Когда посты подгружаются, лоадер виден*/}
            {loading && <Loader />}
            {error && <div className="error-message">{error}</div>}
            <PostList
                posts={posts}
                updatePost={updatePost}
                deletePost={deletePost}
            />
            {/* Кнопка отображается, только если нет загрузки и есть посты */}
            {!loading && posts.length > 0 && (
                <div className="load-more-container">
                    <Button variant="primary" size="large" onClick={loadMorePosts}>
                        Load more
                    </Button>
                </div>
            )}
        </main>
    );
}

export default MainContent;

