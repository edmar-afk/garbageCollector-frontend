import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import logoImg from "../assets/images/logo.png";
import Back from "../components/Back";
import api from "../assets/api";
import { getUserInfoFromToken } from "../utils/auth";
const Login = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (e) => {
    const text = e.target.value;
    if (/^[0-9]*$/.test(text)) {
      setMobile(text);
      if (text && !text.startsWith("09")) {
        setError("Mobile number must start with 09");
      } else {
        setError("");
      }
    }
  };

  const handleLogin = async () => {
    if (!mobile || !password) {
      Swal.fire({
        position: "top-right",
        icon: "error",
        title: "Please enter mobile number and password",
        showConfirmButton: false,
        timer: 5000,
        toast: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/api/login/", {
        username: mobile,
        password: password,
      });

      localStorage.setItem("userData", JSON.stringify(response.data));

     
      Swal.fire({
        title: "Login successful!",
        html: "Redirecting in <b></b> seconds.",
        timer: 5000,
        timerProgressBar: true,
        position: "top-right",
        toast: true,
      }).then(() => {
        const userInfo = getUserInfoFromToken(response.data.access);
        if (userInfo.is_superuser) {
          navigate("/collector-homepage");
        } else {
          navigate("/homepage");
        }
      });
    } catch (err) {
      Swal.fire({
        position: "top-right",
        icon: "error",
        title: err.response?.data?.detail || "Login failed",
        showConfirmButton: false,
        timer: 3000,
        toast: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="flex flex-col bg-[#f8fafc] min-h-screen">
      <Back />
      <Box className="flex-1 flex flex-col items-center justify-center px-6">
        <Box className="items-center mb-4 text-center">
          <img
            src={logoImg}
            alt="Logo"
            className="w-20 h-20 rounded-full mx-auto"
          />
        </Box>

        <Box className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
            Welcome
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="textSecondary"
            mb={6}
          >
            Sign in to continue
          </Typography>

          <Box className="flex flex-col gap-4">
            <TextField
              label="Mobile Number"
              placeholder="09XXXXXXXXX"
              value={mobile}
              onChange={handleMobileChange}
              error={!!error}
              helperText={error}
              fullWidth
            />

            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              color="primary"
              className="mt-2"
              fullWidth
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </Box>

          <Box className="flex justify-center items-center mt-5">
            <Typography color="textSecondary">New here? </Typography>
            <Button
              color="primary"
              onClick={() => navigate("/register")}
              sx={{ textTransform: "none", fontWeight: "medium", ml: 1 }}
            >
              Create an account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
