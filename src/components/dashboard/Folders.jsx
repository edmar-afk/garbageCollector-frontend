import cursorBg from "../../assets/images/cursor.png";
import api from "../../assets/api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Folders() {
  const [folders, setFolders] = useState([]);
  const [fileCounts, setFileCounts] = useState({});
  const [folderSizes, setFolderSizes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = () => {
    setLoading(true);
    api
      .get("/api/folders/")
      .then((res) => {
        setFolders(res.data);
        setLoading(false);

        res.data.forEach((folder) => {
          api.get(`/api/folders/${folder.id}/count/`).then((countRes) => {
            setFileCounts((prev) => ({
              ...prev,
              [folder.id]: countRes.data.file_count,
            }));
          });

          api.get(`/api/folders/${folder.id}/total-size/`).then((sizeRes) => {
            setFolderSizes((prev) => ({
              ...prev,
              [folder.id]: sizeRes.data.total_size_bytes,
            }));
          });
        });
      })
      .catch((err) => {
        console.error("Failed to fetch folders", err);
        setLoading(false);
      });
  };

  const formatSize = (bytes) => {
    if (!bytes) return "0 B";
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading folders...</p>;
  }

  return (
    <div className="flex flex-wrap justify-evenly">
      {folders.map((folder) => (
        <Link to={`/open-folder/${folder.id}`}
                          state={{ folderName: folder.name }}
          key={folder.id}
          className="duration-300 cursor-pointer bg-white hover:bg-purple-950 shadow-sm w-[300px] border-2 border-gray-200 hover:border-purple-200 rounded-2xl mx-2 group mb-4"
        >
          <div className="flex items-center justify-between">
            <p className="font-semibold truncate text-sm bg-gray-200 py-3 px-12 rounded-tl-2xl rounded-br-2xl shadow-[inset_-5px_-5px_5px_rgba(0,0,0,0.1)] group-hover:shadow-[inset_-5px_-5px_5px_rgba(255,255,255,0.1)] group-hover:text-white group-hover:bg-purple-900 w-38">
              {folder.name}
            </p>

            <p className="text-gray-400 text-xs mr-10 group-hover:text-white">
              {fileCounts[folder.id] ?? 0} files
            </p>
          </div>

          <div className="mt-4 px-4 flex flex-row items-center justify-between relative">
            <div>
              <p className="text-gray-500 text-xs mb-2 group-hover:text-white">
                Created by:
              </p>
              <div className="flex items-center">
                <img
                  src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                  alt="User"
                  draggable="false"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <div className="flex items-center justify-center text-xs font-medium text-gray-600 ml-2 group-hover:text-white">
                  {folder.created_by?.first_name
                    ? `${folder.created_by.first_name} ${folder.created_by.last_name}`
                    : "Unknown"}
                </div>
              </div>
            </div>

            <img
              src={cursorBg}
              alt=""
              draggable="false"
              className="w-24 absolute -top-3 right-5"
            />
          </div>

          <div className="mt-6 pb-3 flex items-center justify-between text-gray-400 text-xs px-4 group-hover:text-white">
            <p>
              Created{" "}
              {folder.date_creation
                ? new Date(folder.date_creation)
                    .toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })
                    .replace(",", ".") // replaces the comma after the date with a period
                : "N/A"}
            </p>

            <p>{formatSize(folderSizes[folder.id])}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Folders;
