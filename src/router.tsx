import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import SingleColorPage from "./pages/SingleColorPage";
import HarmonyPage from "./pages/HarmonyPage";
import NewPalettePage from "./pages/NewPalettePage";
import PalettesPage from "./pages/PalettePage";
import SavedColorsPage from "./pages/SavedColorsPage";
import EditPalettePage from "./pages/EditPalettePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SingleColorPage />,
      },
      {
        path: "/harmony",
        element: <HarmonyPage />,
      },
      {
        path: "/palettes/new",
        element: <NewPalettePage />,
      },
      {
        path: "/palettes/:id/edit",
        element: <EditPalettePage />,
      },
      {
        path: "/palettes",
        element: <PalettesPage />,
      },
      {
        path: "/saved",
        element: <SavedColorsPage />,
      },
    ],
  },
]);
