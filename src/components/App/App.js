import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import PostForm from "../PostForm/PostForm";
import PostList from "../PostList/PostList";
import Loader from "../Loader/Loader";

import "./App.css";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const fetchPosts = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?_page=${page}&_limit=10`);
      const data = await response.json();
      if (data.length > 0) {
        const postsWithUUID = data.map((post) => ({
          ...post,
          uuid: uuidv4(),
        }));
        setPosts((prevPosts) => [...prevPosts, ...postsWithUUID]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (newPost) => {
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
        console.error("Error adding post");
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePost = (postId, updatedPost) => {
    setPosts((prevPosts) =>
        prevPosts.map((post) =>
            post.id === postId ? { ...post, ...updatedPost } : post
        )
    );
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
      <div className="App">
        <Header />
        <main className="main">
          <PostForm addPost={addPost} />
          {loading && <Loader />}
          <PostList
              posts={posts.slice(0, 10 * currentPage)}
              updatePost={updatePost}
              deletePost={deletePost}
          />
          <button className="btn btn--load-more" onClick={handleLoadMore}>
            Load more
          </button>
        </main>
        <Footer />
      </div>
  );
}

export default App;
