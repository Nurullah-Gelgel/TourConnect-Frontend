import React from 'react';

const ResponsiveTable = ({ children }) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg">
            <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default ResponsiveTable; 