import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function EmployeeGO() {
    const [documents, setDocuments] = useState([]);

    const fetchDocuments = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getgo");
            setDocuments(response.data);
        } catch (error) {
            console.error("Failed to fetch documents:", error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen mt-12">
            <h2 className="text-2xl font-bold mb-4">Uploaded Documents</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100 border-b border-gray-300">
                            <th className="py-2 px-4 text-left text-gray-700">GO Number</th>
                            <th className="py-2 px-4 text-left text-gray-700">Upload Date</th>
                            <th className="py-2 px-4 text-left text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.goNumber} className="border-b border-gray-200">
                                <td className="py-2 px-4">{doc.goNumber}</td>
                                <td className="py-2 px-4">{formatDate(doc.date)}</td>
                                <td className="py-2 px-4">
                                    <a
                                        href={`http://localhost:8080/downloadgo/${doc.goNumber}`}
                                        download={`${doc.goNumber}.pdf`}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FontAwesomeIcon icon={faDownload} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
