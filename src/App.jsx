import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Map from "./routes/Map";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
