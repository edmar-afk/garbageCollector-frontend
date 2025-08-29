import React, { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import api from "../../assets/api";
import { getUserInfoFromToken } from "../../utils/auth";

function RenameFolder({ folderId, onFolderRenamed, currentFolderName }) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFolderName("");
    setOpen(false);
  };

  const handleSave = async () => {
    if (!folderName.trim()) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "warning",
        title: "Folder name cannot be empty",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await api.put(`/api/folders/${folderId}/rename/`, {
        name: folderName,
      });

      // ✅ Create a log after successful rename
      await api.post("/api/upload-logs/", {
        info1: `${userInfo.first_name} renamed the folder "${currentFolderName}" to "${folderName}"`,
      });

      Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "Folder renamed successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      if (onFolderRenamed) {
        onFolderRenamed(res.data);
      }

      setLoading(false);
      handleClose();
    } catch (error) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Failed to rename folder",
        text: error.response?.data?.error || "Something went wrong",
        showConfirmButton: false,
        timer: 2000,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <p onClick={handleOpen} className="cursor-pointer">
        Edit
      </p>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 400,
          }}
        >
          <Typography variant="h6" mb={2}>
            Rename Folder
          </Typography>
          <TextField
            fullWidth
            label="New Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button onClick={handleClose} color="inherit" disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handleSave} variant="contained" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default RenameFolder;
