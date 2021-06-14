const url = "http://localhost:5000/authentication";

export default {
  register: (body) =>
    fetch(`${url}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  login: (body) =>
    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  delete: () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("jwt_token", localStorage.token);

    fetch(`${url}`, {
      method: "DELETE",
      headers: headers,
    });
  },
  verify: () => {
    fetch(`${url}/verify`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token },
    });
  },
};
