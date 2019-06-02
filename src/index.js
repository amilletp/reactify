import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Polyfills!
import "@babel/polyfill";
// Babel solo agrega los polyfills definidos en ECMAScript
// Fetch no esta, tiene que ser agregado separadamente
import "whatwg-fetch";

ReactDOM.render(
  <main>
    <App />
  </main>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
