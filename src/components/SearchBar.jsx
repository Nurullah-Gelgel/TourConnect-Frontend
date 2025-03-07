// src/components/SearchBar.js
import React from 'react';

const SearchBar = () => {
    return (
        <div className="flex justify-center">
            <input
                type="text"
                placeholder="Otel veya tur arayın..."
                className="border border-gray-300 rounded-l-lg p-2 w-1/2"
            />
            <button className="bg-blue-500 text-white rounded-r-lg px-4">Ara</button>
        </div>
    );
};

export default SearchBar;