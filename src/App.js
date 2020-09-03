import React from "react";
import { Switch, Route } from "react-router";
import Panel from './moduels/panel/panel';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/search" component={Panel} />
      </Switch>
    </div>
  );
}

export default App;
