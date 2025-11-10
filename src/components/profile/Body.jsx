import { useEffect, useRef, useState } from "react";
import { getUserInfoFromToken } from "../../utils/auth";
import api from "../../assets/api";
import logo from "../../assets/images/logo.png";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function Body() {
  const token = localStorage.getItem("userData");
  const userInfo = getUserInfoFromToken(token);

  const [profile, setProfile] = useState(null);
  const [requestCount, setRequestCount] = useState(0);
  const fileInputRef = useRef(null);
  console.log(profile);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/api/profile/${userInfo.id}/`);
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchRequestCount = async () => {
      try {
        const res = await api.get(`/api/request-count/${userInfo.id}/`);
        setRequestCount(res.data.request_count);
      } catch (err) {
        console.error("Error fetching request count:", err);
      }
    };

    if (userInfo?.id) {
      fetchProfile();
      fetchRequestCount();
    }
  }, [userInfo?.id]);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      await api.put(`/api/update-profile-picture/${userInfo.id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Refresh profile after upload
      const res = await api.get(`/api/profile/${userInfo.id}/`);
      setProfile(res.data);
    } catch (err) {
      console.error("Error uploading profile picture:", err);
    }
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="p-4 mt-4">
      <div className="relative w-fit mb-6">
        <img
          src={
            profile.profile_picture.startsWith("http")
              ? profile.profile_picture.replace("http://", "https://")
              : profile.profile_picture
          }
          onError={(e) => {
            e.currentTarget.src = logo;
          }}
          alt="Profile"
          className="w-52 h-52 rounded-full mt-2 object-cover"
        />

        <button
          type="button"
          onClick={handleIconClick}
          className="absolute bottom-2 right-2 bg-blue-600 p-3 rounded-full"
        >
          <PhotoCameraIcon className="text-white" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <p className="text-4xl font-extrabold text-gray-800">
        {userInfo.first_name}
      </p>
      <div className="flex items-center justify-start gap-5 mt-8">
        <p className="font-bold text-xs bg-blue-600 text-white py-2 px-4 rounded-md flex items-center">
          <LocalPhoneIcon fontSize="small" />
          {profile.username}
        </p>
        <p className="text-xs bg-blue-600 text-white py-2 px-4 rounded-md flex items-center">
          <LocationOnIcon fontSize="small" />
          {userInfo.last_name}
        </p>
      </div>
      <p className="mt-6 text-gray-700 font-semibold">
        You disposed <span className="text-blue-600">{requestCount}</span>{" "}
        request(s) you since joined us. Keep our community clean and safe!
      </p>
    </div>
  );
}

export default Body;
