import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoadingSpinner from './components/common/LoadingSpinner';
import { HotelProvider } from './context/HotelContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import HotelSearchPage from './pages/HotelSearchPage';
import HotelDetailPage from './pages/HotelDetailPage';
import ReservationPage from './pages/ReservationPage';
import TouristicPlacesPage from './pages/TouristicPlacesPage';
import UserProfilePage from './pages/UserProfilePage';
import AdminPanel from './pages/AdminPanel';
import SupportPage from './pages/SupportPage';
import TourListPage from './pages/TourListPage';
import TourDetailPage from './pages/TourDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TourReservationPage from './pages/TourReservationPage';
import TouristicPlaceDetailPage from './pages/TouristicPlaceDetailPage';
import ReservationConfirmationPage from './pages/ReservationConfirmationPage';

import './i18n';

// Lazy loading ile komponentleri yükle
const HomePageLazy = lazy(() => import('./pages/HomePage'));
const LoginPageLazy = lazy(() => import('./pages/LoginPage'));
const RegisterPageLazy = lazy(() => import('./pages/RegisterPage'));
const AdminPanelLazy = lazy(() => import('./pages/AdminPanel'));
const UserProfilePageLazy = lazy(() => import('./pages/UserProfilePage'));

const App = () => {
    return (
        <AuthProvider>
            <HotelProvider>
                <Router>
                    <Suspense fallback={<LoadingSpinner />}>
                        <Routes>
                            <Route path="/login" element={<LoginPageLazy />} />
                            <Route path="/register" element={<RegisterPageLazy />} />
                            <Route path="/" element={<HomePageLazy />} />
                            <Route path="/hotels" element={<HotelSearchPage />} />
                            <Route path="/hotel/:id" element={<HotelDetailPage />} />
                            <Route path="/reserve/:id" element={<ReservationPage />} />
                            <Route path="/touristic-places" element={<TouristicPlacesPage />} />
                            <Route path="/tours" element={<TourListPage />} />
                            <Route path="/tour/:id" element={<TourDetailPage />} />
                            <Route path="/tour-reserve/:id" element={<ReservationPage />} />
                            <Route path="/profile" element={<ProtectedRoute><UserProfilePageLazy /></ProtectedRoute>} />
                            <Route path="/admin" element={<ProtectedRoute><AdminPanelLazy /></ProtectedRoute>} />
                            <Route path="/contact" element={<SupportPage />} />
                            <Route path="/tour-reservation/:id" element={<TourReservationPage />} />
                            <Route path="/place/:id" element={<TouristicPlaceDetailPage />} />
                            <Route path="/reservation-confirmation" element={<ReservationConfirmationPage />} />
                        </Routes>
                    </Suspense>
                </Router>
            </HotelProvider>
        </AuthProvider>
    );
};

export default App;
