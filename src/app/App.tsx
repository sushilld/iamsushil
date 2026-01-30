import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}
