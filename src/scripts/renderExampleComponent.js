import React from "react";
import ReactDOM from "react-dom";
import ExampleComponent from "./components/ExampleComponent";

window.addEventListener("DOMContentLoaded", () => {
  const div = document.createElement("div");
  div.setAttribute("class", "example-preact-component");
  document.querySelector(".cart-template").prepend(div);
  ReactDOM.render(<ExampleComponent />, div);
});
