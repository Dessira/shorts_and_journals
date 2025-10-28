import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import heroImage from "../assets/hero_icon.png";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-white text-black dark:text-black">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 ">
        <h1 className="text-xl font-bold tracking-tight">
          ✍️ Shorts & Journals
        </h1>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link to="/login" className="hover:text-purple-600 transition">
            Login
          </Link>
          <div>About</div>
          <div>shorts</div>
          <div>Journals</div>
          <div>Features</div>
          <Link
            to="/signup"
            className="bg-purple-300 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
          >
            Get Started
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:pl-20 pt-16 gap-2">
        <div className="max-w-lg self-start pt-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Turn your Shorts into <span className="text-purple-600"> journals.</span>
          </h2>
          <p className="text-lg text-black dark:text-black mb-8">
            Writing doesn’t have to be overwhelming. Capture your ideas as short
            notes, reflections, or moments then watch them grow into complete
            journals effortlessly.
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-purple-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-purple-700 transition"
            >
              Start Writing
            </Link>
            <Link
              to="/login"
              className="border border-purple-600 text-purple-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
            >
              Already have an account?
            </Link>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="hidden bg-purple-600 rounded-full w-1/2 aspect-square md:grid place-content-center">
        <img
        src={heroImage}
        alt="Landing page hero"
        className=""
      />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-white py-20 px-8 md:px-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h4 className="text-xl font-semibold mb-3">Write Small, Think Big</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Capture fleeting thoughts as “shorts.” Each one builds toward
              meaningful ideas — without pressure or perfection.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h4 className="text-xl font-semibold mb-3">Organize Effortlessly</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Combine your shorts into thematic journals, track progress, and
              revisit your creative journey — all in one space.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8">
            <h4 className="text-xl font-semibold mb-3">Write Anywhere</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Whether you’re on mobile or desktop, capture thoughts instantly
              and sync them across your devices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 md:px-20 text-center">
        <h3 className="text-3xl font-bold mb-4">
          Start small. Write freely. Build something meaningful.
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Join writers, thinkers, and dreamers who turn daily reflections into
          lasting collections.
        </p>
        <Link
          to="/signup"
          className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Create Your First Journal
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
