import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <div className="input-container-login">
                    <FaEnvelope className="icon" />
                    <input type="email" placeholder="Email" required />
                </div>
                <div className="input-container-login">
                    <FaLock className="icon" />
                    <input 
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="Password" 
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
                <Link to='/forgot-password'>Forgot password?</Link><br/>
                <Link href="/sign-up">Don't have an account?</Link>
            </div>
        </div>
    );
};

export default Login;