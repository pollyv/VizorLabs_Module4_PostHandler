import { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import {
    fetchPostsFromAPI,
    addPostToAPI,
    updatePostInAPI,
    deletePostFromAPI,
    API_URL,
} from '../api/api';

const POSTS_PAGE_SIZE = 10;

export const usePosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        loadPosts(currentPage);
    }, [currentPage]);

    const loadPosts = useCallback(async (page) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchPostsFromAPI(page, POSTS_PAGE_SIZE);
            const postsWithUUID = data.map((post) => ({
                ...post,
                uuid: uuidv4(),
            }));
            setPosts((prevPosts) => {
                const existingIds = new Set(prevPosts.map(post => post.id));
                const filteredPosts = postsWithUUID.filter(post => !existingIds.has(post.id));
                return [...prevPosts, ...filteredPosts];
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    const addPost = async (newPost) => {
        setError(null);
        try {
            const data = await addPostToAPI(newPost);
            const newPostWithId = {
                ...data,
                id: uuidv4(), // Генерируем уникальный id на клиенте
                uuid: uuidv4(),
            };
            setPosts(prevPosts => [newPostWithId, ...prevPosts]);
        } catch (error) {
            setError(error.message);
        }
    };

    const updatePost = async (postId, updatedPost) => {
        setError(null);
        try {
            const updatedData = await updatePostInAPI(postId, updatedPost);
            setPosts(prevPosts =>
                prevPosts.map(post =>
                    post.id === postId ? { ...post, ...updatedData } : post
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const deletePost = async (postId) => {
        setError(null);
        try {
            await deletePostFromAPI(postId);
            setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } catch (error) {
            setError(error.message);
        }
    };

    const loadMorePosts = () => {
        setCurrentPage(prevPage => prevPage + 1);
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
