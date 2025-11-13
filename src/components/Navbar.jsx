import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex items-center justify-between py-3 px-4 sm:px-20 xl:px-32">
      {/* Logo + title */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={assets.p}
          alt="logo"
          className="w-12 sm:w-16 hover:scale-105 transition-transform duration-300"
        />
        <p className="text-lg  hover:scale-105 transition-transform duration-300 sm:text-xl font-semibold text-gray-800">
          Prixa Technology
        </p>
      </div>

      {/* Right side: either UserButton if logged in or Get Started */}
      {user ? (
        <UserButton />
      ) : (
        <button
          onClick={openSignIn} // Opens Clerk sign-in modal
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 hover:bg-blue-700 transition"
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
