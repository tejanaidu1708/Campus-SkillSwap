import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";
import FindStudents from "./pages/FindStudents";
import Matches from "./pages/Matches";
import Requests from "./pages/Requests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Registration */}
        <Route path="/register" element={<Register />} />

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Student features */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/find-students" element={<FindStudents />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/requests" element={<Requests />} />

        {/* Unknown URL */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;