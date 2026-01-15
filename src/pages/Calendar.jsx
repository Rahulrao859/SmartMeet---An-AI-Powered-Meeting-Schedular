import React, { useState } from 'react';
import { FaCheck, FaPlus, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiZoom, SiGooglecalendar } from 'react-icons/si';
import { MdEmail, MdVideocam } from 'react-icons/md';

const Calendar = () => {
    const [connectedCalendars, setConnectedCalendars] = useState([
        {
            id: 1,
            name: 'Google Calendar',
            email: 'user@company.com',
            icon: SiGooglecalendar,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            connected: true,
        }
    ]);

    const [availableIntegrations, setAvailableIntegrations] = useState([
        {
            id: 2,
            name: 'Outlook Calendar',
            description: 'Connect your Outlook calendar to sync meetings',
            icon: MdEmail,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            id: 3,
            name: 'Zoom',
            description: 'Automatically generate Zoom links for meetings',
            icon: SiZoom,
            color: 'text-blue-400',
            bgColor: 'bg-blue-400/10',
        },
        {
            id: 4,
            name: 'Microsoft Teams',
            description: 'Sync Teams status and create meeting links',
            icon: MdVideocam,
            color: 'text-indigo-500',
            bgColor: 'bg-indigo-500/10',
        }
    ]);

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Calendar Integrations</h1>
                <p className="text-gray-400 text-lg">Manage your connected calendars and meeting platforms</p>
            </div>

            {/* Connected Calendars Section */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold text-white mb-4">Connected Calendars</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connectedCalendars.map((cal) => (
                        <div key={cal.id} className="bg-gradient-to-br from-navy-800 to-navy-700 border border-navy-600 rounded-2xl p-6 flex items-center justify-between group hover:border-primary-purple transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${cal.bgColor} rounded-xl flex items-center justify-center`}>
                                    <cal.icon className={`text-2xl ${cal.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">{cal.name}</h3>
                                    <p className="text-gray-400 text-sm">{cal.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="flex items-center gap-1 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
                                    <FaCheck className="text-xs" />
                                    Synced
                                </span>
                                {/* Toggle Switch */}
                                <div className="w-12 h-6 bg-primary-purple rounded-full relative cursor-pointer ml-2">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Available Integrations Section */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Available Integrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableIntegrations.map((integration) => (
                        <div key={integration.id} className="bg-navy-900 border border-navy-700 rounded-2xl p-6 hover:border-navy-500 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 ${integration.bgColor} rounded-xl flex items-center justify-center`}>
                                    <integration.icon className={`text-2xl ${integration.color}`} />
                                </div>
                                <button className="text-white bg-navy-700 hover:bg-navy-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                                    <FaPlus className="text-xs" />
                                    Connect
                                </button>
                            </div>
                            <h3 className="text-white font-semibold text-lg mb-2">{integration.name}</h3>
                            <p className="text-gray-400 text-sm">{integration.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
