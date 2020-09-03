import React from "react";
import {Switch, Route, Redirect} from "react-router";
import Panel from './moduels/panel/panel';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={Panel} />
          <Route exact path="/" >
              <Redirect to="/search"/>
          </Route>
      </Switch>
    </div>
  );
}

export default App;
