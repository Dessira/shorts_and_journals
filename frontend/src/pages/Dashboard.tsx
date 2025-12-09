import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function Dashboard() {
  const { user } = useAuthStore();
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <div>
      Hello, {user?.username ?? "Guest"}!
      </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


  