import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Backdrop,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function PassKey() {
  const [open, setOpen] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  const handleCheck = () => {
    if (password === "capstone2025") {
      setStatus("correct");
      setCountdown(5);
    } else {
      setStatus("wrong");
    }
  };

  useEffect(() => {
    let timer;
    if (status === "correct" && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    if (countdown === 0 && status === "correct") {
      setOpen(false);
    }
    return () => clearTimeout(timer);
  }, [status, countdown]);

  return (
    <Modal
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{
        sx: {
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(0,0,0,0.4)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        {status === "correct" && (
          <Typography color="success.main" sx={{ mb: 2 }}>
            Passkey correct! Closing in {countdown}...
          </Typography>
        )}
        {status === "wrong" && (
          <Typography color="error.main" sx={{ mb: 2 }}>
            Wrong passkey, try again.
          </Typography>
        )}

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          label="Enter Passkey"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCheck();
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCheck}
          fullWidth
          sx={{ mt: 2 }}
        >
          Submit
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(-1)}
          fullWidth
          sx={{ mt: 1 }}
        >
          Go Back
        </Button>
      </Box>
    </Modal>
  );
}

export default PassKey;
