import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // email or username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!identifier || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate backend authentication
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Find user by email or username
    const user = users.find(
      (u: any) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    setTimeout(() => {
      setLoading(false);
      if (user) {
        alert(`Welcome back, ${user.username}!`);
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      } else {
        alert("Invalid username/email or password.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Log In
        </h1>

        {/* Username or Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Username or Email
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="john_doe or john@example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>

        {/* Forgot Password Placeholder */}
        <p className="mt-2 text-center text-gray-500 dark:text-gray-400 text-sm cursor-pointer hover:underline">
          Forgot password?
        </p>
      </div>
    </div>
  );
}
