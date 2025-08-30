import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import welcomeImg from "../assets/images/welcome.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-start bg-[#17b9d6] min-h-screen">
      <h1 className="text-[45px] font-bold mt-12 ml-8 text-white">THROW</h1>
      <h1 className="text-[45px] font-extrabold text-[#5a17d6] ml-20">GARBAGE</h1>
      <h1 className="text-[45px] font-extrabold text-white ml-32">PROPERLY</h1>
      <p className="ml-8 mt-3 font-semibold text-sm text-white">
        Join us in creating a healthier Lakewood ZDS.
      </p>

      <button
        className="bg-blue-700 py-3 px-8 rounded-2xl mt-12 self-center z-[9999] flex items-center"
        onClick={() => navigate("/login")}
      >
        <LoginIcon style={{ color: "white", fontSize: 24 }} />
        <span className="text-white text-xl ml-3">Login</span>
      </button>

      <img
        src={welcomeImg}
        alt="Welcome"
        className="w-[480px] h-full rounded-2xl object-contain"
      />
    </div>
  );
};

export default Welcome;
