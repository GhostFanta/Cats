import axios from 'axios';

export const ax = axios.create({
    baseURL: "https://api.thecatapi.com/v1",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "152c9ff9-228c-43b9-9c70-d35256c5409e",
    },
});

// Get Info of all breeds
export function getAllCats() {
    return ax.get("/breeds");
}

// Get detailed breed info by breed name
export function getCatByName(categoryName) {
    return ax.get(`/breeds/search?q=${categoryName}`);
}

// Get certain amount of images by breedId
export function getCatImages(breedId, numOfImages, size) {
    return ax.get(
        `/images/search?limit=${numOfImages}&size=${size}&breed_id=${breedId}`
    );
}
