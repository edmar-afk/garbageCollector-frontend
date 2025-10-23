import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import logoImg from "../assets/images/logo.png";
import Back from "../components/Back";
import api from "../assets/api";

const Register = () => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMobileChange = (e) => {
    const text = e.target.value;
    if (/^[0-9]*$/.test(text) && text.length <= 11) {
      setMobile(text);
      if (text.length === 11) {
        if (!text.startsWith("09")) {
          setError("Mobile number must start with 09");
        } else {
          setError("");
        }
      } else if (text.length > 0) {
        setError("Mobile number must be 11 digits");
      } else {
        setError("");
      }
    }
  };

  const handleProfileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleRegister = async () => {
    if (!mobile || !password || !!error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill all fields correctly",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    setLoading(true); // start loading
    const formData = new FormData();
    formData.append("username", mobile);
    formData.append("first_name", fullName);
    formData.append("last_name", address);
    formData.append("password", password);
    if (profilePicture) formData.append("profile_picture", profilePicture);

    try {
      await api.post("/api/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Registration successful!",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });

      setTimeout(() => navigate("/login"), 5000);
    } catch (err) {
      console.error(err);
      let message = "Registration failed!";

      if (err.response && err.response.data) {
        if (
          err.response.data.username &&
          err.response.data.username[0].includes("already exists")
        ) {
          message = "User with the same mobile number already exists";
        } else {
          message = Object.values(err.response.data).flat().join(" ");
        }
      }

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: message,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Box className="flex flex-col bg-[#f8fafc] min-h-screen mt-24">
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
            Create Account
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="textSecondary"
            mb={6}
          >
            Register to continue
          </Typography>

          <Box className="flex flex-col gap-4">
            <TextField
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
            />

            <TextField
              label="Mobile Number"
              placeholder="09XXXXXXXXX"
              value={mobile}
              onChange={handleMobileChange}
              error={!!error}
              helperText={error}
              fullWidth
              inputProps={{ maxLength: 11 }}
            />

            <TextField
              label="Address"
              placeholder="Your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

            <Button variant="contained" component="label">
              Upload Profile Picture
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleProfileChange}
              />
            </Button>

            <Button
              variant="contained"
              color="primary"
              className="mt-2"
              fullWidth
              onClick={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={20}
                    color="inherit"
                    className="mr-2"
                  />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </Box>

          <Box className="flex justify-center items-center mt-5">
            <Typography color="textSecondary">
              Already have an account?{" "}
            </Typography>
            <Button
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ textTransform: "none", fontWeight: "medium", ml: 1 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
