
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import Navbar from "./components/navigation/Navbar.jsx";
import ComponentLibrary from "./components/library/ComponentLibrary.jsx";

const isComponentsPage =
  window.location.pathname.replace(/\/+$/, "") === "/components";

function ComponentsPage() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-black">
      <Navbar />
      <div className="min-h-0 flex-1">
        <ComponentLibrary />
      </div>
    </div>
  );
}

const Root = isComponentsPage ? ComponentsPage : App;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);