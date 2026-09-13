import { useState } from "react";

import Home from "./pages/Home";
import ComponentLibrary from "./components/library/ComponentLibrary";

function App() {
  const [libraryOpen, setLibraryOpen] = useState(false);

  return (
    <>
      {!libraryOpen ? (
        <Home
          onOpenLibrary={() => setLibraryOpen(true)}
        />
      ) : (
        <ComponentLibrary
          onClose={() => setLibraryOpen(false)}
        />
      )}
    </>
  );
}

export default App;