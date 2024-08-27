import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./context";

export default function RejectedApplications() {
    const { officeId } = useContext(AuthContext);
    const [rejectedApplications, setRejectedApplications] = useState([]);

    const fetchRejectedApplications = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getRejectedApplications/${officeId}`);
            setRejectedApplications(response.data);
        } catch (error) {
            console.error("Failed to fetch rejected applications:", error);
        }
    };

    useEffect(() => {
        fetchRejectedApplications();
    }, [officeId]);

    const handleReopen = async (applicationNumber) => {
        try {
            await axios.post(`http://localhost:8080/reopenApplication/${applicationNumber}`);
            fetchRejectedApplications();
        } catch (error) {
            console.error("Failed to reopen application:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Rejected Applications</h1>
            {rejectedApplications.length > 0 ? (
                <ul className="space-y-4">
                    {rejectedApplications.map((application, index) => (
                        <li key={index} className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                            <p><strong>Application Number: </strong> {application.applicationNumber}</p>
                            <p><strong>Date of Rejection: </strong> {application.dateOfRejection}</p>
                            <p><strong>Rejected By: </strong> {application.employeeId}</p>
                            <p><strong>Reason for Rejection: </strong> {application.reasonForRejection}</p>
                            <button
                                onClick={() => handleReopen(application.applicationNumber)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Reopen
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No rejected applications found.</p>
            )}
        </div>
    );
}
