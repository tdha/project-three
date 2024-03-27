import sendRequest from "./send-request"; // 'send request' to communicate with backend
const BASE_URL = "/api/favorites";

export async function favorites (favorite) {
console.log('f-api triggered', favorite);
return sendRequest(BASE_URL, 'POST', favorite);
}

export async function getFavorites() {
    console.logt('gf f-api');
    return sendRequest(BASE_URL, 'GET', )
}