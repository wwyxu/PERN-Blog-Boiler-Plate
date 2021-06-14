import React, { useEffect, useState } from "react";

import ListPosts from "./ListPosts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [postsChange, setPostsChange] = useState(false);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/posts/", {
        method: "GET",
      });

      const parseData = await res.json();

      console.log(parseData);

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
        <ListPosts posts={posts} />
      </div>
    </div>
  );
};

export default Posts;
