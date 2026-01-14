import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import {
  FaBolt,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const words = [
  "Hire in minutes.",
  "Get real bids.",
  "No spam.",
];

const Landing = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="block lg:inline-block">Post a job.</span>{" "}
            <span className="text-blue-600 inline-block min-h-[1.2em]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <p className="mt-6 text-lg text-slate-600">
            GigFlow connects you with real freelancers through competitive
            bidding. No browsing. No spam. Just instant offers.
          </p>

          <div className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition cursor-pointer"
            >
              Post a Gig – Free
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/login")}
              to="/login"
              className="hidden md:block px-8 py-4 border border-slate-300 rounded-xl text-lg hover:bg-slate-200 transition cursor-pointer"
            >
              Find Work
            </motion.button>
          </div>
        </div>

        <div className="relative">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white shadow-xl rounded-2xl p-6"
          >
            <p className="font-semibold">React Developer Needed</p>
            <p className="text-slate-500 mt-1">Budget: ₹15,000</p>

            <div className="mt-4 space-y-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex justify-between bg-slate-100 p-3 rounded-lg"
              >
                <span>Rohit</span> <span>₹12,000</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex justify-between bg-slate-100 p-3 rounded-lg"
              >
                <span>Roshan</span> <span>₹14,000</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex justify-between bg-blue-100 p-3 rounded-lg"
              >
                <span>Karan</span>{" "}
                <span className="text-blue-600 font-semibold">₹10,500</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY GigFlow */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
          <div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <FaBolt className="text-blue-600 text-4xl mx-auto" />
            </motion.div>
            <h3 className="mt-4 font-bold text-xl">Instant Bids</h3>
            <p className="text-slate-600 mt-2">
              Freelancers compete for your job in minutes.
            </p>
          </div>

          <div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <FaMoneyBillWave className="text-blue-600 text-4xl mx-auto" />
            </motion.div>
            <h3 className="mt-4 font-bold text-xl">Real Pricing</h3>
            <p className="text-slate-600 mt-2">
              You see market prices instantly.
            </p>
          </div>

          <div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <FaUsers className="text-blue-600 text-4xl mx-auto" />{" "}
            </motion.div>
            <h3 className="mt-4 font-bold text-xl">Skilled Talent</h3>
            <p className="text-slate-600 mt-2">
              Hire from verified freelancers.
            </p>
          </div>

          <div>
            <motion.div
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className=""
            >
              <FaCheckCircle className="text-blue-600 text-4xl mx-auto" />{" "}
            </motion.div>
            <h3 className="mt-4 font-bold text-xl">One-Click Hire</h3>
            <p className="text-slate-600 mt-2">
              Accept a bid and start work instantly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">How GigFlow Works</h2>

          <div className="mt-12 grid md:grid-cols-4 gap-10 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">1</div>
              <p className="mt-3">Post your gig</p>
            </div>

            <div>
              <div className="text-3xl font-bold text-blue-600">2</div>
              <p className="mt-3">Receive bids</p>
            </div>

            <div>
              <div className="text-3xl font-bold text-blue-600">3</div>
              <p className="mt-3">Compare offers</p>
            </div>

            <div>
              <div className="text-3xl font-bold text-blue-600">4</div>
              <p className="mt-3">Hire instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to hire or get hired?
        </h2>
        <p className="mt-4 text-lg">Join GigFlow today and start in minutes.</p>

        <div className="mt-8 flex justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/register")}
            className="px-4 py-2 md:px-8 md:py-4 bg-white text-blue-600 font-semibold rounded-xl cursor-pointer"
          >
            Post a Gig
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/login")}
            className="px-4 py-2 md:px-8 md:py-4 border border-white rounded-xl cursor-pointer"
          >
            Start Bidding
          </motion.button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Landing;
