import React from "react";
import { Home, Description, AccountCircle } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const tabs = [
    { name: "Home", icon: <Home />, value: "/homepage" },
    { name: "Request", icon: <Description />, value: "/requests" },
    { name: "Profile", icon: <AccountCircle />, value: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 z-[9999]">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.value;
          return (
            <Link
              key={tab.value}
              to={tab.value}
              className={`inline-flex flex-col items-center justify-center px-5 group ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`mb-2 ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-green-600"
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-sm ${
                  isActive
                    ? "text-white"
                    : "text-gray-500 group-hover:text-green-600"
                }`}
              >
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
