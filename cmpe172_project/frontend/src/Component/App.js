import React, { Component } from "react";

import AddRecipe from "./Component/AddRecipe";

import { Route, BrowserRouter as Router } from "react-router-dom";

import Recipe from "./Component/Recipe";
import Sidebar from "./Component/NavBar";
import Home from "./Component/Home";
import Share from "./Component/share";
import suggestions from "./Component/suggestions";



class App extends Component {
  
  render() {
    return (
      <div id="App">
      <Sidebar/>
      <Router>
        <Route exact path="/Home" component={Home} />
	<Route exact path="/suggestions" component={suggestions} />
        <Route exact path="/AddRecipe" component={AddRecipe} />
        <Route exact path="/recipe" component={Recipe} />
	<Route exact path="/share" component={Share} />
        <Route exact path="/" component={Home} />

      </Router>
      </div>
      
    );
  }
}

export default App;
