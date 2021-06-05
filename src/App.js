import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/homepage/homepage.component.jsx";

const HatsPage = () => {
  return <div>Hats Page</div>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/shops/hats" component={HatsPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
