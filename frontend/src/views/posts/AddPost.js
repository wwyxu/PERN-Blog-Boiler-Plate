import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddPost = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    header: "",
    subheader: "",
    post: "",
    category: "",
  });

  const { header, subheader, post, category } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { header, subheader, post, category };

      const response = await fetch("http://localhost:5000/posts/", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes === "success") {
        setInputs({
          header: "",
          subheader: "",
          post: "",
          category: "",
        });
        toast.success("Post created successfully");
      } else {
        toast.error("Something went wrong, please try again later");
        setAuth(false);
      }
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
          class="form-control my-3"
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
