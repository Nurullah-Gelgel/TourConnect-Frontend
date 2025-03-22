import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import HotelSearchPage from './pages/HotelSearchPage';
import HotelDetailPage from './pages/HotelDetailPage';
import ReservationPage from './pages/ReservationPage';
import TouristicPlacesPage from './pages/TouristicPlacesPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPanel from './pages/AdminPanel';
import SupportPage from './pages/SupportPage';
import { HotelProvider } from './context/HotelContext';
import TourListPage from './pages/TourListPage';
import TourDetailPage from './pages/TourDetailPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TourReservationPage from './pages/TourReservationPage';
import TouristicPlaceDetailPage from './pages/TouristicPlaceDetailPage';
import './i18n';

const App = () => {
    return (
        <AuthProvider>
            <HotelProvider>
                <Router>
                    <Routes>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/hotels" element={<HotelSearchPage />} />
                        <Route path="/hotel/:id" element={<HotelDetailPage />} />
                        <Route path="/reserve/:id" element={<ReservationPage />} />
                        <Route path="/touristic-places" element={<TouristicPlacesPage />} />
                        <Route path="/tours" element={<TourListPage />} />
                        <Route path="/tour/:id" element={<TourDetailPage />} />
                        <Route path="/tour-reserve/:id" element={<ReservationPage />} />
                        <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
                        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                        <Route path="/contact" element={<SupportPage />} />
                        <Route path="/tour-reservation/:id" element={<TourReservationPage />} />
                        <Route path="/place/:id" element={<TouristicPlaceDetailPage />} />
                    </Routes>
                </Router>
            </HotelProvider>
        </AuthProvider>
    );
};

export default App;
