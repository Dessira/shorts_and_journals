import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import heroImage from "../assets/pixeltrue-study-from-books-1.svg"
import { motion, type Variants } from "framer-motion";
import { HomeNavbar } from "../components/HomeNavbar";

export default function Landing() {
  const floatingVariants: Variants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-white text-black dark:text-black">
      <HomeNavbar/>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:pl-20 pt-16 gap-2">
           {/* Floating Emojis */}
      {["✍️", "📓", "💭", "📖", "💬", "🌙", "🪞", "✨", "🤝", "🪶"]
.map((emoji, i) => (
          <motion.div
            key={`emoji-${i}`}
            className="absolute text-2xl sm:text-4xl"
            style={{
              left: `${10 + ((i * 12) % 80)}%`,
              top: `${15 + ((i * 8) % 70)}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{
              delay: i * 0.3,
              duration: 3 + Math.random() * 2,
            }}
          >
            {emoji}
          </motion.div>
        ))}
        {/* Animated Particles */}
      <div className="hidden absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-2 h-2 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
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
        <div className="hidden bg-purple-100 rounded-full w-1/2 aspect-square md:grid place-content-center">
        <img
        src={heroImage}
        alt="Landing page hero"
        className="h-full w-full"
      />
        </div>
      </section>

      {/* Explore Section */}
<section className="py-28 bg-white">
  <div className="max-w-6xl mx-auto px-6 md:px-12">
    
    {/* Section Headline */}
    <div className="text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
        Small Thoughts,<span className="text-purple-600"> Big Journeys.</span>
      </h2>
      <p className="text-gray-600 text-lg mt-3">
        Discover how tiny notes transform into meaningful stories & journals.
      </p>
    </div>

    {/* Journals Preview */}
    <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-gray-900">
          Explore Featured Journals
        </h3>
        <p className="text-gray-600">
          Reflective journeys curated by thoughtful writers. Dive into themes of
          creativity, growth, and everyday poetry.
        </p>
        <button className="text-purple-600 font-medium hover:text-purple-800 inline-flex items-center gap-1">
          Browse Journals →
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[1,2,3,4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition hover:-translate-y-1"
          >
            <img
              src={`/assets/landing/journal${i}.webp`}
              alt="Journal"
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-semibold text-gray-800">Journey Title {i}</p>
              <span className="text-xs text-gray-500">by Author {i}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Shorts Preview */}
    <div className="grid md:grid-cols-2 gap-16 items-center">
      <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
        {[1,2,3,4].map((i) => (
          <div
            key={i}
            className="p-5 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md hover:-translate-y-1 transition"
          >
            <p className="text-gray-800 italic text-sm leading-relaxed">
              “Life moves fast — but thoughts whispered today become chapters tomorrow.”
            </p>
            <span className="block text-xs text-purple-600 mt-2">
              — Writer {i}
            </span>
          </div>
        ))}
      </div>

      <div className="space-y-4 md:order-2">
        <h3 className="text-2xl font-semibold text-gray-900">
          Shorts that spark <span className="text-purple-600">ideas</span>
        </h3>
        <p className="text-gray-600">
          Quick notes. Tiny reflections. Little bursts of creativity —
          effortlessly captured.
        </p>
        <button className="text-purple-600 font-medium hover:text-purple-800 inline-flex items-center gap-1">
          Explore Shorts →
        </button>
      </div>
    </div>
  </div>
</section>

{/* Features */}
<section className="py-24 bg-purple-50/50 border-t border-purple-100">
  <div className="max-w-6xl mx-auto px-6 md:px-12">
    
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900">
        Writing should feel <span className="text-purple-600">effortless</span>
      </h2>
      <p className="text-gray-600 mt-3 text-lg">
        Designed to make capturing ideas natural, simple, and beautiful.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          title: "Short-first writing",
          desc: "Capture fragments that slowly become complete thoughts.",
          emoji:"🖊️"
        },
        {
          title: "Calm, focused workspace",
          desc: "No clutter, no noise — just you and your ideas.",
          emoji:"🌿"
        },
        {
          title: "Seamless organization",
          desc: "Automatically grow your journals as your thoughts expand.",
          emoji:"✨"
        },
      ].map((f)=>(
        <div
          key={f.title}
          className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition"
        >
          <div className="text-3xl mb-3">{f.emoji}</div>
          <h4 className="text-lg font-semibold mb-2">{f.title}</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
