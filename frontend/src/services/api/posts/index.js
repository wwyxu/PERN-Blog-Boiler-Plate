const url = "http://localhost:5000/posts";

export default {
  get: () =>
    fetch(`${url}/`, {
      method: "GET",
      headers: { jwt_token: localStorage.token },
    }),
  post: (body) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("jwt_token", localStorage.token);

    fetch("http://localhost:5000/posts/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  },
  getMyPosts: () =>
    fetch(`${url}/myposts`, {
      method: "GET",
      headers: { jwt_token: localStorage.token },
    }),
  put: (id, body) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("jwt_token", localStorage.token);

    fetch(`${url}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  },
  delete: (id) =>
    fetch(`${url}/${id}`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token },
    }),
};
