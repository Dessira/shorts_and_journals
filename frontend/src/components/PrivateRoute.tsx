import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { isAuthenticated } from "../api/auth";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  console.log("PrivateRoute check:", { authChecked, authorized });
  useEffect(() => {
    const check = async () => {
      const ok = await isAuthenticated();
      setAuthorized(ok);
      setAuthChecked(true);
    };
    check();
  }, []);

  if (!authChecked) return <div>Loading...</div>;

  return authorized ? children : <Navigate to="/login" replace />;
}
