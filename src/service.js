import axios from "axios";

export const ax = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "152c9ff9-228c-43b9-9c70-d35256c5409e",
  },
});

export function getAllBreeds() {
  return ax.get("/breeds");
}

export function getBreedByName(categoryName) {
  return ax.get(`/breeds/search?q=${categoryName}`);
}

export function getBreedImages(breedId, numOfImages, size) {
  return ax.get(
    `/images/search?limit=${numOfImages}&size=${size}&breed_id=${breedId}`
  );
}

export function getCategories(categoryName) {
  try {
    return ax.get(`/breeds/search?q=${categoryName}`);
  } catch (e) {
    return e;
  }
}
