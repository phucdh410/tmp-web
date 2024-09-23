import { createElement, lazy, Suspense } from "react";

import { CDevelopingPage, CLayoutLoader, CPageLoader } from "@others";

export function asyncLayout(
  factory: () => Promise<{ default: any }>,
  isDeveloping = false,
  target = "page" //note: layout | page
) {
  if (isDeveloping) return createElement(CDevelopingPage);

  const Layout = lazy(factory);

  return createElement(
    Suspense,
    {
      fallback: createElement(
        target === "layout" ? CLayoutLoader : CPageLoader
      ),
    },
    createElement(Layout)
  );
}
