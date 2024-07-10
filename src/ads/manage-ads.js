import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaExternalLinkAlt } from 'react-icons/fa';
import './ads.css'; // Import your CSS for the Manage Ads page
import { useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { API_ROUTES } from '../app_modules/apiRoutes';

const ManageAdsPage = () => {
    const [currentFunds, setCurrentFunds] = useState(0); // Placeholder for current funds
    const [activeAds, setActiveAds] = useState([]);
    const [inactiveAds, setInactiveAds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch current funds and ads based on token
        const fetchAdsData = async () => {
            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
                const fundsResponse = await axios.post(API_ROUTES.fetchAdFunds, { token });
                setCurrentFunds(fundsResponse.data.currentFunds);

                const adsResponse = await axios.post(API_ROUTES.getUserAds, { token });
                setActiveAds(adsResponse.data.activeAds);
                setInactiveAds(adsResponse.data.inactiveAds);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error
            }
        };

        fetchAdsData();
    }, []);

    const handleGoBack = () => {
        // Navigate back to previous page
        navigate(-1); // Equivalent to history.goBack()
    };

    const handleAddAd = () => {
        // Navigate to add ad page
        navigate('/run/ads');
    };

    const handleAddfunds = () => {
        // Navigate to add ad page
        navigate('/add/funds');
    };

    const handleVisitWebsite = (url) => {
        // Open ad's website in a new tab
        window.open(url, '_blank');
    };

    return (
        <div className="manage-ads-page">
            <div className="header">
                <button className="back-btn" onClick={handleGoBack}><FaArrowLeft /></button>
                <h3>Manage Ads</h3>
                <div className="current-funds">Current Funds: ${currentFunds}</div>
            </div>
            <div className="content">
                <button className="add-ad-btn" onClick={handleAddfunds} style={{marginRight: '10px'}}>Add Funds</button>
                <button className="add-ad-btn" onClick={handleAddAd}>Add Ad</button>
                
                <div className="ads-section">
                    <h2>Active Ads</h2>
                    <div className="ads-list">
                        {activeAds.map(ad => (
                            <div key={ad.title} className="ad-item active">
                                <div className="ad-info">
                                    <h3>{ad.title}</h3>
                                    <div className="ad-banner">
                                        <img src={`${API_ROUTES.displayImg}/${ad.banner_url}`} alt={ad.title} />
                                    </div>
                                    <button className="visit-btn" onClick={() => handleVisitWebsite(ad.website)}>
                                        Visit Website <FaExternalLinkAlt />
                                    </button>
                                    <div className="ad-duration">Duration: {ad.duration} Hours</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="ads-section">
                    <h2>Inactive Ads</h2>
                    <div className="ads-list">
                        {inactiveAds.map(ad => (
                            <div key={ad.title} className="ad-item inactive">
                                <div className="ad-info">
                                    <h3>{ad.title}</h3>
                                    <div className="ad-banner">
                                        <img src={`${API_ROUTES.displayImg}/${ad.banner_url}`} alt={ad.title} />
                                    </div>
                                    <div className="ad-duration">Duration: {ad.duration} Hours</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageAdsPage;