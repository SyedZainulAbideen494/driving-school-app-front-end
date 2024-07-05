import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css'

const Header = () => {
    const [userName, setUserName] = useState('');
    const [profilePic, setProfilePic] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Fetch user data from backend using token
            axios.get(`http://localhost:8080/api/user/${token}`, {
            })
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

    return (
        <div className="header">
            <div className="profile">
                <img src={`http://localhost:8080/${profilePic}`} alt="Profile" className="profile-pic" />
                <input type="text" placeholder="Search" className="search-bar" />
            </div>
        </div>
    );
};

export default Header;