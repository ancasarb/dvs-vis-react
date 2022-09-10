import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const props = { height: 480, width: 800 };

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App {...props} />
  </React.StrictMode>
);
