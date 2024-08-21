import { redirect } from "react-router-dom";

import { IRootState, store } from "@redux/index";

export const authLoader = async (layout: "main" | "login") => {
  const rootState: IRootState = store.getState();

  if (rootState.auth.isLogined && layout === "login") {
    return redirect("/");
  } else if (!rootState.auth.isLogined && layout === "main") {
    return redirect("/login");
  }

  return true;
};
