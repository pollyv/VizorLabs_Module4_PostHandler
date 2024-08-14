import React from "react";
import PostItem from "../PostItem/PostItem";

import "./PostList.css";

function PostList({ posts, updatePost, deletePost }) {
  return (
    <div className="posts-container">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          updatePost={updatePost}
          deletePost={deletePost}
        />
      ))}
    </div>
  );
}

export default PostList;
