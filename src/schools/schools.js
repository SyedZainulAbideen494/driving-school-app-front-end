import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaLink } from 'react-icons/fa';
import './schools.css'; // Import CSS for styling (create this file)
import { API_ROUTES } from '../app_modules/apiRoutes';
import { useParams } from 'react-router-dom';
const Schools = () => {
    const [schoolDetails, setSchoolDetails] = useState(null);
    const params = useParams()
    const schoolId = params.id; // Replace with the school ID you want to fetch

    useEffect(() => {
        axios.get(`${API_ROUTES.schooldetailsId}/${schoolId}`)
            .then(response => {
                setSchoolDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [schoolId]);

    const handleWhatsAppClick = () => {
        // Replace with actual WhatsApp integration logic
        window.open(`https://wa.me/${schoolDetails.phone}`, '_blank');
    };

    if (!schoolDetails) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="school-details">
            {/* Header */}
            <div className="header">
                <div className="back-btn">
                    <FaArrowLeft />
                </div>
                <div className="school-title">
                    <h4 style={{color: 'black'}}>{schoolDetails.name}</h4>
                    <div className="rating">
                        <FaStar /> {schoolDetails.rating}
                    </div>
                </div>
            </div>
            
            {/* Banner */}
            <div className="banner">
                <img src={`${API_ROUTES.displayImg}/${schoolDetails.logo_url}`} alt={`${schoolDetails.name} Logo`} />
            </div>
            
            {/* Details Container */}
            <div className="details-container">
                {/* Location */}
                <div className="location">
                    <FaMapMarkerAlt /> {schoolDetails.address}, {schoolDetails.city}, {schoolDetails.state} {schoolDetails.zip_code}, {schoolDetails.country}
                </div>
                
                {/* Contact */}
                <div className="contact">
                    <div className="contact-item">
                        <FaPhoneAlt /> {schoolDetails.phone}
                    </div>
                    <div className="contact-item">
                        <FaEnvelope /> {schoolDetails.email}
                    </div>
                    <div className="contact-item" onClick={handleWhatsAppClick}>
                        <FaWhatsapp /> Chat on WhatsApp
                    </div>
                    <div className="contact-item">
                        <FaLink /> <a href={schoolDetails.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
                    </div>
                </div>
                
                {/* Description */}
                <div className="description">
                    <strong>Description:</strong> {schoolDetails.description}
                </div>
                
                {/* Recorded Classes */}
                <div className="recorded-classes">
                    <h2>Recorded Classes</h2>
                    {/* Render recorded classes */}
                </div>
                
                {/* Course Pricing and Driving Courses */}
                <div className="course-pricing">
                    <h2>Course Pricing</h2>
                    {/* Render course pricing */}
                </div>
                
                {/* Slots Availability */}
                <div className="slots-availability">
                    <h2>Slots Availability</h2>
                    {/* Render slots availability */}
                </div>
            </div>
            
            {/* Footer */}
            <div className="footer-schools">
                <button className="book-appointment-btn">Book Appointment</button>
            </div>
        </div>
    );
};

export default Schools;