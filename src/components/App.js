import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./common/HomePage";
import Catalogue from "./catalogue/Catalogue";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import Dashboard from "./dashboard/Dashboard";
import Cart from "./catalogue/Cart";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/catalogue" component={Catalogue}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route component={PageNotFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
