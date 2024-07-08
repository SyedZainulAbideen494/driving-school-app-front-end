// SlidingBar.js
import React from 'react';
import { FaUser, FaCog, FaSignOutAlt, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import './SlidingBar.css'; // Import the CSS for the sliding bar

const SlidingBar = ({ isOpen, onClose }) => {
    return (
        <div className={`sliding-bar ${isOpen ? 'open' : ''}`}>
            <div className="sliding-bar-content">
                <button className="close-btn" onClick={onClose}>X</button>
                <button className="sliding-bar-btn"><FaUser /> Profile</button>
                <button className="sliding-bar-btn"><FaCog /> Settings</button>
                <button className="sliding-bar-btn"><FaEnvelope /> Messages</button>
                <button className="sliding-bar-btn"><FaInfoCircle /> About</button>
                <button className="sliding-bar-btn"><FaSignOutAlt /> Logout</button>
            </div>
        </div>
    );
};

export default SlidingBar;