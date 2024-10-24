import { useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import { setAuthToken } from "@funcs/auth";
import { useSelector } from "@hooks/redux";
import { routes } from "@routes";

function App() {
  // const [notification, setNotification] = useState<any>(null);
  //#region Data
  const access_token = useSelector(
    (state) => state.auth.access_token,
    shallowEqual
  );

  const router = useMemo(() => createBrowserRouter(routes), []);
  //#endregion
  // useEffect(() => {
  //   requestFirebaseNotificationPermission()
  //     .then((token) => {
  //       if (token) {
  //         console.log("Firebase token received:", token);
  //       }
  //     })
  //     .catch((err) => console.log("Permission request failed", err));
  // }, []);

  // useEffect(() => {
  //   onMessageListener().then((payload: any) => {
  //     setNotification(payload);
  //     console.log("Notification received in foreground: ", payload);
  //   });
  // }, []);

  useEffect(() => {
    setAuthToken(access_token);
  }, [access_token]);

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
