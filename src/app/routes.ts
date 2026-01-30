import { createBrowserRouter } from "react-router";
import Home from "@/app/pages/Home";
import Timeline from "@/app/pages/Timeline";
import Projects from "@/app/pages/Projects";
import { MainLayout } from "@/app/components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/timeline",
        Component: Timeline,
      },
      {
        path: "/projects",
        Component: Projects,
      },
      {
        path: "/gallery",
        lazy: () => import("@/app/pages/Gallery").then((m) => ({ Component: m.default })),
      },
    ],
  },
]);