import { baseUrl } from '../../../consts';

const type = "authentication";

export default {
  register: (body) =>
    fetch(`${baseUrl}/${type}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  login: (body) =>
    fetch(`${baseUrl}/${type}/login`, {
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

    fetch(`${baseUrl}/${type}/`, {
      method: "DELETE",
      headers: headers,
    });
  },
  verify: () => {
    fetch(`${baseUrl}/${type}/verify`, {
      method: "DELETE",
      headers: { jwt_token: localStorage.token },
    });
  },
};
