import { useEffect, useState } from "react";
import api from "../utils/axios";
import useAuthStore from "../store/useAuthStore";
import Stat from "../components/Stat";
import Post from "../components/Post";
import useGigStore from "../store/useGigStore";
import useUiStore from "../store/useUiStore";
import Search from "../components/Search";
import GigCard from "../components/GigCard";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

export default function Home() {
  const { user } = useAuthStore();
  const { gigs, getAll } = useGigStore();
  const navigate = useNavigate();
  const {
    gigsPosted,
    bidsMade,
    hired,
    activeGigs,
    setGigsPosted,
    setBidsMade,
    setHired,
    setActiveGigs,
  } = useUiStore();

  useEffect(() => {
    getAll();
  }, []);

  const getInitials = (name = "") => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return `${parts[0][0]} ${parts[1][0]}`.toUpperCase();
};

  if (!user) return <Loading />;

  return (
    <div>
      <div className="h-[90dvh]  bg-slate-50 md:px-6 grid lg:grid-cols-[25%_50%_25%] overflow-hidden hide-scrollbar">
        <div className="hidden lg:flex items-baseline max-w-6xl pt-30 mx-auto text-center mb-12 border-slate-300 w-full  justify-center hide-scrollbar ">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col border border-slate-300 w-[80%]  mx-auto p-4 rounded-lg hover:shadow-lg"
          >
            <div className=" text-white bg-blue-400 rounded-full p-4 w-fit mx-auto font-extrabold min-w-10 aspect-square text-center">
              {getInitials(user?.name)}
            </div>
            <h2 className="text-lg font-bold text-blue-500 my-1">
              {user.name}
            </h2>
            <div className="mt-1 flex gap-2 mx-auto">
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                Client
              </span>
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                Freelancer
              </span>
            </div>
            <div className="flex justify-around mt-6 mb-2">
              <motion.button
                onClick={() => navigate("/gigs")}
                className="min-w-[45%] cursor-pointer"
              >
                <Stat label="Gigs Posted" value={gigsPosted} />
              </motion.button>
              <motion.button
                onClick={() => navigate("/bids")}
                className="min-w-[45%] cursor-pointer"
              >
                <Stat label="Bids Made" value={bidsMade} />
              </motion.button>
            </div>
            <div className="flex justify-around my-2">
              <motion.button className="min-w-[45%]">
                <Stat label="Hired" value={hired} />
              </motion.button>
              <motion.button className="min-w-[45%]">
                <Stat label="Active Gigs" value={activeGigs} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="px-4 md:px-8 overflow-scroll h-full hide-scrollbar pt-8">
          <Post />
          <div className="flex lg:hidden justify-around mt-6 mb-2">
            <motion.button
              onClick={() => navigate("/gigs")}
              className="min-w-[45%] cursor-pointer"
            >
              <Stat label="Gigs Posted" value={gigsPosted} />
            </motion.button>
            <motion.button
              onClick={() => navigate("/bids")}
              className="min-w-[45%] cursor-pointer"
            >
              <Stat label="Bids Made" value={bidsMade} />
            </motion.button>
          </div>

          <div className="max-w-6xl mx-auto grid gap-6 ">
            {gigs?.map((gig, idx) => (
              <GigCard gig={gig} idx={idx} />
            ))}

            {gigs.length === 0 && (
              <p className="text-slate-500 col-span-full text-center">
                No jobs found.
              </p>
            )}
          </div>
        </div>

        <div className="hidden lg:flex h-full items-baseline max-w-4xl w-full mx-auto mb-10 pt-30 ">
          <Search />
        </div>
      </div>
      <Footer />
    </div>
  );
}
