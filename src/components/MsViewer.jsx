import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";

function MsViewer({ fileUrl, extension }) {
  const [open, setOpen] = useState(false);
  console.log("url of file in msviewer: ", fileUrl);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let viewerUrl = "";
  if (extension === "pdf") {
    viewerUrl = fileUrl;
  } else if (["doc", "docx", "ppt", "pptx", "xls", "xlsx"].includes(extension)) {
    viewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`;
  }

  // const handlePrint = () => {
  //   if (extension === "pdf") {
  //     const newWin = window.open(fileUrl, "_blank");
  //     newWin.focus();
  //     newWin.print();
  //   } else {
  //     const newWin = window.open(
  //       `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(fileUrl)}`,
  //       "_blank"
  //     );
  //     newWin.focus();
  //   }
  // };

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-blue-600 mx-2 hover:scale-110 duration-300 cursor-pointer"
      >
        <VisibilityIcon />
      </button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
            height: "80%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1 }}>
            {viewerUrl ? (
              <iframe
                src={viewerUrl}
                title="File Viewer"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            ) : (
              <p>Preview not available for this file type.</p>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
           
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{ width: "100px" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default MsViewer;
