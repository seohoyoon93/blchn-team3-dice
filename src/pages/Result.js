import React, { Component } from "react";
import "../stylesheets/result.css";

class Result extends Component {
  render() {
    return (
      <div className="Result">
        <header className="Result-header">
          Result is:
          <p>You Won!</p>
          <p> MY Balance will be: </p>
          <h5> Ethereum tx: </h5>
          <button className="play">Play Again! </button>
        </header>
      </div>
    );
  }
}

export default Result;
