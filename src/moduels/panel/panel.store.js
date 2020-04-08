import { panelConstants } from "./panel.constants";
import { getAllBreeds } from "../../service";
import { handleActions } from "../../utils/handleActions";

const initialState = {};

// action
export function getBreeds() {
  return (dispatch) => {
    getAllBreeds()
      .then((res) => {
        if (res.status !== 200) {
          throw Error(res.statusText);
        }
        const breeds = res.data.map((item) => item["name"]);
        dispatch("panel/BREED_SUCCESS", breeds);
      })
      .catch((e) => {});
  };
}

export function getSortBys() {

}

export function getRecentSeaches() {

}

// reducer
const panelReducer = {
  BREED_SUCCESS(state, action) {
    state.loading.breeds = false;
    state.breeds = action.breeds;
  },
  BREED_FAILURE(state, action) {
    state.loading.breeds = false;
    state.breeds = null;
  },
};

export default (state = initialState, action) =>
  handleActions({
    state,
    action,
    reducers: panelReducer,
    namespace: "panel",
  });
