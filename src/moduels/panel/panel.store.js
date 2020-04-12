import { panelConstants } from "./panel.constants";
import { getAllBreeds, getBreedByName } from "../../service";
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

export function getSortBys() {}

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

// const setBreedsFailure = (error) => {
//   return {
//     type: "panel/BREEDS_FAILURE",
//     error,
//   };
// };

const setCurrentBreed = (currentBreed) => {
  return {
    type: "panel/CURRENT_BREED_SUCCESS",
    currentBreed,
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
