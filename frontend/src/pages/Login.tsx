import { useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/shorts_login_icon.webp"; // your illustration

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!identifier || !password) return alert("Please fill in all fields.");
    setLoading(true);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: any) =>
        (u.email === identifier || u.username === identifier) &&
        u.password === password
    );

    setTimeout(() => {
      setLoading(false);
      if (!user) return alert("Invalid username/email or password.");

      if (remember) localStorage.setItem("rememberUser", identifier);
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome back, ${user.username}!`);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f5f2ff] px-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT */}
        <div className="p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">Log in</h1>
          <p className="text-sm text-gray-600 mt-1">
            or{" "}
            <button
              className="text-purple-600 font-medium hover:underline"
              onClick={() => navigate("/signup")}
            >
              create an account
            </button>
          </p>

          <div className="mt-8 space-y-5">

            {/* Username */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username or Email
              </label>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
                placeholder="john_doe or john@mail.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-2 px-4 py-3 pr-10 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-purple-400 outline-none"
                  placeholder="••••••••"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-500 text-sm"
                >
                  {showPass ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="accent-purple-500"
                />
                <span className="text-gray-700">Remember me</span>
              </label>

              <button className="text-purple-600 hover:underline">
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition duration-200 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log me in"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <hr className="flex-1 border-gray-200" />
              <span className="text-gray-500 text-sm">or</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Google Sign-in */}
            <button className="w-full border border-gray-300 bg-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition">
              <img src="https://i.ibb.co/VWJvb0y/google.png" className="w-5" />
              <span className="text-gray-700 font-medium">Sign in with Google</span>
            </button>

          </div>
        </div>

        {/* RIGHT - illustration */}
        <div className="hidden md:flex bg-[#f3edff] items-center justify-center p-6">
          <img
            src={heroImg}
            className="max-w-xs md:max-w-sm drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
