import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css-globals/base.css";
import "./css-globals/utilities.css";
import "./css-globals/media-queries.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
