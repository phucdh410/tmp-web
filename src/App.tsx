import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "@routes";

function App() {
  //#region Data
  const router = useMemo(() => createBrowserRouter(routes), []);
  //#endregion

  //#region Render
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
  //#endregion
}

export default App;
