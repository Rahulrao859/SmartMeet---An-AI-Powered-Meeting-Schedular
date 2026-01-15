import React from 'react';
import { MdTimeline, MdCheckCircle, MdSchedule, MdPersonAdd, MdEmail } from 'react-icons/md';

const Activity = () => {
    const activities = [
        { id: 1, type: 'meeting', title: 'Meeting Scheduled', description: 'Project Alpha Review with Sarah Connor', time: '10 mins ago', icon: MdSchedule, color: 'text-blue-400 bg-blue-400/10' },
        { id: 2, type: 'email', title: 'Email Sent', description: 'Invitation sent to John Doe', time: '1 hour ago', icon: MdEmail, color: 'text-purple-400 bg-purple-400/10' },
        { id: 3, type: 'user', title: 'New User Added', description: 'Alex Smith joined the workspace', time: '2 hours ago', icon: MdPersonAdd, color: 'text-green-400 bg-green-400/10' },
        { id: 4, type: 'task', title: 'Task Completed', description: 'Prepare Q4 Report marked as done', time: 'Yesterday', icon: MdCheckCircle, color: 'text-orange-400 bg-orange-400/10' },
        { id: 5, type: 'meeting', title: 'Meeting Rescheduled', description: 'Design Sync moved to Friday', time: 'Yesterday', icon: MdSchedule, color: 'text-blue-400 bg-blue-400/10' },
    ];

    return (
        <div className="p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Activity Feed</h1>
                <p className="text-gray-400">Recent actions and updates across your workspace</p>
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-navy-700 before:to-transparent">
                {activities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                        <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">

                            {/* Icon */}
                            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 border-navy-900 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${activity.color} z-10`}>
                                <Icon className="text-lg" />
                            </div>

                            {/* Content Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-navy-800 p-4 rounded-xl border border-navy-700 shadow-lg hover:border-primary-purple/50 transition-all duration-300">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-bold text-white text-sm">{activity.title}</h3>
                                    <time className="font-mono text-xs text-gray-500">{activity.time}</time>
                                </div>
                                <p className="text-gray-400 text-sm">{activity.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Activity;
