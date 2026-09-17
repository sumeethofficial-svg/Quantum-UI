import { useState } from "react";

import Home from "./pages/Home";
import ComponentLibrary from "./components/library/ComponentLibrary";
import DevelopmentNotice from "./components/ui/DevelopmentNotice";

function App() {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [showDevelopmentNotice, setShowDevelopmentNotice] = useState(false);

  const handleOpenLibrary = () => {
    if (import.meta.env.DEV) {
      setLibraryOpen(true);
      return;
    }

    setShowDevelopmentNotice(true);
  };

  return (
    <>
      {!libraryOpen ? (
        <Home onOpenLibrary={handleOpenLibrary} />
      ) : (
        <ComponentLibrary onClose={() => setLibraryOpen(false)} />
      )}

      {showDevelopmentNotice && (
        <DevelopmentNotice
          onClose={() => setShowDevelopmentNotice(false)}
        />
      )}
    </>
  );
}

export default App;
