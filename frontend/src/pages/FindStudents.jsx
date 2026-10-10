import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function FindStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Failed to load students:", error);
      alert("Could not load students.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Campus SkillSwap</h1>
        <p>Find students and exchange skills</p>

        <h2>Find Students</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div>
            {students.map((student) => (
              <div key={student.id}>
                <h3>{student.name}</h3>

                <p>
                  {student.department} | Year {student.year}
                </p>

                <p>{student.email}</p>

                <hr />
              </div>
            ))}
          </div>
        )}

        <br />

        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>

      </div>
    </div>
  );
}

export default FindStudents;