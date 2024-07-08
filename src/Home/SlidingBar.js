import React from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaBell, FaSchool, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import './SlidingBar.css'; // Import the CSS for the sliding bar
import { useNavigate } from 'react-router-dom';

const SlidingBar = ({ isOpen, onClose }) => {
    const nav = useNavigate()
    const handleredirectAddschool = () => {
        nav('/register/school/form')
    }
    return (
        <div className={`sliding-bar ${isOpen ? 'open' : ''}`}>
            <div className="sliding-bar-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <button className="sliding-bar-btn"><FaUser /> Profile</button>
                <button className="sliding-bar-btn" onClick={handleredirectAddschool}><FaSchool /> Add Driving School</button>
                <button className="sliding-bar-btn"><FaCog /> Settings</button>
                <button className="sliding-bar-btn"><FaSignOutAlt /> Logout</button>
                <button className="sliding-bar-btn"><FaInfoCircle /> About</button>
                <button className="sliding-bar-btn"><FaBell /> Notifications</button>
                <button className="sliding-bar-btn"><FaQuestionCircle /> Help</button>
            </div>
        </div>
    );
};

export default SlidingBar;