import React from "react";


class navbar extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/Home">
         SpartanFoods
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="/Home">
              Home <span class="sr-only">(current)</span>
            </a>
          
            <a class="nav-item nav-link active" href="/Browse">
              Browse
            </a>
            <a class="nav-item nav-link active" href="/AddRecipe">
              Add Recipe
            </a>
            <a class="nav-item nav-link active" href="/Saved">
              Saved
            </a>

          </div>
        </div>
      </nav>
    );
  }
}

export default navbar;