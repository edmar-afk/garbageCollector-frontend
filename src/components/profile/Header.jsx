import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="pt-12 px-4 flex flex-row items-center justify-between">
      <div className="flex flex-row items-center">
        <AccountCircleIcon fontSize="small" />
        <span className="ml-2 text-sm font-light">Welcome to your Profile</span>
      </div>
      <Link to={"/logout"} className="flex flex-row items-center">
        <ExitToAppIcon fontSize="small" />
        <span className="ml-2 font-light text-sm">Logout</span>
      </Link>
    </div>
  );
};

export default Header;
