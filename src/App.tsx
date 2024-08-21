import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import { routes } from "@routes";

function App() {
  //#region Data
  const router = useMemo(() => createBrowserRouter(routes), []);
  //#endregion

  //#region Render
  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        transition={Zoom}
      />
    </>
  );
  //#endregion
}

export default App;
