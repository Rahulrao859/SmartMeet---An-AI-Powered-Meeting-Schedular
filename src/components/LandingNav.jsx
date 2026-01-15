import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCalendarAlt } from 'react-icons/fa';

const LandingNav = () => {
    const navigate = useNavigate();

    return (
        <nav className="landing-nav">
            <div className="nav-container">
                <div className="nav-content">
                    {/* Logo */}
                    <div className="nav-logo">
                        <FaCalendarAlt className="logo-icon" />
                        <span className="logo-text">SmartMeet</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="nav-links">
                        <a href="#features" className="nav-link">Features</a>
                        <a href="#how-it-works" className="nav-link">How It Works</a>
                        <a href="#integrations" className="nav-link">Integrations</a>
                        <a href="#pricing" className="nav-link">Pricing</a>
                    </div>

                    {/* Action Buttons */}
                    <div className="nav-actions">
                        <button
                            onClick={() => navigate('/login')}
                            className="btn-sign-in"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="btn-get-started"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNav;
