import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import HotelSearchPage from './pages/HotelSearchPage';
import HotelDetailPage from './pages/HotelDetailPage';
import ReservationPage from './pages/ReservationPage';
import TouristicPlacesPage from './pages/TouristicPlacesPage';
import TourReservationPage from './pages/TourReservationPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPanel from './pages/AdminPanel';
import SupportPage from './pages/SupportPage';
import { HotelProvider } from './context/HotelContext';
import TourListPage from './pages/TourListPage';
import TourDetailPage from './pages/TourDetailPage';

const App = () => {
    return (
        <HotelProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/hotels" element={<HotelSearchPage />} />
                    <Route path="/hotel/:id" element={<HotelDetailPage />} />
                    <Route path="/reserve/:id" element={<ReservationPage />} />
                    <Route path="/touristic-places" element={<TouristicPlacesPage />} />
                    <Route path="/tours" element={<TourListPage />} />
                    <Route path="/tour/:id" element={<TourDetailPage />} />
                    <Route path="/tour-reserve/:id" element={<ReservationPage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/contact" element={<SupportPage />} />
                </Routes>
            </Router>
        </HotelProvider>
    );
};

export default App;
