import React, { useEffect, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from "../../assets/api";
import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import ConfidentialFileUpload from "./ConfidentialFileUpload";
import Search from "../Search";
import PassKey from "./PassKey";

function ConfidentialTable() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFiles = files.filter((file) =>
    file.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchFiles = () => {
    setLoading(true);
    api
      .get(`/api/file/confidential/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch confidential files", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (fileId) => {
    Swal.fire({
      title: "Permanently delete this confidential file?",
      text: "This action cannot be undone. The file will be removed forever.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/api/confidential-files/${fileId}/delete/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            Swal.fire({
              toast: true,
              position: "top",
              icon: "success",
              title: "The confidential file has been permanently deleted.",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
            fetchFiles();
          })
          .catch(() => {
            Swal.fire({
              toast: true,
              position: "top",
              icon: "error",
              title: "Failed to delete the confidential file.",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            });
          });
      }
    });
  };

  return (
    <>
    <PassKey/>
      <div className="w-full flex items-center justify-center min-h-full p-2">
        <div className="container">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="">
                  <h2 className="text-xl font-bold text-gray-800">
                    Confidential Files
                  </h2>
                  <p className="text-red-600 mt-1 text-sm w-full sm:w-[70%] font-extralight">
                    Warning: Confidential files are strictly managed. Deleting a
                    file will permanently remove it, it will not be archived,
                    and it cannot be restored. Proceed with caution.
                  </p>
                </div>
                <ConfidentialFileUpload onUploadSuccess={fetchFiles} />
              </div>
              <Search name="Confidential File" onSearch={setSearchQuery} />
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
                        Loading Confidential Files...
                      </td>
                    </tr>
                  ) : files.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No confidential files found.
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
                          <td className="px-6 py-4 text-sm">
                            {file.file_size_human}
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
                              <Tooltip
                                title="Delete Permanently"
                                arrow
                                placement="top"
                              >
                                <DeleteForeverIcon
                                  className="cursor-pointer text-red-600"
                                  onClick={() => handleDelete(file.id)}
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
    </>
  );
}

export default ConfidentialTable;
