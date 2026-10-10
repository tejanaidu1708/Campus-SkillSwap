import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    year: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/students", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      department: formData.department,
      year: Number(formData.year)
    });

    console.log("Registration successful:", response.data);

    alert("Registration successful!");

    setFormData({
      name: "",
      email: "",
      password: "",
      department: "",
      year: ""
    });

  } catch (error) {
    console.error("Registration failed:", error);
    alert("Registration failed. Please check the details.");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Campus SkillSwap</h1>
        <p>Join the student skill community</p>

        <h2>Student Registration</h2>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="College Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department (e.g. ECE)"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Year (e.g. 3)"
            value={formData.year}
            onChange={handleChange}
            min="1"
            max="4"
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="register-link">
  Already have an account? <Link to="/">Login</Link>
</p>
      </div>
    </div>
  );
}

export default Register;