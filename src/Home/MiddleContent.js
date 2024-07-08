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

const MiddleContent = () => {
    const [drivingSchools, setDrivingSchools] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [sponsoredSchools, setSponsoredSchools] = useState([]);
    const [currentSponsorIndex, setCurrentSponsorIndex] = useState(0);
    const [currentPromotionIndex, setCurrentPromotionIndex] = useState(0);
    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [isSlidingBarOpen, setIsSlidingBarOpen] = useState(false);
    
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
        }
    }, []);

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
                <div className="school-list sponsored-list">
                    <div key={currentSponsor.id} className="school-card-sponsored">
                        <img src={`${API_ROUTES.displayImg}/${currentSponsor.logo_url}`} alt={currentSponsor.name} className="school-image" />
                        <div className="school-details">
                            <h3>{currentSponsor.name}</h3>
                            <p>{currentSponsor.location}</p>
                            <p style={{color: 'grey'}}>sponsored</p>
                            <Link to={`/driving/school/${currentSponsor.id}`}>
                                <button className="view-btn">View</button>
                                </Link>
                        </div>
                    </div>
                    <div className="progress-bar">
                        <div className="progress"></div>
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
        console.log('All Driving Schools:', drivingSchools); // Log to check state before rendering
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

    return (<Fragment>
          <div className="header">
            <div className="profile">
                <img src={`${API_ROUTES.displayImg}/${profilePic}`} alt="Profile" className="profile-pic" onClick={() => setIsSlidingBarOpen(!isSlidingBarOpen)}/>
                <input type="text" placeholder="Search" className="search-bar" />
            </div>
            <img src={filterIcon} style={{width: '20px'}}/>
        </div>
        <div className='category'>
  <div className='category-box'>
    <img src={carCAtBn} alt='Category 1' />
    <p>Car Driving Schools</p>
  </div>
  <div className='category-box'>
    <img src={bikeCatBn} alt='Category 2' />
    <p>Bike Riding Schools</p>
  </div>
</div>
<div className='discover-section'>
  <div className='discover-box'>
    <h3>Discover New Features</h3>
    <p>Explore the latest additions to our app.</p>
    <button>Explore</button>
  </div>
  <div className='discover-box'>
    <h3>Find Events Near You</h3>
    <p>Discover local events and activities.</p>
    <button>Find Events</button>
  </div>
  <div className='discover-box'>
    <h3>Learn Something New</h3>
    <p>Access tutorials and resources.</p>
    <button>Start Learning</button>
  </div>
</div>
        <div className="middle-content">
            {renderSponsoredSchool()}
            {renderPromotionBanners()}
            {renderBestRatedSchools()}
            {renderAllDrivingSchools()}
            <footer>
                <p>Powered By Saz</p>
            </footer>
        </div>
        <div className="footer">
  <button className="footer-btn"><FaHome style={{ color: 'black' }} /></button>
  <button className="footer-btn"><FaList style={{ color: 'black' }} /></button>
  <button className="footer-btn"><FaBell style={{ color: 'black' }} /></button>
  <button className="footer-btn"><FaCog style={{ color: 'black' }} /></button>
</div>
<SlidingBar isOpen={isSlidingBarOpen} onClose={() => setIsSlidingBarOpen(false)} /> {/* Include SlidingBar component */}
        </Fragment>
    );
};

export default MiddleContent;