import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/signup_icon.webp";
import { easeOut } from "framer-motion"

export default function SignUp() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [tc, setTc] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (!tc) {
      alert("You must agree to Terms & Conditions.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);
    const users = JSON.parse(localStorage.getItem("users") || "[]");

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


const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
}


  return (
    <div className="min-h-screen flex justify-center items-center bg-[#f6f2ff] px-4 overflow-hidden relative">

  {/* Floating dots */}
  <motion.div
    className="absolute top-10 left-10 w-2 h-2 rounded-full bg-purple-400/40"
    animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
    transition={{ duration: 4, repeat: Infinity }}
  />
  <motion.div
    className="absolute bottom-16 right-12 w-2 h-2 rounded-md bg-purple-300/40"
    animate={{ x: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
    transition={{ duration: 4, repeat: Infinity }}
  />

  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35 }}
    className="bg-white w-full max-w-4xl rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
  >

    {/* LEFT FORM */}
    <motion.div {...fadeUp} className="p-8 flex flex-col justify-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Create an account</h1>
      <p className="text-gray-600 mb-4 text-sm">Welcome — start your journal journey</p>

      <div className="space-y-3.5">

        <input
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            className="w-full px-3.5 py-2.5 pr-9 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-base"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        <input
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-purple-400 outline-none text-sm"
          placeholder="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <label className="flex items-center gap-2 text-xs cursor-pointer">
          <input type="checkbox" checked={tc} onChange={() => setTc(!tc)} className="accent-purple-500" />
          <span className="text-gray-700">I agree to the <span className="text-purple-600 font-semibold">Terms & Conditions</span></span>
        </label>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-xl text-sm transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs text-gray-500">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        <button className="w-full border border-gray-300 bg-white py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition">
          <img src="https://i.ibb.co/VWJvb0y/google.png" className="w-4" />
          Sign up with Google
        </button>

        <p className="text-xs text-center text-gray-600">
          Already have an account?
          <span onClick={() => navigate("/login")} className="text-purple-600 font-semibold cursor-pointer ml-1">
            Log in
          </span>
        </p>

      </div>
    </motion.div>

    {/* RIGHT MOCKUP */}
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1, duration: 0.45 }}
      className="hidden md:flex bg-[#ece4ff] items-center justify-center p-5"
    >
      <img src={heroImg} className="max-w-xs drop-shadow-lg" />
    </motion.div>

  </motion.div>
</div>

  );
}



  