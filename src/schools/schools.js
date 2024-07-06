import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaStar, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaLink } from 'react-icons/fa';
import './schools.css'; // Import CSS for styling (create this file)
import { API_ROUTES } from '../app_modules/apiRoutes';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Schools = () => {
    const [schoolDetails, setSchoolDetails] = useState(null);
    const [recordedClasses, setRecordedClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const params = useParams();
    const nav = useNavigate();
    const schoolId = params.id; // Replace with the school ID you want to fetch

    useEffect(() => {
        // Fetch school details
        axios.get(`${API_ROUTES.schooldetailsId}/${schoolId}`)
            .then(response => {
                setSchoolDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching school details:', error);
            });

        // Fetch recorded classes
        axios.get(`${API_ROUTES.recordedClasses}/${schoolId}`)
            .then(response => {
                setRecordedClasses(response.data);
            })
            .catch(error => {
                console.error('Error fetching recorded classes:', error);
            });

        // Fetch courses by school ID
        axios.get(`${API_ROUTES.coursesBySchool}/${schoolId}`)
            .then(response => {
                setCourses(response.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, [schoolId]);

    const handleWhatsAppClick = () => {
        // Replace with actual WhatsApp integration logic
        window.open(`https://wa.me/${schoolDetails.phone}`, '_blank');
    };

    const handleBackclick = () => {
        nav('/');
    };

    if (!schoolDetails) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="school-details">
            {/* Header */}
            <div className="header">
                <div className="back-btn" onClick={handleBackclick}>
                    <FaArrowLeft />
                </div>
                <div className="school-title">
                    <h4>{schoolDetails.name}</h4>
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
                <div className="detail-section">
                    <div className="section-title">
                        <FaMapMarkerAlt />
                        <span>Location</span>
                    </div>
                    <div className="detail-content">
                        {schoolDetails.address}, {schoolDetails.city}, {schoolDetails.state} {schoolDetails.zip_code}, {schoolDetails.country}
                    </div>
                </div>
                
                {/* Contact */}
                <div className="detail-section">
                    <div className="section-title">
                        <FaPhoneAlt />
                        <span>Contact</span>
                    </div>
                    <div className="detail-content">
                        <div className="contact-item" onClick={handleWhatsAppClick}>
                            <FaWhatsapp /> Chat on WhatsApp
                        </div>
                        <div className="contact-item">
                            <FaPhoneAlt /> {schoolDetails.phone}
                        </div>
                        <div className="contact-item">
                            <FaEnvelope /> {schoolDetails.email}
                        </div>
                        <div className="contact-item">
                            <FaLink /> <a href={schoolDetails.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
                        </div>
                    </div>
                </div>
                
                {/* Description */}
                <div className="detail-section">
                    <div className="section-title">
                        <span>Description</span>
                    </div>
                    <div className="detail-content">
                        {schoolDetails.description}
                    </div>
                </div>
                
                {/* Recorded Classes */}
                <div className="detail-section">
                    <div className="section-title">
                        <span>Recorded Classes</span>
                    </div>
                    <div className="detail-content">
                        {recordedClasses.slice(0, 2).map((recordedClass, index) => (
                            <div key={index} className="video-card">
                                {/* Video Container */}
                                <div className="video-container">
                                    <video controls>
                                        <source src={`${API_ROUTES.displayImg}/${recordedClass.video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                
                                {/* Video Details */}
                                <div className="video-details">
                                    <p className="video-title">{recordedClass.title}</p>
                                    <p className="video-description">{recordedClass.description}</p>
                                </div>
                            </div>
                        ))}
                        
                        {/* See All Classes Button */}
                        <div className="see-all-classes">
                            <Link to={`/recorded/classes/${schoolId}`} className="see-all-btn">See All Classes</Link>
                        </div>
                    </div>
                </div>
                
                {/* Course Pricing and Driving Courses */}
                <div className="detail-section-course">
    <div className="section-title-course">
        <span>Course Pricing</span>
    </div>
    <div className="detail-content-course courses-container">
        {courses.map((course, index) => (
            <div key={index} className="course-card">
                <img src={`${API_ROUTES.displayImg}/${course.image}`} alt={course.course_name} className="course-image" />
                <div className="course-details">
                    <h3>{course.course_name}</h3>
                    <p>{course.description}</p>
                    <p>Price: ${course.price}</p>
                    {/* Add more course details as needed */}
                </div>
            </div>
        ))}
    </div>
</div>
                
                {/* Slots Availability */}
                <div className="detail-section">
                    <div className="section-title">
                        <span>Slots Availability</span>
                    </div>
                    <div className="detail-content">
                        {/* Render slots availability */}
                    </div>
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