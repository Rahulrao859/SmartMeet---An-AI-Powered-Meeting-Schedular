import React, { useState, useEffect } from 'react';
import { MdEmail, MdSearch, MdFilterList } from 'react-icons/md';
import { api } from '../services/api';

const EmailLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadEmailLogs();
    }, []);

    const loadEmailLogs = async () => {
        try {
            setLoading(true);
            const data = await api.getEmailLogs();
            setLogs(data.logs);
        } catch (error) {
            console.error('Error loading email logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Sent': return 'text-blue-400 bg-blue-400/10';
            case 'Delivered': return 'text-green-400 bg-green-400/10';
            case 'Opened': return 'text-purple-400 bg-purple-400/10';
            case 'Failed': return 'text-red-400 bg-red-400/10';
            case 'Bounced': return 'text-red-400 bg-red-400/10';
            default: return 'text-gray-400 bg-gray-400/10';
        }
    };

    const filteredLogs = logs.filter(log =>
        log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Email Logs</h1>
                    <p className="text-gray-400">Track and monitor all automated email communications</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={loadEmailLogs}
                        className="flex items-center gap-2 px-4 py-2 bg-navy-800 text-gray-300 rounded-lg hover:bg-navy-700 transition-colors"
                    >
                        <MdFilterList />
                        <span>Refresh</span>
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
                <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search logs by recipient, subject, or status..."
                    className="w-full bg-navy-800 text-white pl-12 pr-4 py-3 rounded-xl border border-navy-700 focus:border-primary-purple focus:outline-none transition-colors"
                />
            </div>

            {/* Logs Table */}
            {loading ? (
                <div className="bg-navy-800 rounded-xl border border-navy-700 p-8 text-center">
                    <p className="text-gray-400">Loading email logs...</p>
                </div>
            ) : filteredLogs.length === 0 ? (
                <div className="bg-navy-800 rounded-xl border border-navy-700 p-8 text-center">
                    <p className="text-gray-400">No email logs found</p>
                </div>
            ) : (
                <div className="bg-navy-800 rounded-xl border border-navy-700 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-navy-900 border-b border-navy-700">
                            <tr>
                                <th className="px-6 py-4 text-gray-400 font-medium">Recipient</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Subject</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Status</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Time</th>
                                <th className="px-6 py-4 text-gray-400 font-medium">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-navy-700">
                            {filteredLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-navy-700/50 transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{log.recipient}</td>
                                    <td className="px-6 py-4 text-gray-300">{log.subject}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{log.time}</td>
                                    <td className="px-6 py-4 text-gray-400">{log.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmailLogs;
