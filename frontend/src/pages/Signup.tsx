import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if username or email already exists
    if (users.some((u: any) => u.email === email)) {
      alert("Email already exists.");
      setLoading(false);
      return;
    }

    if (users.some((u: any) => u.username === username)) {
      alert("Username already taken.");
      setLoading(false);
      return;
    }

    const newUser = { fullName, username, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    setTimeout(() => {
      setLoading(false);
      alert("Sign up successful!");
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
          Sign Up
        </h1>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john_doe"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
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

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}


  