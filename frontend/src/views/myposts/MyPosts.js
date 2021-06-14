import React, { useEffect, useState } from "react";

import ListMyPosts from "./ListMyPosts";

const MyPosts = ({ setAuth }) => {
  const [posts, setPosts] = useState([]);
  const [postsChange, setPostsChange] = useState(false);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:5000/posts/myposts", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();

      console.log(parseData);

      setPosts(parseData);
    } catch (err) {
      setAuth(false);
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
        <h2 className="text-center mb-3">My Posts</h2>
        <ListMyPosts posts={posts} setPostsChange={setPostsChange} />
      </div>
    </div>
  );
};

export default MyPosts;
