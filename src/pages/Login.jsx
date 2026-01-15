import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsLinkedin } from 'react-icons/bs';
import './Auth.css';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        navigate('/dashboard');
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSocialLogin = (provider) => {
        console.log(`Login with ${provider}`);
        navigate('/dashboard');
    };

    return (
        <div className="auth-page">
            <nav className="auth-nav">
                <Link to="/" className="auth-nav-logo">
                    <div className="auth-nav-logo-icon">
                        <FaCalendarAlt />
                    </div>
                    <span>SmartMeet</span>
                </Link>
                <div className="auth-nav-actions">
                    <button
                        onClick={() => navigate('/signup')}
                        className="auth-nav-btn"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            <main className="auth-main">
                <div className="auth-container-new">
                    <div className="auth-left">
                        <div className="auth-image-card">
                            <div className="auth-image-wrapper">
                                <img
                                    src="/login-office.png"
                                    alt="Modern office workspace"
                                />
                            </div>
                            <h2 className="auth-left-title">Welcome back to SmartMeet</h2>
                            <p className="auth-left-description">
                                Continue scheduling interviews effortlessly with our AI-powered platform.
                                Your team is waiting for you.
                            </p>
                        </div>
                    </div>

                    <div className="auth-right">
                        <div className="auth-form-card">
                            <div className="auth-form-header">
                                <h1 className="auth-form-title">Sign in to SmartMeet</h1>
                                <p className="auth-form-subtitle">Welcome back! Please enter your details.</p>
                            </div>

                            <div className="social-buttons">
                                <button
                                    className="social-button"
                                    onClick={() => handleSocialLogin('Google')}
                                >
                                    <FcGoogle className="social-button-icon" />
                                    Continue with Google
                                </button>
                                <button
                                    className="social-button"
                                    onClick={() => handleSocialLogin('LinkedIn')}
                                >
                                    <BsLinkedin className="social-button-icon" style={{ color: '#0077b5' }} />
                                    Continue with LinkedIn
                                </button>
                            </div>

                            <div className="auth-divider">
                                <span className="auth-divider-text">Or continue with email</span>
                            </div>

                            <form onSubmit={handleSubmit} className="auth-form">
                                <div className="form-field">
                                    <label htmlFor="email" className="form-field-label">Email</label>
                                    <div className="form-field-input-wrapper">
                                        <FaEnvelope className="form-field-icon" />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-field-input"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label htmlFor="password" className="form-field-label">Password</label>
                                    <div className="form-field-input-wrapper">
                                        <FaLock className="form-field-icon" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            className="form-field-input"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-options">
                                    <div className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            name="remember"
                                            checked={formData.remember}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="remember">Remember me</label>
                                    </div>
                                    <Link to="/forgot-password" className="forgot-password-link">
                                        Forgot password?
                                    </Link>
                                </div>

                                <button type="submit" className="auth-submit-button">
                                    Sign In
                                    <FaArrowRight />
                                </button>
                            </form>

                            <div className="auth-footer-link">
                                Don't have an account? <Link to="/signup">Sign up for free</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;
