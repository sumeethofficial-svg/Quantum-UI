import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ComponentLibrary from "./components/library/ComponentLibrary.jsx";

const isComponentsPage = window.location.pathname === "/components";

const Root = isComponentsPage ? ComponentLibrary : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
