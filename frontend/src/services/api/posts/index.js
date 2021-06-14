import { baseUrl } from "../../../consts";

const type = "posts";

export default {
  get: () =>
    fetch(`${baseUrl}/${type}/`, {
      method: "GET",
      headers: { jwt_token: localStorage.token },
    }),
  post: (body) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("jwt_token", localStorage.token);

    fetch("${baseUrl}/${type}/posts/", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
  },
  getMyPosts: () =>
    fetch(`${baseUrl}/${type}/myposts`, {
      method: "GET",
      headers: { jwt_token: localStorage.token },
    }),
  put: (id, body) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("jwt_token", localStorage.token);

    fetch(`${baseUrl}/${type}/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  },
  delete: (id) =>
    fetch(`${baseUrl}/${type}/${id}`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token },
    }),
};
