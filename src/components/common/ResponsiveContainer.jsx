import React from 'react';

const ResponsiveContainer = ({ children, className = "" }) => {
    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${className}`}>
            {children}
        </div>
    );
};

export default ResponsiveContainer; 