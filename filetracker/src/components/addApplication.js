import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import { AuthContext } from './context';

export default function AddApplication() {
    const { officeId } = useContext(AuthContext);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const [applicationData, setApplicationData] = useState({
        applicationNumber: '',
        applicantName: '',
        applicantMail: '',
        applicantMobileNumber: '',
        applicantAddress: '',
        applicationTypeId: '',
        applicationName: '',
        applicationStatus: 'opened',
        applicationDate: formatDate(new Date()),
        applicationClosedDate: ''
    });

    const [applicationTypes, setApplicationTypes] = useState([]);
    const [responseMessage, setResponseMessage] = useState(null);

    useEffect(() => {
        fetchApplicationTypes();
    }, []);

    const fetchApplicationTypes = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/getApplicationTypes/${officeId}`);
            const transformedData = response.data.map(({ applicationId, applicationName }) => ({ applicationId, applicationName }));
            setApplicationTypes(transformedData);
        } catch (error) {
            console.error('Error fetching application types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'applicationTypeId') {
            const selectedType = applicationTypes.find(type => type.applicationId === value);
            setApplicationData(prevState => ({
                ...prevState,
                [name]: value,
                applicationName: selectedType ? selectedType.applicationName : ''
            }));
        } else {
            setApplicationData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/createApplication", applicationData);
            setResponseMessage(response.data);

            setTimeout(() => {
                setResponseMessage(null);
            }, 3000);

            setApplicationData({
                applicationNumber: '',
                applicantName: '',
                applicantMail: '',
                applicantMobileNumber: '',
                applicantAddress: '',
                applicationTypeId: '',
                applicationName: '',
                applicationStatus: '',
                applicationDate: '',
                applicationClosedDate: ''
            });
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-white mt-8">
            <div className="bg-black text-white shadow-md rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4 text-white">Add Application</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField
                        select
                        label="Application Type ID"
                        variant="outlined"
                        name="applicationTypeId"
                        value={applicationData.applicationTypeId}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    >
                        {applicationTypes.map(type => (
                            <MenuItem key={type.applicationId} value={type.applicationId}>
                                {type.applicationId}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Application Name"
                        variant="outlined"
                        name="applicationName"
                        value={applicationData.applicationName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    />
                    <TextField
                        label="Application Number"
                        variant="outlined"
                        name="applicationNumber"
                        value={applicationData.applicationNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    />
                    <TextField
                        label="Applicant Name"
                        variant="outlined"
                        name="applicantName"
                        value={applicationData.applicantName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    />
                    <TextField
                        label="Applicant Email"
                        variant="outlined"
                        name="applicantMail"
                        value={applicationData.applicantMail}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    />
                    <TextField
                        label="Mobile Number"
                        variant="outlined"
                        name="applicantMobileNumber"
                        value={applicationData.applicantMobileNumber}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        name="applicantAddress"
                        value={applicationData.applicantAddress}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        InputProps={{ style: { backgroundColor: 'white', color: 'black' } }}
                        InputLabelProps={{ style: { color: 'gray' } }}
                    />
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-black text-white font-bold hover:bg-gray-600 transition-colors duration-300"
                    >
                        Submit
                    </button>
                </form>
                {responseMessage && (
                    <div className="mt-4 text-center text-green-600">
                        {responseMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
