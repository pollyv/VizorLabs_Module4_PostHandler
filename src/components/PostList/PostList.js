import React from "react";
import PostItem from "../PostItem/PostItem";

import "./PostList.css";

function PostList({ posts, updatePost, deletePost }) {
  return (
      <div className="posts-container">
        {posts.map((post) => (
            <PostItem
                key={post.uuid} // тут теперь уникальный ключ от uuid для каждого поста
                post={post}
                updatePost={updatePost}
                deletePost={deletePost}
            />
        ))}
      </div>
  );
}

export default PostList;

