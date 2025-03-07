import React, { createContext, useState } from 'react';

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]); // State to hold hotel data

    return (
        <HotelContext.Provider value={{ hotels, setHotels }}>
            {children}
        </HotelContext.Provider>
    );
}; 