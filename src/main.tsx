import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { client } from "@react-query/index.ts";
import { persistor, store } from "@redux/index.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import timezone from "dayjs/plugin/timezone";
import updateLocale from "dayjs/plugin/updateLocale";
import utc from "dayjs/plugin/utc";
import { PersistGate } from "redux-persist/integration/react";

import "dayjs/locale/vi";

import App from "./App.tsx";
import theme from "./themes";

import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import "./styles/override-variables/index.scss";

dayjs.extend(updateLocale);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.updateLocale("vi", {
  weekdaysMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
});

// //note: Connect to service worker
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/firebase-messaging-sw.js")
//       .then((registration) => {
//         console.log(
//           "Service Worker registered with scope:",
//           registration.scope
//         );
//       })
//       .catch((err) => {
//         console.error("Service Worker registration failed:", err);
//       });
//   });
// }

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={client}>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="vi">
              <App />
            </LocalizationProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
