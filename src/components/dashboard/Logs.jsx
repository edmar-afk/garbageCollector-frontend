import React, { useEffect, useState, useRef } from "react";
import api from "../../assets/api";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const logsEndRef = useRef(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get("/api/logs/");
        if (Array.isArray(response.data)) {
          setLogs(response.data);
        } else {
          setLogs([]);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return <p className="mt-8">Loading logs...</p>;
  }

  return (
    <>
      <p className="font-bold text-xl mt-8 mb-4">System Logs</p>

      <div className="flex flex-col space-y-4 h-96 overflow-y-auto rounded-xl p-2 bg-gray-100">
        {logs.length === 0 ? (
          <p className="text-gray-500">No logs available</p>
        ) : (
          logs.map((log, index) => (
            <div
              key={log.id || index}
              className={`p-4 rounded-2xl flex flex-row items-center justify-between ${
                index % 2 === 0
                  ? "bg-purple-950 text-white"
                  : "bg-purple-200 text-black"
              }`}
            >
              <div className="flex flex-row items-center">
                <NotificationsIcon
                  className={`p-2 rounded-full ${
                    index % 2 === 0
                      ? "text-white bg-purple-800"
                      : "text-purple-800 bg-purple-200"
                  }`}
                  fontSize="large"
                />
                <div className="flex flex-col ml-2">
                  <p className="text-xs">{log.info1}</p>
                </div>
              </div>
              <p className="text-xs uppercase">{log.info2}</p>
              <p className="text-xs">{log.info3}</p>
              <div className="text-xs">{formatDate(log.log_date)}</div>
            </div>
          ))
        )}
        <div ref={logsEndRef} />
      </div>
    </>
  );
}

export default Logs;
