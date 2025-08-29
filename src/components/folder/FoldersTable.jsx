import React, { useEffect, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import AddFolder from "./AddFolder";
import api from "../../assets/api";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import RenameFolder from "./RenameFolder";
import { getUserInfoFromToken } from "../../utils/auth";
import Search from "../Search";
function FoldersTable() {
  const [folders, setFolders] = useState([]);
  const [fileCounts, setFileCounts] = useState({});
  const [folderSizes, setFolderSizes] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              [folder.id]: sizeRes.data.total_size_bytes, // raw bytes
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

  const handleDelete = (id, folderName) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this folder will permanently remove all files inside.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/api/folders/${id}/delete/`)
          .then(async () => {
            setFolders((prev) => prev.filter((folder) => folder.id !== id));
            setFileCounts((prev) => {
              const newCounts = { ...prev };
              delete newCounts[id];
              return newCounts;
            });
            setFolderSizes((prev) => {
              const newSizes = { ...prev };
              delete newSizes[id];
              return newSizes;
            });

            await api.post("/api/upload-logs/", {
              info1: `${userInfo.first_name} deleted the folder "${folderName}"`,
            });

            Swal.fire({
              toast: true,
              position: "top",
              icon: "success",
              title: "Folder deleted successfully",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          })
          .catch(() => {
            Swal.fire({
              toast: true,
              position: "top",
              icon: "error",
              title: "Failed to delete folder",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          });
      }
    });
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const handleFolderCreated = (newFolder) => {
    setFolders((prev) => [newFolder, ...prev]);
  };

  return (
    <div className="w-full flex items-center justify-center min-h-full p-2">
      <div className="container">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Folders</h2>
                <p className="text-gray-500 mt-1">Manage your Folders here.</p>
              </div>
              <AddFolder onFolderCreated={handleFolderCreated} />
            </div>

            <Search name="Folder" onSearch={setSearchQuery} />

          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folder Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Folder Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contains
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading folders...
                    </td>
                  </tr>
                ) : folders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No folders found.
                    </td>
                  </tr>
                ) : (
                  filteredFolders.map((folder) => (
                    <tr
                      key={folder.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/open-folder/${folder.id}`}
                          state={{ folderName: folder.name }}
                        >
                          <div className="flex items-center">
                            <FolderIcon
                              className="text-yellow-500"
                              fontSize="large"
                            />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {folder.name}
                              </div>
                              <div className="text-xs font-medium text-gray-400">
                                Created by {folder.created_by.first_name}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {folderSizes[folder.id] !== undefined
                            ? formatSize(folderSizes[folder.id])
                            : "0 B"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {fileCounts[folder.id] !== undefined
                            ? fileCounts[folder.id]
                            : "No"}{" "}
                          Files
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(folder.date_creation)
                            .toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(/^([A-Za-z]{3})/, "$1.")}
                        </div>
                      </td>
                      <td className="flex flex-row  items-center justify-end px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <RenameFolder
                          currentFolderName={folder.name}
                          folderId={folder.id}
                          onFolderRenamed={(updatedFolder) =>
                            setFolders((prev) =>
                              prev.map((f) =>
                                f.id === updatedFolder.id ? updatedFolder : f
                              )
                            )
                          }
                        />

                        <button
                          onClick={() => handleDelete(folder.id, folder.name)}
                          className="text-red-600 hover:text-red-900 cursor-pointer ml-3"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoldersTable;
