/* polyfills.js */

import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "core-js/features/array/find";
import "core-js/features/array/includes";
import "core-js/features/number/is-nan";

/* index.js */

import "./polyfills";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
