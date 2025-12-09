import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Outlet />
    </div>
  );
}