import { baseUrl } from '../../../consts';

const type = "profiles";

export default {
    get: () => fetch(`${baseUrl}/${type}/`, {
        method: "GET",
    }),
    getProfile: (id) => fetch(`${baseUrl}/${type}/profile/${id}`, {
        method: "GET",
    }),
}
