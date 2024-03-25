// Facilitates interaction btw frontend and backend
// Main services: signing up, log in/out, check authentication status

import * as usersAPI from './users-api';

// Sends data to the server via the API function and gets back a token which is stores in localStorage
export async function signUp(userData) {
    const token = await usersAPI.signUp(userData);
    localStorage.setItem('token', token);
    return getUser();
}

export async function login(credentials) {
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
}

export function getToken() { // retrieve current user's token from localStorage and checks validity
    const token = localStorage.getItem('token'); 
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return null;
    }
    return token;
}

export function getUser() {
    const token = getToken(); 
    return token ? JSON.parse(atob(token.split('.')[1])).user : null; // decodes JWT to extract and return user information
}

export function logOut() {
    localStorage.removeItem('token');
}

export function checkToken () {
    return usersAPI.checkToken().then((dateStr) => new Date(dateStr)); // sends request to backend to validate current token's expiry date
}