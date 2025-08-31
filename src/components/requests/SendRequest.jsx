import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import GarbageTypes from "./GarbageTypes";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import api from "../../assets/api";
import { getUserInfoFromToken } from "../../utils/auth";
import { useState } from "react";
import Swal from "sweetalert2";

function SendRequest({ requestLocation, locationSet, position }) {
  const token = localStorage.getItem("userData");
  const userInfo = getUserInfoFromToken(token);

  const [garbageType, setGarbageType] = useState([]);

  const handleSendRequest = async () => {
    if (!locationSet) return;

    try {
      const res = await api.post(`/api/upload-request/${userInfo.id}/`, {
        garbage_type: garbageType.join(", "),
        location: position ? `${position[0]}, ${position[1]}` : "",
      });

      Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "Pickup request sent!",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      console.log(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: "Failed to send request",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-600 p-4 rounded-t-4xl z-[9999]">
      <p className="text-sm text-white flex items-center">
        <AirportShuttleIcon className="text-white mr-2" />
        Send Garbage Pickup Request
      </p>
      <p className="text-sm text-white mt-9 text-center">
        What type of garbage would you like to dispose?
      </p>
      <p className="text-xs text-gray-200 mt-2">Select any below:</p>

      <GarbageTypes onSelect={setGarbageType} />

      <div className="flex flex-row justify-evenly mt-8">
        <button
          onClick={requestLocation}
          className="bg-white text-blue-500 py-3 text-sm px-4 rounded-lg flex items-center mr-2"
        >
          <LocationOnIcon fontSize="small" /> Locate me
        </button>

        <button
          onClick={handleSendRequest}
          className={`py-3 px-4 text-sm rounded-lg ${
            locationSet ? "bg-white text-blue-500" : "bg-red-600 text-white"
          }`}
        >
          {locationSet ? "Send Pickup Request" : "Set your Location first"}
        </button>
      </div>
    </div>
  );
}

export default SendRequest;
