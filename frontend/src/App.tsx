import { useState } from 'react'

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CreateShort from "./pages/CreateShort";
import CreateJournal from "./pages/CreateJournal";
import ViewShorts from "./pages/ViewShorts";
import ViewJournals from "./pages/ViewJournals";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"
import { PrivateRoute } from "./components/PrivateRoute";
import PublicLayout from './pages/PublicLayout';
import JournalView from './pages/Viewjournal';
import JournalList from './pages/JournalList';

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/journals/:id",
    element: <PublicLayout />,
    children: [
      { path: "", element: <JournalView /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <div>Welcome to your Dashboard 👋</div> },
      { path: "create-short", element: <CreateShort /> },
      { path: "create-journal", element: <CreateJournal /> },
      { path: "view-shorts", element: <ViewShorts /> },
      { path: "view-journals", element: <JournalList /> },
      { path: "settings", element: <Settings /> },
      {path: "profile", element:
      <Profile />
      }
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
