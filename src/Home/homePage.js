import React from 'react';
import Header from './header';
import Footer from './footer';
import MiddleContent from './MiddleContent';
import './home.css';

const HomePage = () => {
    return (
        <div className="home-container">
            <MiddleContent />
        </div>
    );
};

export default HomePage;