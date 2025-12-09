import { Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { isAuthenticated } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export function PrivateRoute({ children }: { children: JSX.Element }) {
    const {loggedIn, checkAuth} = useAuthStore();
    useEffect(() => {
        checkAuth();
      }, [checkAuth]);

  if (!loggedIn) return <div>Loading...</div>;

  return loggedIn ? children : <Navigate to="/login" replace />;
}
