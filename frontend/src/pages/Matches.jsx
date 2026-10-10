import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Get logged-in student ID
    const studentId =
        Number(localStorage.getItem("studentId")) ||
        Number(localStorage.getItem("userId")) ||
        7;

    // Our current learned skill is Python (skill ID 4)
    // This is the skill we want to learn from the matched student.
    const myLearnSkillId = 4;

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(`/matches/${studentId}`);

            console.log("Matches:", response.data);

            setMatches(response.data);
        } catch (err) {
            console.error("Error loading matches:", err);
            setError("Unable to load matches.");
        } finally {
            setLoading(false);
        }
    };

    const sendRequest = async (receiverId) => {
        try {
            setMessage("");
            setError("");

            console.log("Sending request:", {
                senderId: studentId,
                receiverId: receiverId,
                skillId: myLearnSkillId
            });

            const response = await api.post(
                "/requests",
                null,
                {
                    params: {
                        senderId: studentId,
                        receiverId: receiverId,
                        skillId: myLearnSkillId
                    }
                }
            );

            console.log("Request response:", response.data);

            setMessage("Skill exchange request sent successfully! ✅");

        } catch (err) {
            console.error("Error sending request:", err);

            if (err.response) {
                console.error(
                    "Backend response:",
                    err.response.data
                );
            }

            setError(
                err.response?.data?.message ||
                "Failed to send skill exchange request."
            );
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Campus SkillSwap</h1>

                <p>Learn. Teach. Connect.</p>

                <h2>My Matches</h2>

                {loading && (
                    <p>Loading matches...</p>
                )}

                {error && (
                    <p style={{ color: "red" }}>
                        {error}
                    </p>
                )}

                {message && (
                    <p style={{ color: "lightgreen" }}>
                        {message}
                    </p>
                )}

                {!loading && !error && matches.length === 0 && (
                    <p>
                        No skill matches found yet.
                    </p>
                )}

                {!loading &&
                    matches.map((student) => (

                        <div key={student.id}>

                            <h2>
                                {student.name}
                            </h2>

                            <p>
                                Email: {student.email}
                            </p>

                            <p>
                                Department: {student.department}
                            </p>

                            <p>
                                Year: {student.year}
                            </p>

                            <button
                                onClick={() =>
                                    sendRequest(student.id)
                                }
                            >
                                Send Skill Exchange Request
                            </button>

                            <hr />

                        </div>

                    ))
                }

                <br />

                <Link to="/dashboard">
                    <button>
                        Back to Dashboard
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default Matches;