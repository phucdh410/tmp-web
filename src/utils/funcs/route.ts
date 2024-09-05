import { createElement, lazy, Suspense } from "react";

import { CDevelopingPage, CPageLoader } from "@others";

export function asyncLayout(
  factory: () => Promise<{ default: any }>,
  isDeveloping = false
) {
  if (isDeveloping) return createElement(CDevelopingPage);

  const Layout = lazy(factory);

  return createElement(
    Suspense,
    {
      fallback: createElement(CPageLoader),
    },
    createElement(Layout)
  );
}
