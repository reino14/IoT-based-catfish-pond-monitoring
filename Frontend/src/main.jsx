import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";   // <- pakai App, bukan AppRoutes langsung

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
