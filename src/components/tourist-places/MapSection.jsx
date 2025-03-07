import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapSection = ({ center, places, selectedPlace, setSelectedPlace }) => {
    return (
        <div className="mb-8 h-[400px] rounded-lg overflow-hidden shadow-lg">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={center}
                    zoom={12}
                >
                    {places.map(place => (
                        <Marker
                            key={place.id}
                            position={place.position}
                            onClick={() => setSelectedPlace(place)}
                        />
                    ))}

                    {selectedPlace && (
                        <InfoWindow
                            position={selectedPlace.position}
                            onCloseClick={() => setSelectedPlace(null)}
                        >
                            <div className="max-w-xs">
                                <h3 className="font-semibold">{selectedPlace.name}</h3>
                                <p className="text-sm">{selectedPlace.description}</p>
                                <button 
                                    className="mt-2 text-blue-500 text-sm"
                                    onClick={() => {
                                        document
                                            .getElementById(`place-${selectedPlace.id}`)
                                            .scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Detayları Gör
                                </button>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapSection; 