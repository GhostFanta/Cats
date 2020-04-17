import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import panelReducers from "./moduels/panel/panel.store";
import componentReducer from "./components/components.store";
import { loadingReducer } from "./utils/reducers/loadingReducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    panel: panelReducers,
    loading: loadingReducer,
    components: componentReducer,
  });
