import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import Axios from 'axios';
import { API_ROUTES } from '../app_modules/apiRoutes';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const nav = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();
      login();
    };
  
    const login = () => {
      setError(""); // Clear any previous errors
      Axios.post(API_ROUTES.login, {
        email: email,
        password: password,
      }).then((response) => {
        if (!response.data.auth) {
          setError(response.data.message || "An error occurred"); // Display the error message from the server, or a generic error message
        } else {
          navigate("/");
          localStorage.setItem("token", response.data.token);
        }
      }).catch((error) => {
        setError("An error occurred while logging in"); // Display generic error message for network or other errors
      });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-container-login">
                    <FaEnvelope className="icon" />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="input-container-login">
                    <FaLock className="icon" />
                    <input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <span
                        className="toggle-password-login"
                        onClick={togglePasswordVisibility}
                    >
                        {passwordVisible ? 'Hide' : 'Show'}
                    </span>
                </div>
                <button type="submit">Login</button>
            </form>
            <div className="links-login">
                <Link to="/forgot-password">Forgot password?</Link><br /><br/>
                <Link to="/sign-up">Don't have an account?</Link>
            </div>
        </div>
    );
};

export default Login;