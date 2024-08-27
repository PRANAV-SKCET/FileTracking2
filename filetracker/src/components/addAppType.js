import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './context';

export default function AddAppType() {
    const [applicationId, setApplicationId] = useState('');
    const [applicationName, setApplicationName] = useState('');
    const [steps, setSteps] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [submitMessage, setSubmitMessage] = useState('');
    const { officeId, districtId } = useContext(AuthContext);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const response = await axios.get(`http://localhost:8080/getEmployees/${officeId}`);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error.message);
            }
        }

        fetchEmployees();
    }, [officeId]);

    const handleAddStep = () => {
        setSteps([...steps, { employeeId: '', employeeName: '', employeeDesignation: '', description: '', noOfDays: '', applicationId: applicationId, districtId: districtId, officeId: officeId }]);
    };

    const handleStepChange = (index, field, value) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    const handleEmployeeIdChange = (index, value) => {
        const employee = employees.find(emp => emp.employeeId == value);
        if (employee) {
            handleStepChange(index, 'employeeId', value);
            handleStepChange(index, 'employeeName', employee.employeeName);
            handleStepChange(index, 'employeeDesignation', employee.employeeDesignation);
        }
    };

    const handleRemoveStep = (index) => {
        const newSteps = [...steps];
        newSteps.splice(index, 1);
        setSteps(newSteps);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/saveApplicationType', {
                applicationId,
                applicationName,
                officeId,
                districtId
            });
            console.log(response.data);
            // Save application steps
            await axios.post('http://localhost:8080/saveApplicationSteps', steps);
            console.log(steps);
            setApplicationId('');
            setApplicationName('');
            setSteps([]);
            setSubmitMessage('Application created successfully');

            setTimeout(() => {
                setSubmitMessage('');
            }, 1500);
        } catch (error) {
            console.error('Error submitting application:', error.message);
        }
    };

    return (
        <div className="bg-white text-black min-h-screen flex flex-col items-center p-8 mt-10"> {/* Increased margin-top here */}
            <h1 className="text-2xl font-bold mb-8">New Application Type</h1> {/* Increased bottom margin here */}
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-black p-6 rounded-lg shadow-md mt-6"> {/* Increased margin-top here */}
                <div className="mb-6"> {/* Increased bottom margin here */}
                    <label htmlFor="applicationId" className="block text-sm font-medium mb-2 text-white">Application ID:</label>
                    <input
                        type="text"
                        id="applicationId"
                        value={applicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                        required
                        className="w-full bg-white text-black p-2 rounded"
                    />
                </div>
                <div className="mb-6"> {/* Increased bottom margin here */}
                    <label htmlFor="applicationName" className="block text-sm font-medium mb-2 text-white">Application Name:</label>
                    <input
                        type="text"
                        id="applicationName"
                        value={applicationName}
                        onChange={(e) => setApplicationName(e.target.value)}
                        required
                        className="w-full bg-white text-black p-2 rounded"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-6">Steps</h2> {/* Increased bottom margin here */}
                {steps.map((step, index) => (
                    <div className="bg-black p-4 rounded mb-6" key={index}> {/* Increased bottom margin here */}
                        <div className="mb-4">
                            <label htmlFor={`employeeId_${index}`} className="block text-sm font-medium mb-2 text-white">Employee ID:</label>
                            <select
                                id={`employeeId_${index}`}
                                value={step.employeeId}
                                onChange={(e) => handleEmployeeIdChange(index, e.target.value)}
                                className="w-full bg-white text-black p-2 rounded"
                            >
                                <option value="">Select Employee ID</option>
                                {employees.map(employee => (
                                    <option key={employee.employeeId} value={employee.employeeId}>
                                        {employee.employeeId}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`employeeName_${index}`} className="block text-sm font-medium mb-2 text-white">Employee Name:</label>
                            <input
                                type="text"
                                id={`employeeName_${index}`}
                                value={step.employeeName}
                                onChange={(e) => handleStepChange(index, 'employeeName', e.target.value)}
                                readOnly
                                className="w-full bg-white text-black p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`employeeDesignation_${index}`} className="block text-sm font-medium mb-2 text-white">Employee Designation:</label>
                            <input
                                type="text"
                                id={`employeeDesignation_${index}`}
                                value={step.employeeDesignation}
                                onChange={(e) => handleStepChange(index, 'employeeDesignation', e.target.value)}
                                readOnly
                                className="w-full bg-white text-black p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`description_${index}`} className="block text-sm font-medium mb-2 text-white">Description:</label>
                            <input
                                type="text"
                                id={`description_${index}`}
                                value={step.description}
                                onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                                className="w-full bg-white text-black p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`noOfDays_${index}`} className="block text-sm font-medium mb-2 text-white">No of Days:</label>
                            <input
                                type="text"
                                id={`noOfDays_${index}`}
                                value={step.noOfDays}
                                onChange={(e) => handleStepChange(index, 'noOfDays', e.target.value)}
                                className="w-full bg-white text-black p-2 rounded"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveStep(index)}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Remove Step
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddStep}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 mb-6"
                >
                    Add Step
                </button>
                <button
                    type="submit"
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Submit
                </button>
            </form>
            {submitMessage && <div className="mt-6 text-green-500">{submitMessage}</div>} {/* Increased top margin here */}
        </div>
    );
}
