import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { shrinkPost } from "../../utils/post";

const ListPosts = ({ posts }) => {
  const [allPosts, setAllPosts] = useState([]); //empty array

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
                <Link to={`/profiles/${post.user_id}`}>
                  <td>{post.user_name}</td>
                </Link>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListPosts;