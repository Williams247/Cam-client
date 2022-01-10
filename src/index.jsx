import React from "react";
import ReactDOM from "react-dom";
import Navigation from "./components/Navigation/Navigation";
import Screen from "./components/Screen/Screen";
import "./index.css";

const Page = () => {
  return (
    <React.Fragment>
      <Navigation />
      <Screen />
    </React.Fragment>
  )
}

ReactDOM.render(<Page />, document.getElementById('root'));
