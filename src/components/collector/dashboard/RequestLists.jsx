import React, { useEffect, useState } from "react";
import api from "../../../assets/api";
import logo from "../../../assets/images/logo.png";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

function RequestLists() {
  const [requests, setRequests] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [loadingRequests, setLoadingRequests] = useState({});

  const fetchRequests = async () => {
    try {
      const response = await api.get("/api/pending-requests/");
      const requestsData = response.data;
      setRequests(requestsData);

      const profilePromises = requestsData.map((req) =>
        api.get(`/api/profile/${req.user_id}/`).then((res) => ({
          userId: req.user_id,
          profile: res.data,
        }))
      );

      const profilesData = await Promise.all(profilePromises);
      const profileMap = {};
      profilesData.forEach(({ userId, profile }) => {
        profileMap[userId] = profile;
      });
      setProfiles(profileMap);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSendSMS = async (id) => {
    setLoadingRequests((prev) => ({ ...prev, [id]: true }));

    try {
      await api.post(`/api/send-sms/${id}/`);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "📩 Garbage Picked Up, residents will be notified via SMS",
        showConfirmButton: false,
        timer: 5500,
        timerProgressBar: true,
        background: "#f0fdf4",
        color: "#15803d",
      });

      fetchRequests();
    } catch (error) {
      console.error("Failed to send SMS:", error);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "❌ Failed to mark as picked up!",
        showConfirmButton: false,
        timer: 5500,
        timerProgressBar: true,
        background: "#fef2f2",
        color: "#991b1b",
      });
    } finally {
      setLoadingRequests((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="space-y-4">
      {requests.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-4">
          🗑️ No residents have requested garbage pickup at their location.
        </p>
      ) : (
        requests.map((req) => {
          const userProfile = profiles[req.user_id];
          const profilePic = userProfile?.profile_picture || logo;

          return (
            <div
              key={req.id}
              className="flex flex-row w-full bg-white p-3 rounded-2xl shadow items-start"
            >
              <img
                src={profilePic?.replace("http://", "https://") || logo}
                onError={(e) => {
                  e.currentTarget.src = logo;
                }}
                className="w-12 h-12 rounded-full object-cover"
                alt="Profile"
              />

              <div className="flex flex-col ml-2 w-full">
                <div className="flex flex-row items-start justify-between w-full">
                  <p className="text-md font-semibold w-36">
                    {req.first_name} {req.last_name}
                  </p>
                  <button
                    onClick={() => handleSendSMS(req.id)}
                    disabled={loadingRequests[req.id]}
                    className={`text-xs p-1 rounded ${
                      loadingRequests[req.id]
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "text-blue-500 hover:underline bg-transparent"
                    }`}
                  >
                    {loadingRequests[req.id] ? (
                      <span className="flex items-center gap-1">
                        <CircularProgress size={16} color="inherit" />
                        Marking...
                      </span>
                    ) : (
                      "Mark as Picked up"
                    )}
                  </button>
                </div>
                <div className="flex flex-row items-end justify-between w-full">
                  <p className="text-xs text-gray-500  w-44">
                    {req.garbage_type || "No garbage type"}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(req.date_requested).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <p className="text-xs">{req.sacks || "No garbage type"} Sacks Total</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RequestLists;
