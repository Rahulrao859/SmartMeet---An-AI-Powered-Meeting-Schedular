import React from 'react';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

const StatsCard = ({ icon: Icon, title, value, change, positive }) => {
    return (
        <div className="bg-gradient-to-br from-navy-800 to-navy-700 border border-navy-600 rounded-2xl p-6 hover:border-primary-purple transition-all duration-300 hover:shadow-lg hover:shadow-primary-purple/20">
            <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-purple to-primary-blue rounded-xl flex items-center justify-center">
                    <Icon className="text-white text-2xl" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${positive ? 'text-green-400' : 'text-red-400'}`}>
                    {positive ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
                    <span>{change}</span>
                </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
            <p className="text-gray-400 text-sm">{title}</p>
        </div>
    );
};

export default StatsCard;
