import { panelConstants } from "./panel.constants";

export function fetchBreed() {

}

export function panelReducer(state = {}, action) {
    switch (action.type) {
        case panelConstants.BREED_FETCHING:
            return {
                ...state,
            }
        default:
            return state;
    }
}
