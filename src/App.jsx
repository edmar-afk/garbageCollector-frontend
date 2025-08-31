import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Homepage from "./routes/Homepage";
import Requests from "./routes/Requests";
import Profile from "./routes/Profile";
import Register from "./routes/Register";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  useEffect(() => {
    const preventZoom = (e) => {
      if (
        (e.ctrlKey && (e.key === "+" || e.key === "-" || e.key === "0")) ||
        e.ctrlKey ||
        e.metaKey
      ) {
        e.preventDefault();
      }
    };

    const preventWheelZoom = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };

    const preventGesture = (e) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", preventZoom, { passive: false });
    document.addEventListener("wheel", preventWheelZoom, { passive: false });
    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });
    document.addEventListener("gestureend", preventGesture, { passive: false });

    return () => {
      document.removeEventListener("keydown", preventZoom);
      document.removeEventListener("wheel", preventWheelZoom);
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
