import React, { useState } from "react";
import {
  Box,
  Modal,
  Button,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import api from "../../assets/api";
import mammoth from "mammoth";
import Swal from "sweetalert2";

function FileUpload({ folderId, userId, onUploadSuccess, userName }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [docxContent, setDocxContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFile(null);
    setFilePreview(null);
    setDocxContent("");
    setError(false);
    setOpen(false);
  };

  const formatSize = (bytes) => {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
};


  const handleFileSelect = async (selectedFile) => {
    setFile(selectedFile);
    setError(false);
    setFilePreview(null);
    setDocxContent("");

    if (!selectedFile) return;

    const fileType = selectedFile.type;

    if (fileType.startsWith("image/")) {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else if (fileType === "application/pdf") {
      setFilePreview(URL.createObjectURL(selectedFile));
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const result = await mammoth.extractRawText({ arrayBuffer });
      setDocxContent(result.value);
    } else if (
      fileType.includes("presentation") ||
      fileType.includes("spreadsheet")
    ) {
      setDocxContent("Preview not available for this file type.");
    } else {
      setDocxContent("Preview not available for this file type.");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async () => {
    if (!file) {
      setError(true);
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("file_name", file.name);

    try {
      await api.post(`/api/file/${folderId}/upload/${userId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ✅ Log after successful upload
      const extension = file.name.split(".").pop();
      const fileSize = formatSize(file.size);

      await api.post("/api/upload-logs/", {
        info1: `${userName} uploaded a file named "${file.name}"`,
        info2: extension,
        info3: fileSize,
      });

      if (typeof onUploadSuccess === "function") {
        onUploadSuccess();
      }

      Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "File uploaded successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      handleClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: "File upload failed",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Upload File
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "60%" },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Upload File</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <label
            htmlFor="uploadFile1"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={`bg-white font-semibold text-base rounded w-full h-96 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed mx-auto mt-6 ${
              error
                ? "border-red-500 text-red-500"
                : "border-gray-300 text-slate-500"
            }`}
          >
            {filePreview && file?.type === "application/pdf" ? (
              <iframe
                src={filePreview}
                className="w-full h-full"
                title="PDF Preview"
              />
            ) : filePreview && file?.type.startsWith("image/") ? (
              <img
                src={filePreview}
                alt="Preview"
                className="max-h-80 object-contain"
              />
            ) : docxContent ? (
              <div className="overflow-auto p-2 text-sm max-h-80">
                {docxContent}
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-3"
                  fill={error ? "red" : "gray"}
                  viewBox="0 0 32 32"
                >
                  <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                  <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                </svg>
                {error
                  ? "Please upload file first"
                  : "Drag & drop or click to upload"}
              </>
            )}
            <input
              type="file"
              id="uploadFile1"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {file && (
            <p className="pt-3 italic">
              You are about to upload{" "}
              <span className="font-bold text-purple-700 not-italic">
                {file.name}
              </span>
            </p>
          )}

          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Upload"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default FileUpload;
