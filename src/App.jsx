import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Map from "./routes/Map";
import Welcome from "./routes/Welcome";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
