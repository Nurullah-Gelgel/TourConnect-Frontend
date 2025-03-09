import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { touristPlaceService } from '../services/touristPlaceService';

const TouristicPlaceDetailPage = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlaceDetails();
    }, [id]);

    const fetchPlaceDetails = async () => {
        try {
            setLoading(true);
            const data = await touristPlaceService.getPlaceById(id);
            // Backend verisini dönüştür
            const transformedPlace = {
                ...data,
                visitTimes: {
                    open: '09:00',
                    close: '17:00',
                    duration: '2 saat'
                },
                entryFee: {
                    adult: `${data.price || 0} TL`,
                    student: `${Math.floor((data.price || 0) * 0.5)} TL`,
                    museum_card: 'Ücretsiz'
                },
                facilities: [
                    'Otopark',
                    'Rehberlik',
                    'Fotoğraf Çekimi'
                ],
                transportation: {
                    car: 'Özel araçla ulaşım mümkün',
                    bus: 'Toplu taşıma mevcut',
                    taxi: 'Taksi ile ulaşılabilir'
                }
            };
            setPlace(transformedPlace);
            setError(null);
        } catch (err) {
            console.error('Yer detayları yüklenirken hata:', err);
            setError('Yer detayları yüklenirken bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-red-500 text-xl">{error}</p>
                    <button 
                        onClick={fetchPlaceDetails}
                        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Tekrar Dene
                    </button>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="bg-gray-100 min-h-screen py-8">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Başlık Resmi */}
                        <div className="relative h-96">
                            <img 
                                src={place?.image || "/place-placeholder.jpg"} 
                                alt={place?.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "/place-placeholder.jpg";
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                                <h1 className="text-4xl font-bold text-white">{place?.tourName}</h1>
                                {place?.starRating && (
                                    <div className="flex items-center mt-2">
                                        <span className="text-yellow-400">
                                            {'⭐'.repeat(place.starRating)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Sol Kolon - Ana Bilgiler */}
                                <div className="md:col-span-2 space-y-6">
                                    {/* Açıklama */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4">Hakkında</h2>
                                        <p className="text-gray-600">
                                            {place?.description || place?.location}
                                        </p>
                                    </section>

                                    {/* Ziyaret Bilgileri */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4">Ziyaret Bilgileri</h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Açılış:</span>
                                                {place?.visitTimes.open}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Kapanış:</span>
                                                {place?.visitTimes.close}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-32 font-medium">Önerilen Süre:</span>
                                                {place?.visitTimes.duration}
                                            </p>
                                        </div>
                                    </section>

                                    {/* Ulaşım */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4">Ulaşım</h2>
                                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                            <p className="flex items-center">
                                                <span className="w-8">🚗</span>
                                                {place?.transportation.car}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-8">🚌</span>
                                                {place?.transportation.bus}
                                            </p>
                                            <p className="flex items-center">
                                                <span className="w-8">🚕</span>
                                                {place?.transportation.taxi}
                                            </p>
                                        </div>
                                    </section>

                                    {/* Olanaklar */}
                                    <section>
                                        <h2 className="text-2xl font-semibold mb-4">Olanaklar</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {place?.facilities.map((facility, index) => (
                                                <span 
                                                    key={index}
                                                    className="bg-gray-100 px-4 py-2 rounded-full text-sm"
                                                >
                                                    {facility}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                </div>

                                {/* Sağ Kolon - Giriş Ücretleri ve Diğer Bilgiler */}
                                <div className="md:col-span-1">
                                    <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                                        <h2 className="text-2xl font-semibold mb-4">Giriş Ücretleri</h2>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span>Tam</span>
                                                <span className="font-semibold">{place?.entryFeeAdult}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Öğrenci</span>
                                                <span className="font-semibold">{place?.entryFeeStudent}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>Müzekart</span>
                                                <span className="font-semibold">{place?.entryFeeMuseum}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t">
                                            <h3 className="font-semibold mb-2">İletişim</h3>
                                            <p className="text-gray-600">{place?.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default TouristicPlaceDetailPage; 