import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaWhatsapp, FaEdit, FaPlus, FaTrash, FaCalendarAlt, FaUsers, FaMoneyCheckAlt } from 'react-icons/fa';
import './my-schools.css'; // Import CSS for styling
import { API_ROUTES } from '../app_modules/apiRoutes'; // Assuming you have defined API_ROUTES
import axios from 'axios';

const ManageSchoolPage = () => {
    const { id } = useParams(); // Assumes schoolId is passed via route params
    const [schoolData, setSchoolData] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSchoolOwnership();
    }, []);

    const checkSchoolOwnership = () => {
        const token = localStorage.getItem('token'); // Assuming token is stored in local storage
        axios.post(`${API_ROUTES.checkSchoolOwnership}`, { schoolId: id, token })
            .then(response => {
                if (response.data.message === 'Authorized') {
                    setIsAuthorized(true);
                    fetchSchoolData();
                    fetchAppointments();
                } else {
                    setIsAuthorized(false);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error checking school ownership:', error);
                setLoading(false);
            });
    };

    const fetchSchoolData = () => {
        // Fetch school details from backend
        axios.get(`${API_ROUTES.schooldetailsId}/${id}`)
            .then(response => setSchoolData(response.data))
            .catch(error => console.error('Error fetching school data:', error));
    };

    const fetchAppointments = () => {
        // Fetch appointments for the school from backend
        axios.get(`${API_ROUTES.appointments}/${id}`)
            .then(response => setAppointments(response.data))
            .catch(error => console.error('Error fetching appointments:', error));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!isAuthorized) {
        return <p>Page Restricted</p>;
    }

    if (!schoolData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="manage-school-page">
            {/* Header */}
            <div className="header">
                <Link to="/" className="back-btn"><FaArrowLeft /></Link>
                <h2>{schoolData.name}</h2>
            </div>

            {/* School Info */}
            <div className="school-info">
                <img src={`${API_ROUTES.displayImg}/${schoolData.logo_url}`} alt={schoolData.name} className="school-logo" />
                <p><strong>Address:</strong> {schoolData.address}</p>
                <p><strong>Phone:</strong> {schoolData.phone}</p>
                <p><strong>Created At:</strong> {new Date(schoolData.created_at).toLocaleDateString()}</p>
            </div>

            {/* Appointments Section */}
            <div className="section">
                <h3>Appointments</h3>
                {appointments.map(appointment => (
                    <div key={appointment.id} className="appointment-item">
                        <p><strong>Name:</strong> {appointment.name}</p>
                        <p><strong>Phone:</strong> {appointment.phone}</p>
                        <p><strong>Date:</strong> {new Date(appointment.date_slot).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {appointment.time_slot}</p>
                        <a href={`https://api.whatsapp.com/send?phone=${appointment.phone}`} target="_blank" rel="noopener noreferrer" className="whatsapp-btn"><FaWhatsapp /> Chat</a>
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="section">
                <h3>Actions</h3>
                <div className="action-buttons">
                    <button className="edit-btn"><FaEdit /> Edit</button>
                    <button className="add-classes-btn"><FaPlus /> Add Classes</button>
                    <button className="add-courses-btn"><FaPlus /> Add Courses</button>
                    <button className="view-courses-btn">Display All Courses</button>
                    <button className="delete-school-btn"><FaTrash /> Delete School</button>
                </div>
            </div>

            {/* Additional Options */}
            <div className="section">
                <h3>Additional Options for Admin</h3>
                <div className="additional-options">
                    <button className="option-btn"><FaCalendarAlt /> View Schedule</button>
                    <button className="option-btn"><FaUsers /> Manage Staff</button>
                    <button className="option-btn"><FaMoneyCheckAlt /> Financial Reports</button>
                    <button className="option-btn"><FaCalendarAlt /> Event Management</button>
                </div>
            </div>
        </div>
    );
};

export default ManageSchoolPage;