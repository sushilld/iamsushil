import { createBrowserRouter } from "react-router";
import Home from "@/app/pages/Home";
import Timeline from "@/app/pages/Timeline";
import Projects from "@/app/pages/Projects";
import { MainLayout } from "@/app/components/MainLayout";
import { AdminLayout } from "@/app/components/AdminLayout";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

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
  {
    path: "/only-for-me",
    children: [
      {
        path: "login",
        lazy: () => import("@/app/pages/AdminLogin").then((m) => ({ Component: m.default })),
      },
      {
        path: "",
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            lazy: () => import("@/app/pages/AdminDashboard").then((m) => ({ Component: m.default })),
          },
          {
            path: "projects",
            lazy: () => import("@/app/pages/AdminProjects").then((m) => ({ Component: m.default })),
          },
          {
            path: "gallery",
            lazy: () => import("@/app/pages/AdminGallery").then((m) => ({ Component: m.default })),
          },
        ],
      },
    ],
  },
]);