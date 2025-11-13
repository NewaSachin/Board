import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const handleClick = (path) => {
    if (user) {
      navigate(path); // user logged in → go to Kanban
    } else {
      openSignIn(); // not logged in → open Clerk sign-in
    }
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      <div className="text-center mb-6">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold mx-auto leading-tight">
          Build Your Own
        </p>

        <h1
          className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-tight whitespace-nowrap overflow-hidden border-r-2 border-black animate-typing mt-2"
          style={{
            animation:
              "typing 4s steps(30,end) infinite alternate, blink .75s step-end infinite",
          }}
        >
          <span className="text-primary">Interactive Kanban Board</span>
        </h1>

        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-gray-600 max-sm:text-sm">
          Organize tasks, manage projects, and visualize workflows with a
          modern, responsive Trello-style Kanban board built in React.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        {/* FIXED: Use handleClick to check login */}
        <button
          onClick={() => handleClick("/kanban")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
