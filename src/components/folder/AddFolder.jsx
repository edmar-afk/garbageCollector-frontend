import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Fade,
  CircularProgress,
} from "@mui/material";
import api from "../../assets/api";
import { getUserInfoFromToken } from "../../utils/auth";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function AddFolder({ onFolderCreated }) {
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: "Folder name is required",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(`/api/folders/create/${userInfo.id}/`, {
        name,
      });

      // Log the folder creation
      await api.post("/api/upload-logs/", {
        info1: `${userInfo.first_name} added a folder named ${name}`,
      });

      setLoading(false);
      setName("");
      if (onFolderCreated) onFolderCreated(res.data);
      handleClose();

      Swal.fire({
        toast: true,
        position: "top",
        icon: "success",
        title: "Folder created successfully",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    } catch (err) {
      setLoading(false);
      Swal.fire({
        toast: true,
        position: "top",
        icon: "error",
        title: err.response?.data?.name || "Failed to create folder",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Create New Folder
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
        aria-labelledby="create-folder-title"
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="create-folder-title" variant="h6" mb={2}>
              Create New Folder
            </Typography>
            <TextField
              label="Folder Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={handleClose} disabled={loading}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? "Creating..." : "Create"}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
