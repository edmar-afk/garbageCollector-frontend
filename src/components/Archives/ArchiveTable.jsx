import React, { useEffect, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from "../../assets/api";
import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import { getUserInfoFromToken } from "../../utils/auth";
import Search from "../Search";
function ArchiveTable() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = files.filter((file) =>
    file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchFiles = () => {
    setLoading(true);
    api
      .get(`/api/files/archives/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch archive files", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRestore = (file) => {
    Swal.fire({
      title: "Restore this file?",
      text: "This will move the file back to active files.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, restore it",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .patch(
            `/api/files/${file.id}/unarchive/`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then(async () => {
            // ✅ Save log
            await api.post(
              "/api/upload-logs/",
              {
                info1: `${userInfo.first_name} restored the file ${file.file_name}`,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire("Restored!", "The file has been restored.", "success");
            fetchFiles();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to restore the file.", "error");
          });
      }
    });
  };

  const handleDelete = (file) => {
    Swal.fire({
      title: "Permanently delete this file?",
      text: "This action cannot be undone. The file will be removed from archive forever.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/api/files/${file.id}/delete/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(async () => {
            // ✅ Save log
            await api.post(
              "/api/upload-logs/",
              {
                info1: `${userInfo.first_name} deleted the file ${file.file_name} permanently from archives`,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire(
              "Deleted!",
              "The file has been permanently deleted.",
              "success"
            );
            fetchFiles();
          })
          .catch(() => {
            Swal.fire("Error!", "Failed to delete the file.", "error");
          });
      }
    });
  };

  return (
    <div className="w-full flex items-center justify-center min-h-full p-2">
      <div className="container">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Archived Files</h2>
            <p className="text-gray-500 mt-1">
              Manage your archived files here. You can restore them anytime or
              permanently delete them.
            </p>
            <Search name="Archives" onSearch={setSearchQuery} />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    File Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    File Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading Files...
                    </td>
                  </tr>
                ) : files.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No archived files found.
                    </td>
                  </tr>
                ) : (
                  filteredFiles.map((file) => {
                    const fileParts = file.file_name.split(".");
                    const extension =
                      fileParts.length > 1 ? fileParts.pop() : "";
                    const nameWithoutExt = fileParts.join(".");
                    return (
                      <tr
                        key={file.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <InsertDriveFileIcon className="text-blue-500" />
                            <a
                              href={file.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 text-sm font-medium text-indigo-600 hover:underline"
                            >
                              {nameWithoutExt}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {extension.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-sm">{file.file_size}</td>
                        <td className="px-6 py-4 text-sm">
                          {file.uploaded_by.first_name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {new Date(file.date_creation)
                            .toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(/^([A-Za-z]{3})/, "$1.")}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-3">
                            <Tooltip title="Restore" arrow placement="top">
                              <SettingsBackupRestoreIcon
                                className="cursor-pointer text-green-600"
                                onClick={() => handleRestore(file)} // ✅ send whole file
                              />
                            </Tooltip>
                            <Tooltip
                              title="Delete Permanently"
                              arrow
                              placement="top"
                            >
                              <DeleteForeverIcon
                                className="cursor-pointer text-red-600"
                                onClick={() => handleDelete(file)} // ✅ send whole file
                              />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchiveTable;
