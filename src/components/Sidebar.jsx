import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdCalendarToday, MdEmail, MdTimeline, MdSettings, MdHome } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Dashboard', icon: MdDashboard, path: '/dashboard' },
        { name: 'AI Scheduler', icon: FaRobot, path: '/ai-scheduler' },
        { name: 'Calendar', icon: MdCalendarToday, path: '/calendar' },
        { name: 'Email Logs', icon: MdEmail, path: '/email-logs' },
        { name: 'Activity', icon: MdTimeline, path: '/activity' },
        { name: 'Settings', icon: MdSettings, path: '/settings' },
    ];

    return (
        <div className="w-64 h-screen bg-navy-900 dark:bg-navy-900 bg-white border-r border-navy-700 dark:border-navy-700 border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-navy-700 dark:border-navy-700 border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-purple to-primary-blue rounded-lg flex items-center justify-center">
                        <FaRobot className="text-white text-xl" />
                    </div>
                    <div>
                        <h1 className="text-white dark:text-white text-gray-900 font-bold text-lg">SmartMeet</h1>
                        <p className="text-gray-400 dark:text-gray-400 text-gray-600 text-xs">AI Meeting Scheduler</p>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-6 px-3">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-primary-purple to-primary-blue text-white'
                                : 'text-gray-400 dark:text-gray-400 text-gray-600 hover:bg-navy-800 dark:hover:bg-navy-800 hover:bg-gray-100 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Icon className="text-xl" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* AI Assistant Button */}
            <div className="p-4 border-t border-navy-700 dark:border-navy-700 border-gray-200">
                <button onClick={() => navigate('/ai-scheduler')} className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white hover:from-purple-700 hover:to-blue-700 transition-all duration-200">
                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">AI</span>
                    </div>
                    <div className="text-left">
                        <p className="font-semibold text-sm">AI Assistant</p>
                        <p className="text-xs text-gray-200">Always Available</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
