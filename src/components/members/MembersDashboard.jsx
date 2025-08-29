import { useEffect, useState } from "react";
import api from "../../assets/api";
import FolderIcon from "@mui/icons-material/Folder";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function formatDuration(dateString) {
  const now = dayjs();
  const created = dayjs(dateString);
  const diffMinutes = now.diff(created, "minute");

  const days = Math.floor(diffMinutes / (60 * 24));
  const hours = Math.floor((diffMinutes % (60 * 24)) / 60);
  const minutes = diffMinutes % 60;

  if (days > 0 && hours > 0) return `${days}d ${hours}h ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
}

function MembersDashboard() {
  const [folders, setFolders] = useState([]);
  const [fileCounts, setFileCounts] = useState({});

  useEffect(() => {
    api
      .get("/api/folders/")
      .then((res) => {
        setFolders(res.data);
        res.data.forEach((folder) => {
          api
            .get(`/api/folders/${folder.id}/count/`)
            .then((countRes) => {
              setFileCounts((prev) => ({
                ...prev,
                [folder.id]: countRes.data.file_count,
              }));
            })
            .catch((err) => {
              console.error(`Error fetching count for folder ${folder.id}`, err);
            });
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {folders.map((folder) => (
          <Link
            to={`/sb-files/${folder.id}`}
            state={{ folderName: folder.name }}
            key={folder.id}
            className="overflow-hidden shadow-lg hover:shadow-2xl duration-300 rounded-lg"
          >
            <div className="relative">
              <div className="flex items-center justify-center h-44">
                <FolderIcon
                  style={{ fontSize: "7rem" }}
                  className="text-yellow-500 mb-12"
                />
              </div>
              <div className="absolute bottom-0 left-0 bg-indigo-600 px-4 py-2 text-white text-sm">
                Uploaded by: {folder.created_by?.first_name || "Unknown"}
              </div>
            </div>

            <div className="px-6 py-4">
              <span className="font-semibold text-lg inline-block">
                {folder.name}
              </span>
            </div>

            <div className="px-6 py-4">
              <div className="py-1 text-sm text-gray-900 mr-1 flex flex-row items-center justify-between">
                <p className="ml-1">
                  {fileCounts[folder.id] !== undefined
                    ? `${fileCounts[folder.id]} file(s) inside`
                    : "Loading..."}
                </p>
                <p className="ml-2">
                  Created {formatDuration(folder.date_creation)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MembersDashboard;
