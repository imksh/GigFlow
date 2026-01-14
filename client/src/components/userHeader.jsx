import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import transparentLogo from "../assets/images/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import HeaderSearch from "./HeaderSearch";
import useUiStore from "../store/useUiStore";

const UserHeader = () => {
  const { showHeader, setShowHeader } = useUiStore();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { user } = useAuthStore();
  if (!user) return null;
  return (
    <div
      className={`fixed top-0 left-0 w-full z-99 bg-(--primary) text-black font-bold flex flex-col  md:px-16 min-h-[10dvh] justify-center ${
        showHeader ? "rounded-b-2xl" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`flex  px-4  justify-between  items-center h-[10dvh] z-99 bg-(--primary) `}
      >
        <Link to="/">
          <motion.button
            whileTap={{ scale: 0.8 }}
            className={`flex items-center gap-2.5 cursor-pointer text-white`}
          >
            <img
              src={transparentLogo}
              alt=""
              className={`w-10 object-cover object-center`}
            />
            <h2 className="text-2xl">GigFlow</h2>
          </motion.button>
        </Link>

        <div className="hidden md:flex list-none gap-3 items-center  my-auto">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer hover:text-(--accent) ${
                location === "/" ? "text-(--accent)" : "text-white "
              }`}
            >
              Home
            </motion.button>
          </Link>

          <Link to="/dashboard">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer hover:text-(--accent) ${
                location === "/dashboard" ? "text-(--accent)" : "text-white "
              }`}
            >
              Dashboard
            </motion.button>
          </Link>
          <div className="text-white">
            <HeaderSearch />
          </div>
          <Link to="/profile">
            <div
              className={`text-white border bg-blue-400 rounded-full p-2 ${
                location === "/profile" ? "border-white" : "border-(--primary) "
              }`}
            >
              {user?.name?.charAt(0) +
                " " +
                user?.name?.split(" ")[1]?.charAt(0)}
            </div>
          </Link>
        </div>

        <div className="flex md:hidden text-white">
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              setShowHeader(!showHeader);
            }}
          >
            {showHeader ? (
              <IoCloseSharp size={30} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showHeader && (
          <motion.div
            className="flex  md:hidden flex-col items-baseline gap-3 mb-4 rounded-b-2xl"
            exit={{ opacity: 0, y: -100 }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link to="/">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeader(false);
                }}
                className={`cursor-pointer  hover:text-(--accent) w-full flex justify-baseline px-8 ${
                  location === "/dashboard" ? "text-(--accent)" : "text-white "
                }`}
              >
                Home
              </motion.button>
            </Link>
            <Link to="/dashboard">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeader(false);
                }}
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline px-8 ${
                  location === "/dashboard" ? "text-(--accent)" : "text-white "
                }`}
              >
                Dashboard
              </motion.button>
            </Link>
            <Link to="/profile">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeader(false);
                }}
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline px-8 ${
                  location === "/dashboard" ? "text-(--accent)" : "text-white "
                }`}
              >
                Profile
              </motion.button>
            </Link>
            <div className="text-white w-full my-4">
              <HeaderSearch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserHeader;
