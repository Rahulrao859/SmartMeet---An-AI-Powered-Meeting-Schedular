import React, { useState, useEffect } from 'react';
import { FaPaperPlane, FaCalendarAlt, FaClock, FaUsers, FaEnvelope } from 'react-icons/fa';
import { MdSchedule } from 'react-icons/md';
import { api, handleApiError } from '../services/api';

const AIScheduler = () => {
    const [message, setMessage] = useState('');
    const [emails, setEmails] = useState('');
    const [messages, setMessages] = useState([
        {
            type: 'ai',
            text: 'Hello! I\'m your AI meeting scheduler. Tell me about the meeting you\'d like to schedule, and provide the participant emails.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
    ]);
    const [scheduledMeetings, setScheduledMeetings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load meetings on component mount
    useEffect(() => {
        loadMeetings();
    }, []);

    const loadMeetings = async () => {
        try {
            const data = await api.getMeetings();
            // Format meetings for display
            const formattedMeetings = data.meetings.map(meeting => ({
                id: meeting.id,
                title: meeting.title,
                date: formatDate(meeting.date),
                time: `${meeting.time} (${meeting.duration})`,
                participants: Array.isArray(meeting.participants) ? meeting.participants.length : 0,
                status: meeting.status,
            }));
            setScheduledMeetings(formattedMeetings);
        } catch (err) {
            console.error('Error loading meetings:', err);
        }
    };

    const formatDate = (dateStr) => {
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch {
            return dateStr;
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            setError('Please enter a meeting request');
            return;
        }

        if (!emails.trim()) {
            setError('Please enter at least one email address');
            return;
        }

        setError(null);
        setLoading(true);

        // Add user message to chat
        const userMessage = {
            type: 'user',
            text: `${message}\n📧 Emails: ${emails}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);

        try {
            // Call backend API
            const response = await api.scheduleMeeting(message, emails);

            // Add AI response
            const aiResponse = {
                type: 'ai',
                text: `✅ Meeting "${response.meeting.title}" has been scheduled!\n\n` +
                    `📅 Date: ${response.meeting.date}\n` +
                    `🕐 Time: ${response.meeting.time}\n` +
                    `⏱️ Duration: ${response.meeting.duration}\n` +
                    `💻 Platform: ${response.meeting.platform}\n\n` +
                    `📧 Emails sent: ${response.successful_emails}/${response.total_emails}\n\n` +
                    response.email_results.map(result =>
                        `${result.status === 'Sent' ? '✅' : '❌'} ${result.email}`
                    ).join('\n'),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);

            // Reload meetings to show the new one
            await loadMeetings();

            // Clear inputs
            setMessage('');
            setEmails('');

        } catch (err) {
            const errorMessage = handleApiError(err);
            setError(errorMessage);

            const aiErrorResponse = {
                type: 'ai',
                text: `❌ Error: ${errorMessage}`,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiErrorResponse]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">AI Scheduler</h1>
                <p className="text-gray-400 text-lg">Schedule meetings effortlessly with AI assistance</p>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="mb-6 bg-red-500 bg-opacity-10 border border-red-500 rounded-xl p-4">
                    <p className="text-red-400">⚠️ {error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chat Interface */}
                <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-navy-800 to-navy-700 border border-navy-600 rounded-2xl overflow-hidden h-[700px] flex flex-col">
                        {/* Chat Header */}
                        <div className="bg-navy-900 border-b border-navy-600 px-6 py-4">
                            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                                <MdSchedule className="text-primary-purple" />
                                AI Assistant
                            </h3>
                            <p className="text-gray-400 text-sm">Ask me to schedule a meeting and provide participant emails</p>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'bg-gradient-to-r from-primary-purple to-primary-blue' : 'bg-navy-600'} rounded-2xl px-4 py-3`}>
                                        <p className="text-white text-sm whitespace-pre-line">{msg.text}</p>
                                        <p className="text-gray-300 text-xs mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-navy-600 rounded-2xl px-4 py-3">
                                        <p className="text-white text-sm">⏳ Processing your request...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="bg-navy-900 border-t border-navy-600 p-4 space-y-3">
                            {/* Email Input */}
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-gray-400" />
                                <input
                                    type="text"
                                    value={emails}
                                    onChange={(e) => setEmails(e.target.value)}
                                    placeholder="Participant emails (comma-separated)"
                                    className="flex-1 bg-navy-800 border border-navy-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple transition-colors text-sm"
                                    disabled={loading}
                                />
                            </div>

                            {/* Meeting Request Input */}
                            <form onSubmit={handleSendMessage} className="flex gap-3">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Describe your meeting (e.g., 'Team standup tomorrow at 10 AM on Zoom for 30 minutes')"
                                    className="flex-1 bg-navy-800 border border-navy-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-primary-purple transition-colors"
                                    disabled={loading}
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-gradient-to-r from-primary-purple to-primary-blue hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <FaPaperPlane />
                                    {loading ? 'Sending...' : 'Send'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Scheduled Meetings */}
                <div className="lg:col-span-1">
                    <div className="bg-gradient-to-br from-navy-800 to-navy-700 border border-navy-600 rounded-2xl p-6">
                        <h3 className="text-white font-semibold text-xl mb-6 flex items-center gap-2">
                            <FaCalendarAlt className="text-primary-purple" />
                            Scheduled Meetings
                        </h3>

                        <div className="space-y-4 max-h-[600px] overflow-y-auto">
                            {scheduledMeetings.length === 0 ? (
                                <p className="text-gray-400 text-sm text-center py-8">No meetings scheduled yet</p>
                            ) : (
                                scheduledMeetings.map((meeting) => (
                                    <div
                                        key={meeting.id}
                                        className="bg-navy-900 border border-navy-600 rounded-xl p-4 hover:border-primary-purple transition-all duration-300"
                                    >
                                        <h4 className="text-white font-semibold mb-2">{meeting.title}</h4>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <FaCalendarAlt className="text-primary-blue" />
                                                <span>{meeting.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <FaClock className="text-primary-purple" />
                                                <span>{meeting.time}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <FaUsers className="text-green-400" />
                                                <span>{meeting.participants} participants</span>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span className={`text-xs px-3 py-1 rounded-full ${meeting.status === 'confirmed'
                                                ? 'bg-green-500 bg-opacity-20 text-green-400'
                                                : 'bg-yellow-500 bg-opacity-20 text-yellow-400'
                                                }`}>
                                                {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIScheduler;
