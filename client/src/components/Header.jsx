import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import transparentLogo from "../assets/images/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useUiStore from "../store/useUiStore";

const Header = () => {
  const { showHeader, setShowHeader } = useUiStore();
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <div
      className={`fixed top-0 left-0 w-full z-99 bg-(--primary) text-black font-bold flex flex-col px-4 md:px-16 min-h-[10dvh] justify-center ${
        showHeader ? "rounded-b-2xl" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`flex justify-between  items-center h-[10dvh] z-99 bg-(--primary) `}
      >
        <Link to="/">
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="flex items-center gap-2.5 cursor-pointer text-white "
          >
            <img
              src={transparentLogo}
              alt=""
              className="w-10 object-cover object-center"
            />
            <h2 className="text-2xl">GigFlow</h2>
          </motion.button>
        </Link>

        <div className="hidden md:flex list-none gap-3 items-center  my-auto">
          <Link to="/">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer  hover:text-(--accent) ${
                location === "/" ? "text-(--accent)" : "text-white "
              }`}
            >
              Home
            </motion.button>
          </Link>

          <Link to="/login">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer hover:text-(--accent) ${
                location === "/login" ? "text-(--accent)" : "text-white "
              }`}
            >
              Login
            </motion.button>
          </Link>
          <Link to="/register">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.9 }}
              className={`cursor-pointer hover:text-(--accent) ${
                location === "/register" ? "text-(--accent)" : "text-white "
              }`}
            >
              Register
            </motion.button>
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
            className="flex  md:hidden flex-col items-baseline gap-3 mx-4 mb-4 rounded-b-2xl"
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
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline ${
                  location === "/" ? "text-(--accent)" : "text-white "
                }`}
              >
                Home
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeader(false);
                }}
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline ${
                  location === "/login" ? "text-(--accent)" : "text-white "
                }`}
              >
                Login
              </motion.button>
            </Link>
            <Link to="/register">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowHeader(false);
                }}
                className={`cursor-pointer hover:text-(--accent) w-full flex justify-baseline ${
                  location === "/register" ? "text-(--accent)" : "text-white "
                }`}
              >
                Register
              </motion.button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
