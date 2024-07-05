import React from 'react';
import Header from './header';
import Footer from './footer';
import './home.css'

const HomePage = () => {
    return (
        <div className="home-container">
            <Header />
            {/* Middle content can be added here */}
            <Footer />
        </div>
    );
};

export default HomePage;