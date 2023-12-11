import React, { useState, useEffect } from "react";
import CartWidget from "../Cart/CartWidget";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { AiOutlineUser } from "react-icons/ai";
import './font.css';

const NavBar = () => {
  const [burgerOpen, setburgerOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await auth.logOut();
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      navigate("/login");
      toggleBurger();
    }
  };

  const toggleBurger = () => {
    setburgerOpen((prevState) => !prevState);
  };

  return (
    <nav>
      <motion.nav
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 m8Max:text-sm">
          <div className="flex items-center">
            <motion.button
              type="button"
              onClick={toggleBurger}
              data-collapse-toggle="navbar-search"
              className="mr-4 bg-slate-800 inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-200 rounded-md m8:hidden"
              aria-controls="navbar-search"
              aria-expanded={burgerOpen}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </motion.button>

            <Link to={"/"}>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white m8Max:text-center ">
              RajaShop
              </span>
            </Link>
          </div>
          <div className="items-center flex md:order-2 gap-2">
            <div className="items-center md:flex md:order-2 gap-2 ">
              <Link
                to={auth.user ? "/userProfile" : "/login"}
                className="text-black"
              >
    <motion.div whileTap={{ scale: 0.9 }} style={{ background: "none" }}>
      <div className="border-white  p-2 rounded-xl">
        <AiOutlineUser className="w-6 h-6 text-white" />
      </div>
    </motion.div>
              </Link>
            </div>
            <div className="items-center md:flex gap-2 ">
              <Link to={"/cart"}>
                <div className="ml-1">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <CartWidget />
                  </motion.div>
                </div>
              </Link>
            </div>
          </div>
          <div
            className={`mt-4 ${
              burgerOpen ? "block" : "hidden"
            } w-full m8:flex m8:w-auto md:mt-0`}
            id="navbar-search"
          >
            <ul className="flex flex-col md:flex-row md:space-x-4 md:mt-0 font-medium text-white border-gray-700 rounded-lg items-center">
              <li className="w-full md:w-1/3">
                <Link
                  onClick={toggleBurger}
                  to={"/category/MenKits"}
                  className=" rounded-md m-2 md:py-1 md:px-1  "
                  style={{ fontFamily: 'ggg', }}
                >
                  MenKits
                </Link>
              </li>

              <li className="w-full md:w-1/3">
                <Link
                  onClick={toggleBurger}
                  to={"/category/WomanKits"}
                  className="rounded-md m-2 md:py-1 md:px-1 "
                  style={{ fontFamily: 'ggg', }}

                >
                  WomanKits
                </Link>
              </li>

              <li className="w-full">
                <Link
                  onClick={toggleBurger}
                  to={"/category/Echapes"}
                  className="rounded-md m-2 md:py-1 md:px-1"
                  style={{ fontFamily: 'ggg', }}

                >
                  Echapes
                </Link>
              </li>

              {auth.user ? (
                <li className="md:hidden w-full">
                  <button
                    onClick={() => {
                      handleLogOut();
                    }}
                    className="md:border-2 border-gray-700 bg-red-500 rounded-md m-2 md:py-2 md:px-4 py-3 px-6 hover:text-white hover:bg-red-600 transition-all duration-300 ease-in-out block"
                  >
                    Sign off
                  </button>
                </li>
              ) : (
                <li className="md:hidden w-full">
                  <Link
                    onClick={toggleBurger}
                    to={"/login"}
                    className="md:border-2 border-gray-700 bg-green-500 rounded-md m-2 md:py-2 md:px-4 py-3 px-6 hover:text-white hover:bg-green-600 transition-all duration-300 ease-in-out block"
                  >
                    Sign in
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </motion.nav>
    </nav>
  );
};

export default NavBar;
