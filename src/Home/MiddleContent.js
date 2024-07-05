import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { API_ROUTES } from '../app_modules/apiRoutes';

const MiddleContent = () => {
    const [drivingSchools, setDrivingSchools] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [sponsoredSchools, setSponsoredSchools] = useState([]);
    const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
    const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch all driving schools
        axios.get(API_ROUTES.displayDrivingSchools, {
            params: { token: token }
        })
        .then(response => {
            console.log('Driving Schools:', response.data); // Debugging log
            setDrivingSchools(response.data);
            setSponsoredSchools(response.data.filter(school => school.sponsored === 1));
        })
        .catch(error => console.error('Error fetching driving schools:', error));

        // Fetch promotions
        axios.get(API_ROUTES.displayPromotions)
        .then(response => {
            console.log('Promotions:', response.data); // Debugging log
            setPromotions(response.data);
        })
        .catch(error => console.error('Error fetching promotions:', error));
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
            <div className="section">
                <h4>Sponsored School</h4>
                <div className="school-list sponsored-list">
                    <div key={currentSponsor.id} className="school-card-sponsored">
                        <img src={`${API_ROUTES.displayImg}/${currentSponsor.logo_url}`} alt={currentSponsor.name} className="school-image" />
                        <div className="school-details">
                            <h3>{currentSponsor.name}</h3>
                            <p>{currentSponsor.location}</p>
                            <button className="view-btn">View</button>
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
            <div className="section">
                <h4>Promotions</h4>
                <div className="promotion-list">
                    <div key={currentPromotion.id} className="promotion-card">
                        <img src={`${API_ROUTES.displayImg}/${currentPromotion.banner_url}`} alt={currentPromotion.title} className="promotion-image" />
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
                                <button className="view-btn">View</button>
                                <button className="like-btn">❤️</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderAllDrivingSchools = () => {
        console.log('All Driving Schools:', drivingSchools); // Log to check state before rendering
        return (
            <div className="section">
                <h4>All Driving Schools</h4>
                <div className="school-list-all-driving-schools">
                    {drivingSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`${API_ROUTES.displayImg}/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Address: {school.address}</p>
                                <button className="view-btn">View</button>
                                <button className="like-btn">❤️</button>
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