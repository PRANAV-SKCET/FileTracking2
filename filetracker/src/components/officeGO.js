import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

export default function OfficeGO() {
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
        <div className="min-h-screen bg-white">
            <div className="container mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Uploaded Documents</h2>
                <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="py-2 px-4 border-b">GO Number</th>
                            <th className="py-2 px-4 border-b">Upload Date</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {documents.map((doc) => (
                            <tr key={doc.goNumber} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b text-gray-700">{doc.goNumber}</td>
                                <td className="py-2 px-4 border-b text-gray-700">{formatDate(doc.date)}</td>
                                <td className="py-2 px-4 border-b">
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
