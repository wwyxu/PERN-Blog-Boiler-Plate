import React, { useEffect, useState } from "react";
import Post from "./post";
import API from '../../services/api';

const MyPosts = ({ setAuth }) => {
  const [posts, setPosts] = useState([]);
  const [postsChange, setPostsChange] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await API.posts.getMyPosts();
        const parseData = await res.json();
        setPosts(parseData);
      } catch (err) {
        setAuth(false);
        console.error(err.message);
      }
    };

    getPosts();
    setPostsChange(false);
  }, [postsChange]);

  return (
    <div>
      <div className="mt-5">
        <h2 className="text-center mb-3">My Posts</h2>
        <Post posts={posts} setPostsChange={setPostsChange} />
      </div>
    </div>
  );
};

export default MyPosts;
