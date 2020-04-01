import axios from "axios";

const ax = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "152c9ff9-228c-43b9-9c70-d35256c5409e"
  }
});

export default {
  async getAllBreeds() {
    try {
      return await ax.get("/breeds");
    } catch (e) {
      return e;
    }
  },

  async getBreedByName(name) {
    try{
      return await ax.get(`/breeds/search/${name}`)
    } catch (e) {
      return e;
    }
  },

  async getCategories(categoryName) {
    try{
      return await ax.get(`/breeds/search/${categoryName}`)
    } catch (e) {
      return e;
    }
  }
};
