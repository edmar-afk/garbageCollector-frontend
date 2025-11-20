import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import welcomeImg from "../assets/images/welcomebg.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-start min-h-screen bg-green-600 overflow-hidden">
      {/* Background Image */}
      <img
        src={welcomeImg}
        alt="Welcome"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-[45px] font-bold mt-12 ml-8 text-white">THROW</h1>
        <h1 className="text-[45px] font-extrabold text-green-500 ml-20">
          GARBAGE
        </h1>
        <h1 className="text-[45px] font-extrabold text-white ml-32">
          PROPERLY
        </h1>

        <p className="ml-8 mt-3 font-semibold text-sm text-white">
          Join us in creating a healthier Lakewood ZDS.
        </p>

        <button
          className="bg-green-700 py-3 px-8 rounded-2xl mt-12 self-center z-10 flex items-center mx-auto"
          onClick={() => navigate("/login")}
        >
          <LoginIcon style={{ color: "white", fontSize: 24 }} />
          <span className="text-white text-xl ml-3">Login</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
