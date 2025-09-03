import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateMember from './UpdateMember';
import '../css/member.css';
import * as XLSX from 'xlsx';

const ViewRegistrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showUpdateMember, setShowUpdateMember] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const exportToExcel = () => {
        const worksheetData = registrations.map(reg => ({
            Name: reg.name,
            Branch: reg.branch,
            Year: reg.year,
            Phone: reg.mobile,
            Email: reg.mail,
            Amount: reg.amount,
            Payment_Mode: reg.paymentMode,
            Date: new Date(reg.date).toLocaleString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'ISTE_Members');

        XLSX.writeFile(workbook, `ISTE_Members.xlsx`);
    };


    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/members`);
            setRegistrations(response.data.members);
        } catch (error) {
            console.error('Error fetching registrations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (memId) => {
        if (!window.confirm('Are you sure you want to delete this Member?')) return;
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/deleteMember/${memId}`);
            setRegistrations(registrations.filter(reg => reg._id !== memId));
        } catch (error) {
            console.error('Error deleting registration:', error);
        }
    };

    const handleUpdateMember = async (reg) => {
        setSelectedMember(reg);
        setShowUpdateMember(true);
    }


    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ margin: '6rem 3rem' }}>
            <h2 className='text-center m-5'>Registrations</h2>
            <div>
                <div className='d-flex justify-content-end m-3'>
                    <button className='btn btn-success' onClick={exportToExcel}>Export to Excel</button>
                </div>
                <div className='table-responsive'>
                <table className='table table-bordered table-hover align-center'>
                    <thead className='table-light' >
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Year</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Amount</th>
                            <th>Payment_Mode</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((reg, index) => (
                            <tr key={reg._id}>
                                <td>{index + 1}</td>
                                <td>{reg.name}</td>
                                <td>{reg.branch}</td>
                                <td>{reg.year}</td>
                                <td>{reg.mobile}</td>
                                <td>{reg.mail}</td>
                                <td>{reg.amount}</td>
                                <td>{reg.paymentMode}</td>
                                {/* Add more fields as needed */}
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-primary" onClick={() => handleUpdateMember(reg)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleDelete(reg._id)} style={{ marginLeft: '8px' }}>Delete</button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                        {registrations.length === 0 && (
                            <tr>
                                <td colSpan="9" className='text-center text-danger fw-bold'>No registrations found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>


            {showUpdateMember && (
                <div className='modal-overlay'>
                    <div className='modal-content'>
                        <UpdateMember member={selectedMember} onClose={() => { setShowUpdateMember(false) }} onUpdate={fetchRegistrations} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewRegistrations;
