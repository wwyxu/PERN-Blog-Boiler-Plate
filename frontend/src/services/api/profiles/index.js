

const url = "http://localhost:5000/profiles";

export default {
    get: () => fetch(`${url}/`, {
        method: "GET",
    }),
    getProfile: (id) => fetch(`${url}/profile/${id}`, {
        method: "GET",
    }),
}
