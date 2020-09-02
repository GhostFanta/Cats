import {
  getAllBreeds,
  getBreedByName,
  getBreedImages,
  getRecentSearch,
  postSearch,
} from "../../service";

// action
// Breeds name on the side panel
export function getBreeds() {
  return (dispatch) => {
    getAllBreeds()
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }
        const breeds = res.data.map((item) => item["name"]);
        dispatch(setBreeds(breeds));
      })
      .catch((e) => {});
  };
}

// Feed briefInfoCards with search result.
export function getBreedsBySearch(searchTerm) {
  return (dispatch) => {
    getBreedByName(searchTerm)
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }
        const briefInfoList = res.data.map((item) => {
          return {
            name: item["name"],
            origin: item["origin"],
            temperament: item["temperament"],
            description: item["description"],
          };
        });

        dispatch(setBriefList(briefInfoList));
      })
      .catch((e) => {});
    postSearch(searchTerm).catch((e) => {});
  };
}

export function getBriefInfoList() {
  return (dispatch) => {
    getAllBreeds()
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }
        const briefInfoList = res.data.map((item) => {
          return {
            name: item["name"],
            origin: item["origin"],
            temperament: item["temperament"],
            description: item["description"],
          };
        });

        let selector = new Set();
        while (selector.size < 9) {
          selector.add(
            Math.floor(Math.random() * Math.floor(briefInfoList.length))
          );
        }

        let feed = [];
        for (let item of selector) {
          feed.push(briefInfoList[item]);
        }
        dispatch(setBriefList(feed));
      })
      .catch((e) => {});
  };
}

export function getTableInfo() {
  return (dispatch) => {
    getAllBreeds()
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }

        const tableDataList = res.data.map((item) => {
          return {
            id: item.id,
            name: item["name"],
            origin: item["origin"],
            life_span: item["life_span"],
            weight: item.weight.imperial,
            temperament: item.temperament,
          };
        });

        dispatch(setTableData(tableDataList));
      })
      .catch((e) => {});
  };
}

export function getRecentSearches() {
  return (dispatch) => {
    getRecentSearch()
      .then((res) => {
        const data = res.data.recentSearches.map((item) => item["search"]);
        dispatch(setRecentSearch(data));
      })
      .catch((e) => {});
  };
}

export function getBreedDetail(breedName) {
  return (dispatch) => {
    getBreedByName(breedName)
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }
        const currentBreed = res.data && res.data[0];
        dispatch(setCurrentBreed(currentBreed));
        return currentBreed;
      })
      .then((res) => {
        getBreedImages(res.id).then((res) => {
          if (res.status !== 200) {
            throw Error(res.statusText);
          }
          const breedImages = res.data && res.data.map((res) => res.url);
          dispatch(setCurrentBreedImages(breedImages));
        });
      })
      .catch((e) => {});
  };
}

export function getImages(breedId) {
  return (dispatch) => {
    getBreedImages(breedId, 6, "full")
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }
        const currentBreed = res.data && res.data[0];
        dispatch(setCurrentBreedImages(currentBreed));
      })
      .catch((e) => {});
  };
}

const setBreeds = (breeds) => {
  return {
    type: "panel/BREEDS_SUCCESS",
    breeds,
  };
};

const setBriefList = (briefInfoList) => {
  return {
    type: "panel/BRIEF_INFO_LIST_SUCCESS",
    briefInfoList,
  };
};

const setTableData = (tableData) => {
  return {
    type: "panel/TABLE_DATA_SUCCESS",
    tableData,
  };
};

const setCurrentBreed = (currentBreed) => {
  return {
    type: "panel/CURRENT_BREED_SUCCESS",
    currentBreed,
  };
};

const setCurrentBreedImages = (breedImages) => {
  return {
    type: "panel/CURRENT_BREED_IMAGES_SUCCESS",
    breedImages,
  };
};

const setRecentSearch = (recentSearches) => {
  return {
    type: "panel/RECENT_SEARCH_SUCCESS",
    recentSearches,
  };
};

// reducer
// const panelReducer = {
//   BREED_SUCCESS(state, action) {
//     // state.loading.breeds = false;
//     state.breeds = action.breeds;
//   },
//   BREED_FAILURE(state, action) {
//     // state.loading.breeds = false;
//     state.breeds = null;
//   },
// };

const panelNormalReducer = (state = {}, action) => {
  switch (action.type) {
    // sidepanel breeds
    case "panel/BREEDS_SUCCESS":
      return {
        ...state,
        breeds: action.breeds,
      };
    // breed detail
    case "panel/CURRENT_BREED_SUCCESS":
      return {
        ...state,
        currentBreed: action.currentBreed,
      };
    // list of searched breeds
    case "panel/BRIEF_INFO_LIST_SUCCESS":
      return {
        ...state,
        briefInfoList: action.briefInfoList,
      };
    case "panel/CURRENT_BREED_IMAGES_SUCCESS":
      return {
        ...state,
        breedImages: action.breedImages,
      };
    case "panel/RECENT_SEARCH_SUCCESS":
      return {
        ...state,
        recentSearches: action.recentSearches,
      };
    case "panel/TABLE_DATA_SUCCESS":
      return {
        ...state,
        tableData: action.tableData,
      };
    default:
      return state;
  }
};

// export default (state = initialState, action) =>
//   handleActions({
//     state,
//     action,
//     reducers: panelReducer,
//     namespace: "panel",
//   });

export default panelNormalReducer;
