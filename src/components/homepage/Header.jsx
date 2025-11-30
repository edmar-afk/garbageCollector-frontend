import React from "react";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import AlarmIcon from "@mui/icons-material/Alarm";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
const Header = () => {
  return (
    <>
      <div className="pt-12 px-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <DeleteSweepIcon fontSize="small" />
          <span className="ml-2 text-sm font-light">Garbage Collector App</span>
        </div>
        <Link to={"/logout"} className="flex flex-row items-center">
          <ExitToAppIcon fontSize="small" />
          <span className="ml-2 font-light text-sm">Logout</span>
        </Link>
      </div>

      <div className="px-4 mt-8">
        <div
          id="alert-success"
          class="relative overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-600/10 p-4 text-green-200 shadow-lg animate-[fadeIn_0.6s_ease-out]"
        >
          <div class="flex items-start gap-3">
            <div class="flex py-2 px-2 items-center justify-center rounded-full bg-green-500/20">
              <AlarmIcon
                className="text-green-900 animate-pulse"
                fontSize="small"
              />
            </div>
            <div className="">
              <p class="font-semibold text-green-900">IMPORTANT REMINDER</p>
              <div class="text-sm text-gray-900  font-extralight">
                <p>
                  Garbage collection is scheduled Every Monday @ 8:00 AM! 🚮
                  Please ensure your trash is segregated:
                </p>
                <p className="mb-6">
                  {" "}
                  - Recyclables (plastics, paper, glass)
                  <br /> - Non-recyclables (food waste, etc.)
                  <br /> - Other (hazardous materials, etc.)
                </p>
                <p className="font-semibold">
                  TRASH WILL NOT BE COLLECTED IF NOT SEGREGATED PROPERLY 🛑
                  Let's keep our community clean! 🌟
                </p>
              </div>
            </div>
          </div>
          <div class="mt-3 text-xs px-3 py-1 rounded-lg bg-green-600 hover:bg-green-500/40 transition text-text-white">
            <InfoOutlineIcon
              fontSize="small"
              className="animate-pulse text-white"
            />{" "}
            Make sure you are registered with your correct phone numbers to
            receive notifications
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
