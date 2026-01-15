import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBolt,
    FaCalendar,
    FaClock,
    FaUsers,
    FaUserPlus,
    FaCog,
    FaCheckCircle,
    FaTwitter,
    FaLinkedin,
    FaGithub,
    FaEnvelope,
    FaCalendarAlt,
    FaVideo
} from 'react-icons/fa';
import LandingNav from '../components/LandingNav';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Smooth scroll effect
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page">
            <LandingNav />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content animate-on-scroll">
                        <div className="hero-eyebrow">
                            <FaBolt className="eyebrow-icon" />
                            <span>Automate Your Interview Scheduling</span>
                        </div>

                        <h1 className="hero-title">
                            Smart Interview Scheduling Made{' '}
                            <span className="gradient-text">Effortless</span>
                        </h1>

                        <p className="hero-description">
                            Schedule Google Meet, Zoom, and Microsoft Teams interviews automatically.
                            Save hours of back-and-forth emails and focus on finding the best talent.
                        </p>

                        <div className="hero-actions">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="btn-primary"
                            >
                                Start Free Trial
                                <span className="btn-arrow">→</span>
                            </button>
                            <button className="btn-secondary">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    <div className="hero-image animate-on-scroll">
                        <img
                            src="/hero-meeting.png"
                            alt="Modern meeting room"
                            className="hero-img"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">
                            Everything You Need to <span className="gradient-text">Streamline Interviews</span>
                        </h2>
                        <p className="section-description">
                            Powerful features designed to save time, reduce no-shows, and create exceptional
                            candidate experiences.
                        </p>
                    </div>

                    <div className="features-grid">
                        <div className="feature-card animate-on-scroll">
                            <div className="feature-icon orange">
                                <FaBolt />
                            </div>
                            <h3 className="feature-title">Instant Scheduling</h3>
                            <p className="feature-description">
                                Automatically schedule interviews across multiple platforms in seconds with
                                smart calendar sync.
                            </p>
                        </div>

                        <div className="feature-card animate-on-scroll">
                            <div className="feature-icon blue">
                                <FaCalendar />
                            </div>
                            <h3 className="feature-title">Multi-Platform Integration</h3>
                            <p className="feature-description">
                                Seamlessly integrate with Google Meet, Zoom, and Microsoft Teams - all in one place.
                            </p>
                        </div>

                        <div className="feature-card animate-on-scroll">
                            <div className="feature-icon purple">
                                <FaClock />
                            </div>
                            <h3 className="feature-title">Smart Time Detection</h3>
                            <p className="feature-description">
                                AI-powered timezone detection and optimal time slot suggestions for all participants.
                            </p>
                        </div>

                        <div className="feature-card animate-on-scroll">
                            <div className="feature-icon green">
                                <FaUsers />
                            </div>
                            <h3 className="feature-title">Team Collaboration</h3>
                            <p className="feature-description">
                                Coordinate multiple interviewers, share feedback, and manage hiring pipelines effortlessly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">How SmartMeet Works</h2>
                        <p className="section-description">
                            Get started in minutes and schedule your first interview in seconds
                        </p>
                    </div>

                    <div className="steps-grid">
                        <div className="step-card animate-on-scroll">
                            <div className="step-number">01</div>
                            <div className="step-icon">
                                <FaUserPlus />
                            </div>
                            <h3 className="step-title">Add Candidates</h3>
                            <p className="step-description">
                                Import candidates from your ATS or add them manually with their availability preferences.
                            </p>
                        </div>

                        <div className="step-card animate-on-scroll">
                            <div className="step-number">02</div>
                            <div className="step-icon">
                                <FaCog />
                            </div>
                            <h3 className="step-title">Set Preferences</h3>
                            <p className="step-description">
                                Define your interview panel, duration, and preferred meeting platforms.
                            </p>
                        </div>

                        <div className="step-card animate-on-scroll">
                            <div className="step-number">03</div>
                            <div className="step-icon">
                                <FaCalendar />
                            </div>
                            <h3 className="step-title">Auto-Schedule</h3>
                            <p className="step-description">
                                SmartMeet finds the best time slots and automatically creates meetings on your chosen platform.
                            </p>
                        </div>

                        <div className="step-card animate-on-scroll">
                            <div className="step-number">04</div>
                            <div className="step-icon">
                                <FaCheckCircle />
                            </div>
                            <h3 className="step-title">Conduct & Track</h3>
                            <p className="step-description">
                                Everyone gets notifications, reminders, and you can track the entire interview pipeline.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Integrations Section */}
            <section id="integrations" className="integrations-section">
                <div className="section-container">
                    <div className="section-header animate-on-scroll">
                        <h2 className="section-title">
                            Integrates with Your <span className="gradient-text">Favorite Tools</span>
                        </h2>
                        <p className="section-description">
                            Connect SmartMeet with the tools you already use every day
                        </p>
                    </div>

                    <div className="integrations-grid">
                        <div className="integration-card animate-on-scroll">
                            <div className="integration-icon google">
                                <FaVideo />
                            </div>
                            <h3 className="integration-title">Google Meet</h3>
                            <p className="integration-subtitle">Seamless integration with Google Workspace</p>
                            <ul className="integration-features">
                                <li><FaCheckCircle /> Auto-create meetings</li>
                                <li><FaCheckCircle /> Calendar sync</li>
                                <li><FaCheckCircle /> Gmail notifications</li>
                            </ul>
                        </div>

                        <div className="integration-card animate-on-scroll">
                            <div className="integration-icon microsoft">
                                <FaUsers />
                            </div>
                            <h3 className="integration-title">Microsoft Teams</h3>
                            <p className="integration-subtitle">Native support for Microsoft 365</p>
                            <ul className="integration-features">
                                <li><FaCheckCircle /> Teams meetings</li>
                                <li><FaCheckCircle /> Outlook sync</li>
                                <li><FaCheckCircle /> Azure AD integration</li>
                            </ul>
                        </div>

                        <div className="integration-card animate-on-scroll">
                            <div className="integration-icon zoom">
                                <FaVideo />
                            </div>
                            <h3 className="integration-title">Zoom</h3>
                            <p className="integration-subtitle">Full Zoom meeting capabilities</p>
                            <ul className="integration-features">
                                <li><FaCheckCircle /> Instant meetings</li>
                                <li><FaCheckCircle /> Recording options</li>
                                <li><FaCheckCircle /> Waiting rooms</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <div className="section-container">
                    <p className="trust-text">Trusted by leading companies worldwide</p>
                    <div className="trust-logos">
                        <span className="trust-logo">TechCorp</span>
                        <span className="trust-logo">InnovateLabs</span>
                        <span className="trust-logo">FutureWorks</span>
                        <span className="trust-logo">DataStream</span>
                        <span className="trust-logo">CloudNine</span>
                        <span className="trust-logo">NextGen</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <div className="footer-logo">
                                <FaCalendarAlt className="logo-icon" />
                                <span className="logo-text">SmartMeet</span>
                            </div>
                            <p className="footer-description">
                                Automate your interview scheduling with AI-powered smart scheduling for
                                Google Meet, Zoom, and Microsoft Teams.
                            </p>
                            <div className="footer-social">
                                <a href="#" className="social-icon"><FaTwitter /></a>
                                <a href="#" className="social-icon"><FaLinkedin /></a>
                                <a href="#" className="social-icon"><FaGithub /></a>
                                <a href="#" className="social-icon"><FaEnvelope /></a>
                            </div>
                        </div>

                        <div className="footer-links">
                            <div className="footer-column">
                                <h4 className="footer-heading">Product</h4>
                                <a href="#features" className="footer-link">Features</a>
                                <a href="#integrations" className="footer-link">Integrations</a>
                                <a href="#pricing" className="footer-link">Pricing</a>
                                <a href="#" className="footer-link">API</a>
                                <a href="#" className="footer-link">Changelog</a>
                            </div>

                            <div className="footer-column">
                                <h4 className="footer-heading">Company</h4>
                                <a href="#" className="footer-link">About</a>
                                <a href="#" className="footer-link">Blog</a>
                                <a href="#" className="footer-link">Careers</a>
                                <a href="#" className="footer-link">Press</a>
                                <a href="#" className="footer-link">Contact</a>
                            </div>

                            <div className="footer-column">
                                <h4 className="footer-heading">Resources</h4>
                                <a href="#" className="footer-link">Documentation</a>
                                <a href="#" className="footer-link">Help Center</a>
                                <a href="#" className="footer-link">Community</a>
                                <a href="#" className="footer-link">Templates</a>
                                <a href="#" className="footer-link">Status</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p className="footer-copyright">© 2025 SmartMeet. All rights reserved.</p>
                        <div className="footer-legal">
                            <a href="#" className="footer-legal-link">Privacy Policy</a>
                            <a href="#" className="footer-legal-link">Terms of Service</a>
                            <a href="#" className="footer-legal-link">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
