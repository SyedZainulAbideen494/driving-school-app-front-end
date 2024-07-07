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
    const [showAppointmentForm, setShowAppointmentForm] = useState(false); // State for showing/hiding the form
    const [appointmentDetails, setAppointmentDetails] = useState({ name: '', phone: '', timeSlot: '', dateSlot: '' }); // State for form input
    const [submitting, setSubmitting] = useState(false); // State for form submission status
    const [bookingSuccess, setBookingSuccess] = useState(false); // State for booking success

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Set submitting state to true
        setSubmitting(true);

        // Get the token from localStorage or wherever it's stored
        const token = localStorage.getItem('token'); // Adjust this based on your actual implementation

        const appointmentData = {
            name: appointmentDetails.name,
            phone: appointmentDetails.phone,
            timeSlot: appointmentDetails.timeSlot,
            dateSlot: appointmentDetails.dateSlot,
            school_id: schoolId,
            token: token // Send the token to the backend
        };

        // Make a POST request to your backend
        axios.post('http://localhost:8080/api/appointments', appointmentData)
            .then(response => {
                console.log('Appointment booked successfully:', response.data);
                setBookingSuccess(true); // Set booking success state to true
                // Reset form fields
                setAppointmentDetails({ name: '', phone: '', timeSlot: '', dateSlot: '' });
            })
            .catch(error => {
                console.error('Error booking appointment:', error);
            })
            .finally(() => {
                // Always set submitting state to false after submission (whether success or failure)
                setSubmitting(false);
            });
    };

    const handleCancel = () => {
        setShowAppointmentForm(false); // Hide form on cancel
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
            </div>

            {/* Footer */}
            <div className="footer-schools">
                <button className="book-appointment-btn" onClick={() => setShowAppointmentForm(true)}>Book an Appointment</button>
            </div>

            {/* Backdrop */}
            <div className={`backdrop ${showAppointmentForm ? 'show' : ''}`} onClick={handleCancel}></div>

            {/* Appointment Form Modal */}
            <div className={`appointment-modal ${showAppointmentForm ? 'show' : ''}`}>
                {submitting && (
                    <div className="loading-overlay">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
                {!submitting && !bookingSuccess && (
                    <form className="appointment-form" onSubmit={handleFormSubmit}>
                        <h3>Book an Appointment</h3>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={appointmentDetails.name}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your Phone Number"
                            value={appointmentDetails.phone}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="time"
                            name="timeSlot"
                            placeholder="Preferred Time Slot"
                            value={appointmentDetails.timeSlot}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="date"
                            name="dateSlot"
                            placeholder="Preferred Date Slot"
                            value={appointmentDetails.dateSlot}
                            onChange={handleInputChange}
                            required
                        />
                        <button type="submit" className="confirm-btn" disabled={submitting}>
                            {submitting ? 'Booking...' : 'Book Now'}
                        </button>
                        <button type="button" className="cancel-btn" onClick={handleCancel}>Cancel</button>
                    </form>
                )}
                {bookingSuccess && (
    <div className="success-message">
        <div className="tick-animation">
            <div className="circle">
                <div className="tick"></div>
            </div>
        </div>
        <p>Your appointment has been booked successfully!</p>
        <button className="done-btn" onClick={() => setShowAppointmentForm(false)}>Done</button>
    </div>
)}
            </div>
        </div>
    );
};

export default Schools;