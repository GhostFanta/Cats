import axios from "axios";

export const ax = axios.create({
  baseURL: "http://159.203.17.226:83/api",
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
