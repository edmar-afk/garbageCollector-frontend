import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
