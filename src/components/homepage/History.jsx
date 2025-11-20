import React, { useEffect, useState } from "react";
import HistoryCard from "./HistoryCard";
import { getUserInfoFromToken } from "../../utils/auth";
import api from "../../assets/api";

const History = () => {
  const token = localStorage.getItem("userData");
  const userInfo = getUserInfoFromToken(token);

  const [pendingRequests, setPendingRequests] = useState([]);
  const [successRequests, setSuccessRequests] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Ongoing"); // default tab

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const pendingRes = await api.get(`/api/pending-requests/${userInfo.id}/`);
        setPendingRequests(pendingRes.data);

        const successRes = await api.get(`/api/success-requests/${userInfo.id}/`);
        setSuccessRequests(successRes.data);
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchRequests();
  }, [userInfo.id]);

  const displayedRequests =
    selectedTab === "Ongoing" ? pendingRequests : successRequests;

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-4 mt-4">
        <p className="text-sm font-bold">Disposal History</p>
        <div className="flex flex-row items-center">
          <p
            className={`text-sm font-semibold cursor-pointer ${
              selectedTab === "Ongoing" ? "text-green-700" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Ongoing")}
          >
            Ongoing
          </p>
          <p className="mx-2 font-extralight text-2xl text-gray-300">|</p>
          <p
            className={`text-sm font-semibold cursor-pointer ${
              selectedTab === "Transported" ? "text-green-700" : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("Transported")}
          >
            Transported
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4 mb-20">
        {displayedRequests.length > 0 ? (
          displayedRequests.map((req) => (
            <HistoryCard
              key={req.id}
              date={new Date(req.date_requested).toLocaleString()}
              status={req.status}
              message={req.garbage_type}
              sacks={req.sacks}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No history available</p>
        )}
      </div>
    </div>
  );
};

export default History;
