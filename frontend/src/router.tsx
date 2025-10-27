import { createBrowserRouter } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateShort from "./pages/CreateShort";
import CreateJournal from "./pages/CreateJournal";
import ViewShorts from "./pages/ViewShorts";
import ViewJournals from "./pages/ViewJournals";
import Settings from "./pages/Settings";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/create-short", element: <CreateShort /> },
  { path: "/create-journal", element: <CreateJournal /> },
  { path: "/view-shorts", element: <ViewShorts /> },
  { path: "/view-journals", element: <ViewJournals /> },
  { path: "/settings", element: <Settings /> },
]);
