import axios from "axios";

export const ax = axios.create({
    baseURL: "http://159.203.17.226:83/api",
    // baseURL: "http://localhost:3005/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export function getAllBreeds() {
    return ax.get("/breeds");
}

export function getBreedByName(categoryName) {
    return ax.get(`/breeds/search?q=${categoryName}`);
}

export function getBreedImages(breedId, numOfImages, picSize) {
    let limit = numOfImages ? numOfImages : 6;
    let size = picSize ? picSize : "full";

    return ax.get(
        `/breeds/images?limit=${limit}&size=${size}&breed_id=${breedId}`
    );
}

export const cacheServer = axios.create({
    baseURL: "http://159.203.17.226:83/api",
    // baseURL: "http://localhost:3005/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export function getRecentSearch() {
    return cacheServer.get("/recent_search");
}

export function postSearch(searchTerm) {
    return cacheServer.post("/recent_search/", {search: searchTerm});
}

export const authServer = axios.create({
    // baseURL: "http://159.203.17.226:83/api",
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export function login(useremail, userpassword) {
    return authServer.post("/token/login", {email: useremail, password: userpassword});
}

export function signup(username, useremail, userpassword) {
    return authServer.post("/users", {username, email: useremail, password: userpassword});
}

export function me() {
    return authServer.get("/users/me");
}

