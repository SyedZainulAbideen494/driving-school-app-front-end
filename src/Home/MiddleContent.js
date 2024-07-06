import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { API_ROUTES } from '../app_modules/apiRoutes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons';

const MiddleContent = () => {
    const [drivingSchools, setDrivingSchools] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [sponsoredSchools, setSponsoredSchools] = useState([]);
    const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
    const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(API_ROUTES.displayDrivingSchools, {
            params: { token: token }
        })
        .then(response => {
            setDrivingSchools(response.data);
            setSponsoredSchools(response.data.filter(school => school.sponsored === 1));
        })
        .catch(error => console.error('Error fetching driving schools:', error));

        axios.get(API_ROUTES.displayPromotions)
        .then(response => {
            setPromotions(response.data);
        })
        .catch(error => console.error('Error fetching promotions:', error));
    }, []);

    useEffect(() => {
        const sponsorInterval = setInterval(() => {
            setCurrentSponsorIndex(prevIndex => (prevIndex + 1) % sponsoredSchools.length);
        }, 3000);

        return () => clearInterval(sponsorInterval);
    }, [sponsoredSchools.length]);

    useEffect(() => {
        const promotionInterval = setInterval(() => {
            setCurrentPromotionIndex(prevIndex => (prevIndex + 1) % promotions.length);
        }, 3000);

        return () => clearInterval(promotionInterval);
    }, [promotions.length]);

    const renderSponsoredSchool = () => {
        if (sponsoredSchools.length === 0) {
            return null;
        }

        const currentSponsor = sponsoredSchools[currentSponsorIndex];

        return (
            <div className="section">
                <h4>Sponsored School</h4>
                <div className="carousel">
                    <div key={currentSponsor.id} className="school-card sponsored">
                        <img src={`${API_ROUTES.displayImg}/${currentSponsor.logo_url}`} alt={currentSponsor.name} className="school-image" />
                        <div className="school-details">
                            <h3>{currentSponsor.name}</h3>
                            <p>{currentSponsor.location}</p>
                            <button className="view-btn">
                                <FontAwesomeIcon icon={faEye} /> View
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderPromotionBanners = () => {
        if (promotions.length === 0) {
            return null;
        }

        const currentPromotion = promotions[currentPromotionIndex];

        return (
            <div className="section">
                <h4>Promotions</h4>
                <div className="carousel">
                    <div key={currentPromotion.id} className="promotion-card">
                        <img src={`${API_ROUTES.displayImg}/${currentPromotion.banner_url}`} alt={currentPromotion.title} className="promotion-image" />
                    </div>
                </div>
            </div>
        );
    };

    const renderBestRatedSchools = () => {
        const bestRatedSchools = drivingSchools.filter(school => school.rating >= 4);

        return (
            <div className="section">
                <h4>Best Rated Schools</h4>
                <div className="school-list">
                    {bestRatedSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`${API_ROUTES.displayImg}/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Address: {school.address}</p>
                                <button className="view-btn">
                                    <FontAwesomeIcon icon={faEye} /> View
                                </button>
                                <button className="like-btn">
                                    <FontAwesomeIcon icon={faHeart} /> Like
                                </button>
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
                <h4>All Driving Schools</h4>
                <div className="school-list">
                    {drivingSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`${API_ROUTES.displayImg}/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Address: {school.address}</p>
                                <button className="view-btn">
                                    <FontAwesomeIcon icon={faEye} /> View
                                </button>
                                <button className="like-btn">
                                    <FontAwesomeIcon icon={faHeart} /> Like
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="middle-content">
            {renderSponsoredSchool()}
            {renderPromotionBanners()}
            {renderBestRatedSchools()}
            {renderAllDrivingSchools()}
            <footer>
                <p>Powered By Saz</p>
            </footer>
        </div>
    );
};

export default MiddleContent;