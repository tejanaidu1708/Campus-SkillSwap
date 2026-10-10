import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Requests() {

    const studentId =
        Number(localStorage.getItem("studentId")) ||
        Number(localStorage.getItem("userId")) ||
        7;

    const [receivedRequests, setReceivedRequests] = useState([]);
    const [sentRequests, setSentRequests] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {

        try {

            setLoading(true);
            setError("");

            const receivedResponse =
                await api.get(`/requests/received/${studentId}`);

            const sentResponse =
                await api.get(`/requests/sent/${studentId}`);

            console.log(
                "Received requests:",
                receivedResponse.data
            );

            console.log(
                "Sent requests:",
                sentResponse.data
            );

            setReceivedRequests(receivedResponse.data);
            setSentRequests(sentResponse.data);

        } catch (err) {

            console.error(
                "Error loading requests:",
                err
            );

            setError(
                "Unable to load skill exchange requests."
            );

        } finally {

            setLoading(false);

        }
    };


    const acceptRequest = async (requestId) => {

        try {

            setMessage("");
            setError("");

            const response =
                await api.put(
                    `/requests/${requestId}/accept`
                );

            console.log(
                "Accepted request:",
                response.data
            );

            setMessage(
                "Skill exchange request accepted! ✅"
            );

            loadRequests();

        } catch (err) {

            console.error(
                "Error accepting request:",
                err
            );

            setError(
                "Failed to accept request."
            );
        }
    };


    const rejectRequest = async (requestId) => {

        try {

            setMessage("");
            setError("");

            const response =
                await api.put(
                    `/requests/${requestId}/reject`
                );

            console.log(
                "Rejected request:",
                response.data
            );

            setMessage(
                "Skill exchange request rejected."
            );

            loadRequests();

        } catch (err) {

            console.error(
                "Error rejecting request:",
                err
            );

            setError(
                "Failed to reject request."
            );
        }
    };


    return (

        <div className="login-container">

            <div className="login-card">

                <h1>Campus SkillSwap</h1>

                <p>Learn. Teach. Connect.</p>

                <h2>Skill Exchange Requests</h2>


                {loading && (
                    <p>Loading requests...</p>
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


                {/* RECEIVED REQUESTS */}

                <h2>Received Requests</h2>

                {!loading &&
                    receivedRequests.length === 0 && (
                        <p>
                            No received requests.
                        </p>
                    )
                }


                {!loading &&
                    receivedRequests.map((request) => (

                        <div key={request.id}>

                            <h3>
                                From:{" "}
                                {request.sender?.name ||
                                    "Unknown Student"}
                            </h3>

                            <p>
                                Email:{" "}
                                {request.sender?.email ||
                                    "N/A"}
                            </p>

                            <p>
                                Skill:{" "}
                                {request.skill?.name ||
                                    "Unknown Skill"}
                            </p>

                            <p>
                                Status:{" "}
                                {request.status}
                            </p>


                            {request.status === "PENDING" && (

                                <div>

                                    <button
                                        onClick={() =>
                                            acceptRequest(
                                                request.id
                                            )
                                        }
                                    >
                                        Accept
                                    </button>


                                    <button
                                        onClick={() =>
                                            rejectRequest(
                                                request.id
                                            )
                                        }
                                    >
                                        Reject
                                    </button>

                                </div>

                            )}

                            <hr />

                        </div>

                    ))
                }


                {/* SENT REQUESTS */}

                <h2>Sent Requests</h2>

                {!loading &&
                    sentRequests.length === 0 && (
                        <p>
                            No sent requests.
                        </p>
                    )
                }


                {!loading &&
                    sentRequests.map((request) => (

                        <div key={request.id}>

                            <h3>
                                To:{" "}
                                {request.receiver?.name ||
                                    "Unknown Student"}
                            </h3>

                            <p>
                                Email:{" "}
                                {request.receiver?.email ||
                                    "N/A"}
                            </p>

                            <p>
                                Skill:{" "}
                                {request.skill?.name ||
                                    "Unknown Skill"}
                            </p>

                            <p>
                                Status:{" "}
                                {request.status}
                            </p>

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

export default Requests;