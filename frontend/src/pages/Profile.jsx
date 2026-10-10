import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = localStorage.getItem("studentId");

  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");
  const [department, setDepartment] = useState(
    student?.department || ""
  );
  const [year, setYear] = useState(student?.year || "");

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!student || !studentId) {
      alert("No student is logged in.");
      navigate("/");
      return;
    }

    try {
      const response = await api.put(`/students/${studentId}`, {
        name: name,
        email: email,
        password: student.password,
        department: department,
        year: Number(year)
      });

      // Save updated student information
      localStorage.setItem(
        "student",
        JSON.stringify(response.data)
      );

      // Keep student ID
      localStorage.setItem(
        "studentId",
        response.data.id.toString()
      );

      alert("Profile updated successfully!");

    } catch (error) {
      console.error("Update failed:", error);

      if (error.response) {
        console.error(
          "Server response:",
          error.response.data
        );
      }

      alert("Profile update failed.");
    }
  };

  // Delete account
  const handleDelete = async () => {
    if (!student || !studentId) {
      alert("No student is logged in.");
      navigate("/");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/students/${studentId}`);

      // Clear login information
      localStorage.removeItem("student");
      localStorage.removeItem("studentId");

      alert("Account deleted successfully!");

      navigate("/");

    } catch (error) {
      console.error("Delete failed:", error);

      alert("Could not delete account.");
    }
  };

  // No student logged in
  if (!student || !studentId) {
    return (
      <div className="login-container">
        <div className="login-card">

          <h1>Campus SkillSwap</h1>

          <h2>No student logged in</h2>

          <button onClick={() => navigate("/")}>
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Campus SkillSwap</h1>

        <p>Manage your student profile</p>

        <h2>My Profile</h2>

        <form onSubmit={handleUpdate}>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Department */}
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />

          {/* Year */}
          <input
            type="number"
            placeholder="Year"
            min="1"
            max="4"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />

          <button type="submit">
            Update Profile
          </button>

        </form>

        <br />

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

        <br />
        <br />

        <button onClick={handleDelete}>
          Delete Account
        </button>

      </div>

    </div>
  );
}

export default Profile;