import React, { useEffect, useState } from "react";
import StorageIcon from "@mui/icons-material/Storage";
import RefreshIcon from "@mui/icons-material/Refresh";
import api from "../../assets/api";

function Storage() {
  const [usedBytes, setUsedBytes] = useState(0);
  const [usedHuman, setUsedHuman] = useState("0 MB");
  const [loading, setLoading] = useState(false);
  const max = 500 * 1024 * 1024; // 500 MB in bytes

  const fetchStorage = () => {
    setLoading(true);
    api
      .get("/api/files/total-size/")
      .then((res) => {
        setUsedBytes(res.data.total_size_bytes);
        setUsedHuman(res.data.total_size_human);
      })
      .catch((err) => {
        console.error("Error fetching storage size:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStorage();
  }, []);

  const percent = Math.min((usedBytes / max) * 100, 100);

  return (
    <>
      <div className="mt-8">
        <div className="flex flex-row items-center mb-2">
          <StorageIcon fontSize="small" className="mr-1" />
          <p className="font-semibold text-sm">Storage</p>
        </div>

        <p className="text-xs my-1 mr-2 text-gray-600 text-right flex justify-end items-center">
          {usedHuman} of 500MB used{" "}
          <RefreshIcon
            onClick={fetchStorage}
            fontSize="small"
            className={`ml-2 mb-0.5 cursor-pointer ${
              loading ? "animate-spin text-blue-600" : "text-purple-600"
            }`}
          />
        </p>

        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(to right, #22c55e, #facc15, #ef4444)`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Storage;
