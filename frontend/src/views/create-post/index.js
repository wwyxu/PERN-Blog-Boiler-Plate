import React, { useState } from "react";
import API from '../../services/api';

const AddPost = ({ setAuth }) => {
  const defaultState = {
    header: "",
    subheader: "",
    post: "",
    category: "",
  };

  const [inputs, setInputs] = useState(defaultState);

  const { header, subheader, post, category } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await API.posts.post({
        header,
        subheader,
        post,
        category,
      });
      const parseRes = await res.json();
      parseRes ? setInputs(defaultState) : setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Create a new post</h1>
      <form onSubmit={onSubmitForm}>
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
          value={post}
          placeholder="Post"
          required={true}
          rows="20"
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
        <button className="btn btn-success btn-block">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
