import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ComponentLibrary from "./components/library/ComponentLibrary.jsx";
import UnderDevelopment from "./components/UnderDevelopment.jsx";

const isComponentsPage = window.location.pathname === "/components";
const isProduction = import.meta.env.PROD;

const Root = isComponentsPage
  ? isProduction
    ? UnderDevelopment
    : ComponentLibrary
  : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
