import React, { useEffect, useState } from "react";
import { getUserInfoFromToken } from "../../utils/auth";
import api from "../../assets/api";

const BASE_URL = import.meta.env.VITE_API_URL;

function Header() {
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userInfo?.id) {
      api
        .get(`/api/profile/${userInfo.id}/`)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => {
          console.error("Error fetching profile:", err);
        });
    }
  }, [userInfo?.id]);

  const profilePicUrl = profile?.profile_picture
    ? `${BASE_URL}${profile.profile_picture}`
    : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png";

  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row justify-end items-center pb-4 border-b border-b-gray-200 w-full">
        <img
          src={profilePicUrl}
          alt=""
          className="rounded-full w-8 h-8 mr-2"
        />
        <p className="text-gray-700 font-semibold">
          {userInfo?.first_name || profile?.username || "Administrator"}
        </p>
      </div>
    </div>
  );
}

export default Header;
