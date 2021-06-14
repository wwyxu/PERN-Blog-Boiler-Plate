import React, { useEffect, useState } from "react";
import API from '../../services/api';
import Post from "./post";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postsChange, setPostsChange] = useState(false);

  const getPosts = async () => {
    try {
      const res = await API.posts.get();
      const parseData = await res.json();
      setPosts(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPosts();
    setPostsChange(false);
  }, [postsChange]);

  return (
    <div>
      <div className="mt-5">
        <h2 className="text-center mb-3">Latest Feed</h2>
        <Post posts={posts} />
      </div>
    </div>
  );
};

export default Posts;
