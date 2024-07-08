import React, { useState, useEffect, Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './my-schools.css'; // Import CSS for styling
import { API_ROUTES } from '../app_modules/apiRoutes';
import { FaArrowLeft } from 'react-icons/fa';

const SchoolListAdmin = () => {
    const [drivingSchools, setDrivingSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            fetchSchools(token);
        }
    }, []);

    const fetchSchools = (token) => {
        fetch(API_ROUTES.fetchAdminSchools, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
            const { driving_schools } = data;
            setDrivingSchools(driving_schools);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching driving schools:', error);
            setLoading(false);
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleBackclick = () => {
        nav('/');
    };

    return (
        <Fragment>
             <div className="header">
                <div className="back-btn" onClick={handleBackclick} style={{marginTop: '20px'}}>
                    <FaArrowLeft />
                </div>
                <div className="school-title">
                    <h3>My Schools</h3>
                </div>
            </div>
        <div className="school-list-all-driving-schools">
            {drivingSchools.map(school => (
                <div key={school.id} className="school-card">
                    <img src={`${API_ROUTES.displayImg}/${school.logo_url}`} alt={school.name} className="school-image" />
                    <div className="school-details">
                        <h3>{school.name}</h3>
                        <p>Rating: {school.rating}</p>
                        <p>Address: {school.address}</p>
                        <Link to={`/driving/school/admin/${school.id}`}>
                            <button className="view-btn">Manage</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        </Fragment>
    );
};

export default SchoolListAdmin;