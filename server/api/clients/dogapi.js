import axios from 'axios';

export const ax = axios.create({
    baseURL: "https://api.thedogapi.com/v1",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": "ab9feeeb-3c59-4c34-90e5-526dafbe5296",
    },
});

// Get Info of all breeds
export function getAllDogs() {
    return ax.get("/breeds");
}

// Get detailed breed info by breed name
export function getDogByName(categoryName) {
    return ax.get(`/breeds/search?q=${categoryName}`);
}

// Get certain amount of images by breedId
export function getDogImages(breedId, numOfImages, size) {
    return ax.get(
        `/images/search?limit=${numOfImages}&size=${size}&breed_id=${breedId}`
    );
}

