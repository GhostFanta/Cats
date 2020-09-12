import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import panelReducers from "./moduels/panel/panel.store";
import authReducers from "./moduels/auth/auth.store";
import componentReducer from "./components/components.store";
import {loadingReducer} from "./utils/reducers/loadingReducer";

export default (history) =>
    combineReducers({
        router: connectRouter(history),
        panel: panelReducers,
        auth: authReducers,
        loading: loadingReducer,
        components: componentReducer,
    });
