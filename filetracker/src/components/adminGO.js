import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function AdminGO() {
    const [goNumber, setGoNumber] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [message, setMessage] = useState("");
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

    const handleFileChange = (event) => {
        setPdfFile(event.target.files[0]);
    };

    const handleGoNumberChange = (event) => {
        setGoNumber(event.target.value);
    };

    const handleDelete = async (goNumber) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete document with GO Number: ${goNumber}?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/deletego/${goNumber}`);
                setMessage("Document deleted successfully.");
                fetchDocuments();
            } catch (error) {
                console.error("Failed to delete document:", error);
                setMessage("Failed to delete document.");
            }
            setTimeout(() => setMessage(""), 3000);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("goNumber", goNumber);
        formData.append("file", pdfFile);

        try {
            const response = await axios.post("http://localhost:8080/goupload", formData);
            setMessage(response.data);
            fetchDocuments();
        } catch (error) {
            console.error("Failed to upload document:", error);
            setMessage("Failed to upload document.");
        }

        setTimeout(() => {
            setMessage("");
            setGoNumber("");
            setPdfFile(null);
        }, 3000);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen mt-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">AdminGO</h1>
            <form className="bg-white shadow-md rounded-lg p-6 mb-8 min-h-[200px]" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">GO Number:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        type="text"
                        value={goNumber}
                        onChange={handleGoNumberChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Upload PDF:</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    type="submit"
                >
                    Upload
                </button>
            </form>
            {message && <p className="text-center text-red-500 mb-4">{message}</p>}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Uploaded Documents</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
                <thead>
                    <tr className="border-b">
                        <th className="py-2 px-4 text-left text-gray-700">GO Number</th>
                        <th className="py-2 px-4 text-left text-gray-700">Upload Date</th>
                        <th className="py-2 px-4 text-left text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {documents.map((doc) => (
                        <tr key={doc.goNumber} className="border-b">
                            <td className="py-2 px-4 text-gray-800">{doc.goNumber}</td>
                            <td className="py-2 px-4 text-gray-800">{formatDate(doc.date)}</td>
                            <td className="py-2 px-4 text-gray-800">
                                <a href={`http://localhost:8080/downloadgo/${doc.goNumber}`} download={`${doc.goNumber}.pdf`} className="text-blue-500 hover:underline">
                                    <FontAwesomeIcon icon={faDownload} />
                                </a>
                                {" | "}
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDelete(doc.goNumber)}
                                    className="text-red-500 hover:text-red-700"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
