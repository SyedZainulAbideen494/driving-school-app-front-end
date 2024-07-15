import React from "react";
import './home.css'
import salaonImg from '../images/Free Vector _ Beauty salon concept illustration.jpeg'
import trainerImg from '../images/Free Vector _ Cute man lifting barbell gym cartoon vector icon illustration_ people sport icon concept isolated.jpeg'
import drivingSchool from '../images/bike_catBanner.jpeg'
const Category = () => {
    return (
        <div className="category-section">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Categories</h3>
            <div className="category-list">
                <div className="category-card">
                    <img src={salaonImg} alt="Category 1" className="category-image" />
                    <div className="category-details">
                        <h4>Category 1</h4>
                        <p>Description for Category 1</p>
                        <button className="explore-btn">Explore</button>
                    </div>
                </div>
                <div className="category-card">
                    <img src={trainerImg} alt="Category 2" className="category-image" />
                    <div className="category-details">
                        <h4>Category 2</h4>
                        <p>Description for Category 2</p>
                        <button className="explore-btn">Explore</button>
                    </div>
                </div>
                <div className="category-card">
                    <img src={drivingSchool} alt="Category 3" className="category-image" />
                    <div className="category-details">
                        <h4>Category 3</h4>
                        <p>Description for Category 3</p>
                        <button className="explore-btn">Explore</button>
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Category;