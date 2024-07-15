import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import './home.css'; // Assuming you have your CSS file for home styles
import { API_ROUTES } from '../app_modules/apiRoutes';
import { FaHome, FaList, FaBell, FaCog } from 'react-icons/fa';
import filterIcon from '../images/filter.png';
import carCAtBn from '../images/car_catBanner.jpeg';
import bikeCatBn from '../images/bike_catBanner.jpeg';
import { Link } from 'react-router-dom';
import SlidingBar from './SlidingBar'; // Import the SlidingBar component
import NotificationModal from '../notification/notification'
import notiicon from '../images/icons8-notification-50.png'

const MiddleContent = () => {
    const [drivingSchools, setDrivingSchools] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [sponsoredSchools, setSponsoredSchools] = useState([]);
    const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
    const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isSlidingBarOpen, setIsSlidingBarOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [featuredServices, setFeaturedServices] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user data from backend using token
            axios.get(`${API_ROUTES.fetchUserDetails}/${token}`, {})
            .then(response => {
                const { user_name, profile_pic } = response.data;
                setUserName(user_name);
                setProfilePic(profile_pic);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });

            // Fetch notifications for the user
            axios.get(`${API_ROUTES.fetchNotifications}`, {
                params: { token: token }
            })
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => {
                console.error('Error fetching notifications:', error);
            });
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch all driving schools
        axios.get(API_ROUTES.displayDrivingSchools, {
            params: { token: token }
        })
        .then(response => {
            setDrivingSchools(response.data);
            setSponsoredSchools(response.data.filter(school => school.sponsored === 1));
        })
        .catch(error => console.error('Error fetching driving schools:', error));

        // Fetch promotions
        axios.get(API_ROUTES.displayPromotions)
        .then(response => {
            setPromotions(response.data);
        })
        .catch(error => console.error('Error fetching promotions:', error));

        // Fetch featured services
        axios.get(API_ROUTES.fetchFeaturedServices, {
            params: { token: token }
        })
        .then(response => {
            setFeaturedServices(response.data);
        })
        .catch(error => console.error('Error fetching featured services:', error));
    }, []);

    // Rotate sponsors every 3 seconds
    useEffect(() => {
        const sponsorInterval = setInterval(() => {
            setCurrentSponsorIndex(prevIndex => (prevIndex + 1) % sponsoredSchools.length);
        }, 3000);

        return () => clearInterval(sponsorInterval);
    }, [sponsoredSchools.length]);

    // Rotate promotions every 3 seconds
    useEffect(() => {
        const promotionInterval = setInterval(() => {
            setCurrentPromotionIndex(prevIndex => (prevIndex + 1) % promotions.length);
        }, 3000);

        return () => clearInterval(promotionInterval);
    }, [promotions.length]);

    const renderSponsoredSchool = () => {
        if (sponsoredSchools.length === 0) {
            return null; // No sponsored schools yet
        }

        const currentSponsor = sponsoredSchools[currentSponsorIndex];

        return (
            <div className="section-sponsered">
                <div className="school-list sponsored-list">
                    <div key={currentSponsor.id} className="school-card-sponsored">
                        <img src={`${API_ROUTES.displayImg}/${currentSponsor.logo_url}`} alt={currentSponsor.name} className="school-image" />
                        <div className="school-details-sponsored">
                            <h3>{currentSponsor.name}</h3>
                            <p>{currentSponsor.location}</p>
                            <p style={{color: 'grey'}}>sponsored</p>
                            <Link to={`/driving/school/${currentSponsor.id}`}>
                                <button className="view-btn-sponsored">View</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderPromotionBanners = () => {
        if (promotions.length === 0) {
            return null; // No promotions yet
        }

        const currentPromotion = promotions[currentPromotionIndex];

        return (
            <div className="section-promotion">
                <h4>Promotions</h4>
                <div className="promotion-list">
                    <div key={currentPromotion.id} className="promotion-card">
                        <img src={`${API_ROUTES.displayImg}/${currentPromotion.banner_url}`} alt={currentPromotion.title} className="promotion-image" />
                        <p>{currentPromotion.title}</p>
                    </div>
                </div>
            </div>
        );
    };

    const renderBestRatedSchools = () => {
        const bestRatedSchools = drivingSchools.filter(school => school.rating >= 4); // Example criteria for best rated
        return (
            <div className="section">
                <h4>Best Rated Schools</h4>
                <div className="school-list-best-schools">
                    {bestRatedSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`${API_ROUTES.displayImg}/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Address: {school.address}</p>
                                <Link to={`/driving/school/${school.id}`}>
                                    <button className="view-btn">View</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderAllDrivingSchools = () => {
        return (
            <div className="section">
                <h3>All Driving Schools</h3>
                <div className="school-list-all-driving-schools">
                    {drivingSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`${API_ROUTES.displayImg}/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Address: {school.address}</p>
                                <Link to={`/driving/school/${school.id}`}>
                                    <button className="view-btn">View</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderFeaturedServices = () => {
        if (featuredServices.length === 0) {
            return <p>No featured services available.</p>;
        }

        return (
            <div className="section">
                <h3>Featured Services</h3>
                <div className="featured-services-list">
                    {featuredServices.map(service => (
                        <div key={service.id} className="service-card">
                            <img src={`${API_ROUTES.displayImg}/${service.image_url}`} alt={service.name} className="service-image" />
                            <div className="service-details">
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <Link to={`/service/${service.id}`}>
                                    <button className="view-btn">View</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const toggleNotificationsModal = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <Fragment>
            <div className="header">
                <div className="profile">
                    <img src={`${API_ROUTES.displayImg}/${profilePic}`} alt="Profile" className="profile-pic" onClick={() => setIsSlidingBarOpen(!isSlidingBarOpen)} />
                </div>
                <img src={notiicon} style={{ width: '20px' }} onClick={toggleNotificationsModal} />
            </div>
            {renderSponsoredSchool()}
            {renderPromotionBanners()}
            {renderBestRatedSchools()}
            {renderAllDrivingSchools()}
            <SlidingBar isOpen={isSlidingBarOpen} onClose={() => setIsSlidingBarOpen(false)} userName={userName} />
            {showNotifications && (
                <NotificationModal notifications={notifications} onClose={toggleNotificationsModal} />
            )}
            <div className="footer">
                <button className="footer-btn"><FaHome /></button>
                <button className="footer-btn"><FaList /></button>
                <button className="footer-btn"><FaBell /></button>
                <button className="footer-btn"><FaCog /></button>
            </div>
        </Fragment>
    );
};

export default MiddleContent;