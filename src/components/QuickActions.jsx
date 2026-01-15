import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRobot, FaCalendarAlt, FaEnvelope, FaLink } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

const QuickActions = () => {
    // const navigate = useNavigate();

    const actions = [
        {
            icon: FaRobot,
            title: 'Schedule a Meeting using AI',
            description: 'Use natural language to create meetings instantly',
            color: 'from-purple-600 to-purple-700',
            path: '/ai-scheduler'
        },
        {
            icon: FaCalendarAlt,
            title: 'View Upcoming Meetings',
            description: 'See all your scheduled meetings at a glance',
            color: 'from-blue-600 to-blue-700',
            path: '/calendar'
        },
        {
            icon: FaEnvelope,
            title: 'Email Automation Logs',
            description: 'Track all sent invitations and their status',
            color: 'from-red-600 to-red-700',
            path: '/email-logs'
        },
        {
            icon: FaLink,
            title: 'Calendar Integrations',
            description: 'Connect Google, Outlook, and Zoom seamlessly',
            color: 'from-green-600 to-green-700',
            path: '/calendar'
        },
    ];

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                        <div
                            key={index}
                            // onClick={() => navigate(action.path)}
                            className="bg-gradient-to-br from-navy-800 to-navy-700 border border-navy-600 rounded-2xl p-6 hover:border-primary-purple transition-all duration-300 hover:shadow-lg hover:shadow-primary-purple/20 cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                    <Icon className="text-white text-2xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-white font-semibold text-lg mb-2">{action.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3">{action.description}</p>
                                    <button className="text-primary-purple text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
                                        Get Started
                                        <MdArrowForward />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default QuickActions;
