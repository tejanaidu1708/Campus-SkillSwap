import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = localStorage.getItem("studentId");

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("studentId");

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1>Campus SkillSwap</h1>

        <p>Learn. Teach. Connect.</p>

        <h2>Welcome 👋</h2>

        {student ? (
          <>
            <h3>{student.name}</h3>

            <p>
              {student.department} | Year {student.year}
            </p>

            <p>{student.email}</p>

            <p>
              Student ID: {studentId}
            </p>
          </>
        ) : (
          <p>Welcome, Student!</p>
        )}

        <hr />

        <h2>What would you like to do?</h2>

        <div>

          <Link to="/profile">
            <button>My Profile</button>
          </Link>

          <Link to="/skills">
            <button>My Skills</button>
          </Link>

          <Link to="/find-students">
            <button>Find Students</button>
          </Link>

          <Link to="/matches">
            <button>My Matches</button>
          </Link>

          <Link to="/requests">
            <button>Requests</button>
          </Link>

        </div>

        <br />

        <button onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;