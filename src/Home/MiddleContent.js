import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const MiddleContent = () => {
    const [drivingSchools, setDrivingSchools] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch all driving schools
        axios.get('http://localhost:8080/api/driving-schools', {
            params: {
                token: token
            }
        })
        .then(response => {
            setDrivingSchools(response.data);
        })
        .catch(error => {
            console.error('Error fetching driving schools:', error);
        });
    }, []);

    return (
        <div className="middle-content">
            <div className="filter-btn">
                <button className="filter-btn">Filter</button>
            </div>

            <div className="section">
                <h2>Best Rated</h2>
                <div className="school-list">
                    {drivingSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`http://localhost:8080/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Distance: {school.distance}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>Nearest</h2>
                <div className="school-list">
                    {drivingSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`http://localhost:8080/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Distance: {school.distance}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2>All Driving Schools</h2>
                <div className="school-list">
                    {drivingSchools.map(school => (
                        <div key={school.id} className="school-card">
                            <img src={`http://localhost:8080/${school.logo_url}`} alt={school.name} className="school-image" />
                            <div className="school-details">
                                <h3>{school.name}</h3>
                                <p>Rating: {school.rating}</p>
                                <p>Distance: {school.distance}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MiddleContent;