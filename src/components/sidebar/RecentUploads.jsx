import React, { useEffect, useState } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Tooltip from "@mui/material/Tooltip";
import api from "../../assets/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Custom short format locale
dayjs.locale({
  name: "short-en",
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1yr",
    yy: "%dyr",
  },
});

function RecentUploads() {
  const [files, setFiles] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchRecentUploads = () => {
    setIsRefreshing(true);
    api
      .get("/api/files/recent-uploads/")
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.error("Error fetching recent uploads:", err);
      })
      .finally(() => {
        setTimeout(() => setIsRefreshing(false), 300);
      });
  };

  useEffect(() => {
    fetchRecentUploads();
  }, []);

  const formatAgo = (date) => {
    return dayjs(date).fromNow(true); // Already short from custom locale
  };

  return (
    <div className="bg-purple-950 p-3 pt-4 rounded-t-xl mt-4">
      <div className="flex items-center justify-between pb-4 border-b border-b-gray-500 text-white">
        <p className="font-semibold">Top 5 Recent Uploads</p>
        <Tooltip title="Refresh" arrow placement="top">
          <RefreshIcon
            className="cursor-pointer"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease-in-out",
              transform: isRefreshing ? "rotate(360deg)" : "rotate(0deg)",
            }}
            onClick={fetchRecentUploads}
          />
        </Tooltip>
      </div>

      <ul className="mt-6">
        {files.length > 0 ? (
          files.map((file) => (
            <li
              key={file.id}
              className="flex items-center justify-between py-3 px-2 hover:bg-purple-900/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <InsertDriveFileIcon className="bg-purple-700 p-1 text-white rounded-full" />
                <div>
                  <div className="w-[150px] overflow-hidden">
                    <p className="text-white text-sm truncate whitespace-nowrap">
                      {file.file_name || "Unnamed File"}
                    </p>
                  </div>

                  <div className="flex flex-row justify-between items-center w-full mt-1">
                    <p className="text-gray-400 text-xs leading-none">
                      {file.file_size}
                    </p>
                    <p className="text-xs text-white leading-none">
                      {file.date_creation
                        ? formatAgo(file.date_creation)
                        : "N/A"}{" "}
                      Ago
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">
            No recent uploads found
          </p>
        )}
      </ul>
    </div>
  );
}

export default RecentUploads;
