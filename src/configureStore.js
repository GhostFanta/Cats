import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import reducers from "./reducerRoot";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

export const history = createBrowserHistory();
const loggerMiddleWare = createLogger();

export default function configureStore(preloadedState) {
  return createStore(
    reducers(history),
    preloadedState,
    applyMiddleware(thunk, routerMiddleware(history), loggerMiddleWare)
  );
}
