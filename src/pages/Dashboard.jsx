import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import QuickActions from '../components/QuickActions';
import { MdCalendarToday, MdCheckCircle, MdEmail, MdHome } from 'react-icons/md';
import { FaRobot, FaUsers } from 'react-icons/fa';
import { api } from '../services/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        meetings_scheduled: 0,
        emails_sent: 0,
        success_rate: 0,
        active_participants: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const data = await api.getStats();
            // Safely access stats with fallback to default values
            if (data && data.stats) {
                setStats({
                    meetings_scheduled: data.stats.meetings_scheduled || 0,
                    emails_sent: data.stats.emails_sent || 0,
                    success_rate: data.stats.success_rate || 0,
                    active_participants: data.stats.active_participants || 0
                });
            }
        } catch (error) {
            console.error('Error loading stats:', error);
            // Keep default stats values on error (already set in useState)
            // This prevents blank page
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome to SmartMeet</h1>
                    <p className="text-gray-400 text-lg">Your AI-powered meeting scheduler for seamless collaboration</p>
                </div>
                <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors duration-200 border border-navy-700">
                    <MdHome className="text-xl" />
                    <span>Return to Home</span>
                </Link>
            </div>

            {/* Stats Cards */}
            {loading ? (
                <div className="text-center py-8">
                    <p className="text-gray-400">Loading statistics...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatsCard
                        icon={MdCalendarToday}
                        title="Meetings Scheduled"
                        value={stats.meetings_scheduled.toString()}
                        change="+12%"
                        positive={true}
                    />
                    <StatsCard
                        icon={MdEmail}
                        title="Emails Sent"
                        value={stats.emails_sent.toString()}
                        change="+28%"
                        positive={true}
                    />
                    <StatsCard
                        icon={FaUsers}
                        title="Active Participants"
                        value={stats.active_participants.toString()}
                        change="+6%"
                        positive={true}
                    />
                    <StatsCard
                        icon={MdCheckCircle}
                        title="Success Rate"
                        value={`${stats.success_rate}%`}
                        change="+2%"
                        positive={true}
                    />
                </div>
            )}

            {/* Quick Actions */}
            <QuickActions />
        </div>
    );
};

export default Dashboard;
