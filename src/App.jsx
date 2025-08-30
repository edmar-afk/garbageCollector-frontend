import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Map from "./routes/Map";
import Welcome from "./routes/Welcome";
import Login from "./routes/Login";
import Homepage from "./routes/Homepage";
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
        <Route path="/logout" element={<Logout />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
