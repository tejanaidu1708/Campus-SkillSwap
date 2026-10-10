import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Skills() {
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student"));
  const studentId = localStorage.getItem("studentId");

  const [skills, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skillType, setSkillType] = useState("TEACH");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // Load the logged-in student's skills
  const loadSkills = async () => {
    if (!student || !studentId) {
      setLoading(false);
      navigate("/");
      return;
    }

    try {
      const response = await api.get(
        `/student-skills/student/${studentId}`
      );

      setSkills(response.data);
    } catch (err) {
      console.error("Failed to load skills:", err);
      setError("Could not load your skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // Add a skill
  const handleAddSkill = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!student || !studentId) {
      setError("Please log in before adding skills.");
      navigate("/");
      return;
    }

    const trimmedSkillName = skillName.trim();

    if (!trimmedSkillName) {
      setError("Please enter a skill name.");
      return;
    }

    try {
      setSaving(true);

      // Get all available skills
      const skillsResponse = await api.get("/skills");

      // Find the existing skill, ignoring letter case
      let existingSkill = skillsResponse.data.find(
        (skill) =>
          skill.name?.trim().toLowerCase() ===
          trimmedSkillName.toLowerCase()
      );

      // Create the skill if it does not exist
      if (!existingSkill) {
        const newSkillResponse = await api.post("/skills", {
          name: trimmedSkillName
        });

        existingSkill = newSkillResponse.data;
      }

      // Prevent duplicate skill + type combinations
      const alreadyExists = skills.some(
        (studentSkill) =>
          Number(studentSkill.skill?.id) ===
            Number(existingSkill.id) &&
          studentSkill.type === skillType
      );

      if (alreadyExists) {
        setError(
          `You have already added "${existingSkill.name}" as ${
            skillType === "TEACH" ? "I can Teach" : "I want to Learn"
          }.`
        );
        return;
      }

      // Save the skill for the logged-in student
      await api.post("/student-skills", {
        student: {
          id: Number(studentId)
        },
        skill: {
          id: existingSkill.id
        },
        type: skillType
      });

      setMessage("Skill added successfully!");
      setSkillName("");
      setSkillType("TEACH");

      // Refresh the skill list
      await loadSkills();
    } catch (err) {
      console.error("Failed to add skill:", err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Could not add skill. Please try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  // Remove a skill
  const handleDeleteSkill = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this skill?"
    );

    if (!confirmed) {
      return;
    }

    setMessage("");
    setError("");

    try {
      await api.delete(`/student-skills/${id}`);

      setMessage("Skill removed successfully!");

      await loadSkills();
    } catch (err) {
      console.error("Failed to remove skill:", err);
      setError("Could not remove the skill. Please try again.");
    }
  };

  // Login validation
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

        <p>Learn. Teach. Connect.</p>

        <h2>My Skills</h2>

        <p>
          Logged in as: <strong>{student.name}</strong>
        </p>

        {/* Success message */}
        {message && (
          <p style={{ color: "green" }}>
            {message}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Add Skill Form */}
        <form onSubmit={handleAddSkill}>
          <input
            type="text"
            placeholder="Enter skill (e.g. Java)"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            required
          />

          <select
            value={skillType}
            onChange={(e) => setSkillType(e.target.value)}
          >
            <option value="TEACH">
              I can Teach
            </option>

            <option value="LEARN">
              I want to Learn
            </option>
          </select>

          <button type="submit" disabled={saving}>
            {saving ? "Adding..." : "Add Skill"}
          </button>
        </form>

        <hr />

        <h3>My Current Skills</h3>

        {loading ? (
          <p>Loading skills...</p>
        ) : skills.length === 0 ? (
          <p>You haven't added any skills yet.</p>
        ) : (
          skills.map((studentSkill) => (
            <div key={studentSkill.id}>
              <p>
                <strong>
                  {studentSkill.skill?.name || "Unknown Skill"}
                </strong>

                {" — "}

                {studentSkill.type === "TEACH"
                  ? "I can Teach"
                  : "I want to Learn"}
              </p>

              <button
                onClick={() => handleDeleteSkill(studentSkill.id)}
              >
                Remove
              </button>

              <hr />
            </div>
          ))
        )}

        <br />

        <button onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default Skills;