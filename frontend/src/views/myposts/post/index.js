import React, { useState, useEffect } from "react";
import EditPost from "./edit";
import { shrinkPost } from "../../../utils/post";
import API from '../../../services/api';

const ListMyPosts = ({ posts, setPostsChange }) => {
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  const deletePost = async (id) => {
    try {
      await API.posts.delete(id);
      setAllPosts(posts.filter((posts) => posts.post_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Header</th>
            <th>Subheader</th>
            <th>Category</th>
            <th>Post</th>
            <th>Date</th>
            <th>Last Updated</th>
            <th>User</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {allPosts.length &&
            allPosts.map((post) => (
              <tr key={post.post_id}>
                <td>{post.header}</td>
                <td>{post.subheader}</td>
                <td>{post.category}</td>
                <td>{shrinkPost(post.post)}</td>
                <td>{post.date}</td>
                <td>{post.date_updated}</td>
                <td>{post.user_name}</td>
                <td>
                  <EditPost
                    currentPost={post}
                    setPostsChange={setPostsChange}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deletePost(post.post_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListMyPosts;
