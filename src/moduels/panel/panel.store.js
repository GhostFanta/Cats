import { panelConstants } from "./panel.constants";
import { getAllBreeds, getBreedByName, getBreedImages } from "../../service";
import { handleActions } from "../../utils/handleActions";
import { errorReducer } from "../../utils/reducers/errorReducer";

// const initialState = {
//   breeds: null,
//   currentBreed: null,
// };

// action
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
        dispatch(setBriefList(briefInfoList));
      })
      .catch((e) => {});
  };
}

export function getRecentSeaches() {}

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

const setCurrentBreed = (currentBreed) => {
  return {
    type: "panel/CURRENT_BREED_SUCCESS",
    currentBreed,
  };
};

const setCurrentBreedImages = (breedImages) => {
  return {
    type: "panel/CURRENT_BREED_IMAGES",
    breedImages,
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
    case "panel/CURRENT_BREED_IMAGES":
      return {
        ...state,
        breedImages: action.breedImages,
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
