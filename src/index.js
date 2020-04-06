import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./configureStore";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/index.scss'

ReactDOM.render(
  <Provider store={store()}>
    <ConnectedRouter history={history}>
      <React.StrictMode>
        <BrowserRouter>
          <Route path="/" component={App}/>
        </BrowserRouter>
      </React.StrictMode>
    </ConnectedRouter>
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
