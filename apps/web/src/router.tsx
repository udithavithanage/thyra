import { createBrowserRouter } from "react-router-dom";

import { DocsLayout } from "@/layouts";
import { DocsPage } from "@/pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DocsLayout />,
    children: [
      {
        index: true,
        element: <DocsPage />,
      },
      {
        path: "*",
        element: <DocsPage />,
      },
    ],
  },
]);
