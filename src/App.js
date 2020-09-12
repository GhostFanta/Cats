import React from "react";
import {Switch, Route, Redirect} from "react-router";
import Panel from './moduels/panel/panel';
import Auth from './moduels/auth/auth';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={Panel} />
        <Route path="/gallery" component={Panel} />
        <Route path="/login" component={Auth} />
        <Route path="/signup" component={Auth} />
        <Route exact path="/" >
            <Redirect to="/search"/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
