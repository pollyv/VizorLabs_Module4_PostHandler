import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const POSTS_PAGE_SIZE = 10;

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    const fetchPosts = async (page) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}?_page=${page}&_limit=${POSTS_PAGE_SIZE}`);
            const data = await response.json();
            if (response.ok) {
                const postsWithUUID = data.map((post) => ({
                    ...post,
                    uuid: uuidv4(),
                }));
                setPosts((prevPosts) => [...prevPosts, ...postsWithUUID]);
            } else {
                throw new Error("Failed to load posts");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addPost = async (newPost) => {
        setError(null);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (response.ok) {
                const data = await response.json();
                const newPostWithId = { ...data, id: Date.now(), uuid: uuidv4() };
                setPosts((prevPosts) => [newPostWithId, ...prevPosts]);
            } else {
                throw new Error("Error adding post");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const updatePost = async (postId, updatedPost) => {
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedPost),
            });

            if (response.ok) {
                setPosts((prevPosts) =>
                    prevPosts.map((post) =>
                        post.id === postId ? { ...post, ...updatedPost } : post
                    )
                );
            } else {
                throw new Error("Error updating post");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const deletePost = async (postId) => {
        setError(null);
        try {
            const response = await fetch(`${API_URL}/${postId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
            } else {
                throw new Error("Failed to delete post");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const loadMorePosts = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return {
        posts,
        loading,
        error,
        addPost,
        updatePost,
        deletePost,
        loadMorePosts,
    };
};
