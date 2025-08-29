import React from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function PrintModal({ open, onClose, pdfUrl }) {
  const handlePrint = () => {
    const iframe = document.getElementById("print-iframe");
    if (iframe) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(6px)", // ✅ blurred background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "90%",
          height: "90%",
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: 24,
          p: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, overflow: "hidden", borderRadius: "8px" }}>
          {pdfUrl ? (
            <iframe
              id="print-iframe"
              src={pdfUrl}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="PDF Preview"
            />
          ) : (
            <p>Loading PDF...</p>
          )}
        </Box>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handlePrint}
            sx={{ borderRadius: "8px", textTransform: "none" }}
          >
            Print
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default PrintModal;
