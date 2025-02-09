import React, { useState, useEffect } from 'react';
import { FaSchool, FaBell, FaSignOutAlt, FaAd } from 'react-icons/fa'; // Import FaAd for Manage Ads icon
import './SlidingBar.css'; // Import the CSS for the sliding bar
import { useNavigate } from 'react-router-dom';
import { API_ROUTES } from '../app_modules/apiRoutes';

const SlidingBar = ({ isOpen, onClose }) => {
    const [user, setUser] = useState(null);
    const [drivingSchools, setDrivingSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = (token) => {
        fetch(API_ROUTES.getMySchoolsBtn, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            setUser(data.user_id);
            setDrivingSchools(data.driving_schools);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setLoading(false);
        });
    };

    const handleRedirectAddSchool = () => {
        navigate('/register/school/form');
    };

    const handleRedirectMySchool = () => {
        navigate('/my/schools');
    };

    const handleRedirectManageAds = () => {
        navigate('/manage/ads');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`sliding-bar ${isOpen ? 'open' : ''}`}>
            <div className="sliding-bar-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <button className="sliding-bar-btn">My Profile</button>
                <button className="sliding-bar-btn" onClick={handleRedirectManageAds}><FaAd /> Manage Ads</button> {/* Icon for Manage Ads */}
                <button className="sliding-bar-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
            </div>
        </div>
    );
};

export default SlidingBar;