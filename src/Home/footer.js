import React from 'react';
import './home.css';
import { FaHome, FaList, FaBell, FaCog } from 'react-icons/fa'; // Import icons from Font Awesome

const Footer = () => {
    return (
        <div className="footer">
            <button className="footer-btn"><FaHome /></button>
            <button className="footer-btn"><FaList /></button>
            <button className="footer-btn"><FaBell /></button>
            <button className="footer-btn"><FaCog /></button>
        </div>
    );
};

export default Footer;