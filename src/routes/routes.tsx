import Dashboard from "pages/Dashboard";
import { Error } from "pages/Error";
import Login from "pages/Login";
import { createBrowserRouter } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
