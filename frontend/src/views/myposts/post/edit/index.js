import React, { useState } from "react";
import API from '../../../../services/api';

const EditPost = ({ currentPost, setPostsChange }) => {
  const [inputs, setInputs] = useState({
    header: currentPost.header,
    subheader: currentPost.subheader,
    post: currentPost.post,
    category: currentPost.category,
  });

  const { header, subheader, post, category } = inputs;

  const editPost = async (id) => {
    try {
      await API.posts.put(id, JSON.stringify({ header, subheader, post, category }));
      setPostsChange(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  return (
    <>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${currentPost.post_id}`}
      >
        Edit
      </button>
      <div
        className="modal"
        id={`id${currentPost.post_id}`}
        onClick={() =>
          setInputs({
            header: currentPost.header,
            subheader: currentPost.subheader,
            post: currentPost.post,
            category: currentPost.category,
          })
        }
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Post</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() =>
                  setInputs({
                    header: currentPost.header,
                    subheader: currentPost.subheader,
                    post: currentPost.post,
                    category: currentPost.category,
                  })
                }
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <input
                type="header"
                name="header"
                value={header}
                placeholder="Header"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="subheader"
                name="subheader"
                value={subheader}
                placeholder="Subheader"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <textarea
                type="post"
                name="post"
                rows="25"
                value={post}
                placeholder="Post"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
              <input
                type="category"
                name="category"
                value={category}
                placeholder="Category"
                required={true}
                onChange={(e) => onChange(e)}
                className="form-control my-3"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editPost(currentPost.post_id)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={() =>
                  setInputs({
                    header: post.header,
                    subheader: post.subheader,
                    post: post.post,
                    category: post.category,
                  })
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
