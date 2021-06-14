import React, { Fragment, useState, useEffect } from "react";
import EditPost from "./EditPost";
import { shrinkPost } from "../../utils/post";

const ListMyPosts = ({ posts, setPostsChange }) => {
  const [allPosts, setAllPosts] = useState([]);

  async function deletePost(id) {
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setAllPosts(posts.filter((posts) => posts.post_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  return (
    <Fragment>
      {" "}
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
          {allPosts.length !== 0 &&
            allPosts[0].todo_id !== null &&
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
    </Fragment>
  );
};

export default ListMyPosts;
