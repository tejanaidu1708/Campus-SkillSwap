import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/students/login", {
        email: email,
        password: password
      });

      console.log("Login successful:", response.data);

      // Get logged-in student
      const student = response.data;

      // Store complete student information
      localStorage.setItem(
        "student",
        JSON.stringify(student)
      );

      // Store student ID separately
      localStorage.setItem(
        "studentId",
        student.id.toString()
      );

      console.log("Logged-in student ID:", student.id);

      alert("Login successful!");

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login failed:", error);

      if (error.response) {
        console.error("Server response:", error.response.data);

        if (error.response.status === 401) {
          alert("Invalid email or password");
        } else {
          alert("Login failed. Please try again.");
        }
      } else {
        alert("Unable to connect to the server");
      }
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Campus SkillSwap</h1>

        <p>Learn. Teach. Connect.</p>

        <h2>Student Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="College Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;