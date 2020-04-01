import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducerRoot";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
    return createStore(
        reducers(history),
        preloadedState,
        applyMiddleware(thunk, routerMiddleware(history))
    );
}
