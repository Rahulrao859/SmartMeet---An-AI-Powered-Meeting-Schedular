import React, { useState, useRef } from 'react';

const MagneticButton = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Calculate distance from center
        const deltaX = mouseX - buttonCenterX;
        const deltaY = mouseY - buttonCenterY;

        // Magnetic effect strength (adjust for more/less pull)
        const strength = 0.3;

        setPosition({
            x: deltaX * strength,
            y: deltaY * strength,
        });
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
    };

    return (
        <div
            className="relative inline-block"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                ref={buttonRef}
                className="relative px-12 py-6 text-lg font-semibold text-white bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-full shadow-xl hover:bg-opacity-20 transition-all duration-300 ease-out cursor-pointer overflow-hidden group"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: isHovered ? 'all 0.15s ease-out' : 'all 0.3s ease-out',
                }}
            >
                <span className="relative z-10 tracking-wide">Explore More</span>

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-purple-400 to-pink-400 -z-10"
                    style={{ transform: 'scale(1.1)' }} />
            </button>
        </div>
    );
};

export default MagneticButton;
