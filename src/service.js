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

export const cacheServer = axios.create({
  baseURL: "http://159.203.17.226:83/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export function getRecentSearch() {
  return cacheServer.get("/recent_search");
}

export function postSearch(searchTerm) {
  return cacheServer.post("/recent_search/", { search: searchTerm });
}
