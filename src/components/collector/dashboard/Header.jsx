import React, { useEffect, useState } from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import TrashCounts from "../TrashCounts";
import api from "../../../assets/api";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import garbagebg from "../../../assets/images/garbagebg.png";
import RefreshIcon from "@mui/icons-material/Refresh";

const Header = () => {
  const [garbageData, setGarbageData] = useState([]);
  const [totalPicked, setTotalPicked] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const garbageTypes = [
    "biodegradable",
    "nonbiodegradable",
    "recyclable",
    "residual",
    "hazardous",
    "ewaste",
    "liquid",
    "construction",
  ];

  const fetchGarbageCounts = async () => {
    try {
      setIsRefreshing(true);
      const response = await api.get("/api/garbage-counts/");
      const data = Array.isArray(response.data) ? response.data : [];

      const mergedData = garbageTypes.map((type) => {
        const found = data.find(
          (item) => item.garbage_type.toLowerCase().replace(/\s/g, "") === type
        );
        return {
          garbage_type: type,
          count: found ? found.count : 0,
        };
      });

      const total = mergedData.reduce((sum, item) => sum + item.count, 0);
      setGarbageData(mergedData);
      setTotalPicked(total);
    } catch (error) {
      console.error("Error fetching garbage counts:", error);
      const fallbackData = garbageTypes.map((type) => ({
        garbage_type: type,
        count: 0,
      }));
      setGarbageData(fallbackData);
      setTotalPicked(0);
    } finally {
      setTimeout(() => setIsRefreshing(false), 600);
    }
  };

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const formattedWithPeriod = formattedDate.replace(
      /^([A-Za-z]+)\s/,
      (match, month) => month + ". "
    );
    setCurrentDate(formattedWithPeriod);

    fetchGarbageCounts();
  }, []);

  return (
    <div className="bg-green-800 text-white pt-12 pb-24 px-4 relative">
      <img
        src={garbagebg}
        className="absolute w-82 -top-4 -right-7 opacity-50"
        alt=""
      />
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <DeleteSweepIcon fontSize="small" />
          <span className="ml-2 text-sm font-light">Garbage Collector App</span>
        </div>
        <Link to={"/logout"} className="flex flex-row items-center z-[50]">
          <ExitToAppIcon fontSize="small" />
          <span className="ml-2 font-light text-sm">Logout</span>
        </Link>
      </div>

      <div className="mt-8">
        <div className="flex flex-row items-center justify-between">
          <p className="text-3xl">{totalPicked}</p>
          <p className="text-xs flex flex-row items-center">
            <CalendarMonthIcon fontSize="small" className="mb-1" /> As of{" "}
            {currentDate}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs w-44">
            <b className="text-sm text-green-300">Total</b> garbage disposal has
            been picked up
          </p>
          <button
            onClick={fetchGarbageCounts}
            className="flex flex-row items-center text-xs hover:text-green-300 transition z-50"
          >
            <RefreshIcon
              fontSize="small"
              className={`mb-0.5 transition-transform duration-500 ${
                isRefreshing ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-4 absolute left-4 right-4">
        <p className="text-xs font-extralight text-right mb-1">
          Swipe left/right to view
        </p>
        <div className="flex flex-row space-x-4 overflow-x-auto pb-4 no-scrollbar">
          {garbageData.map((item, index) => (
            <TrashCounts
              key={index}
              garbageType={item.garbage_type}
              count={item.count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
