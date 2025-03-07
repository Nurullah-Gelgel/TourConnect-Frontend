// Verileri ayrı bir dosyada tutuyoruz
export const categories = [
    { id: 'all', name: 'Tümü' },
    { id: 'historical', name: 'Tarihi Yerler' },
    { id: 'nature', name: 'Doğal Güzellikler' },
    { id: 'culture', name: 'Kültürel Mekanlar' },
    { id: 'religious', name: 'Dini Mekanlar' },
    { id: 'museum', name: 'Müzeler' }
];

export const seasons = [
    { id: 'all', name: 'Tüm Sezonlar' },
    { id: 'spring', name: 'İlkbahar' },
    { id: 'summer', name: 'Yaz' },
    { id: 'autumn', name: 'Sonbahar' },
    { id: 'winter', name: 'Kış' }
];

export const touristicPlaces = [
    {
        id: 1,
        name: "Van Kalesi",
        category: "historical",
        position: { lat: 38.4977, lng: 43.3426 },
        image: "/images/van-kalesi.jpg",
        description: "Urartu Krallığı döneminde inşa edilen tarihi kale",
        bestSeasons: ["spring", "summer", "autumn"],
        visitTimes: {
            open: "08:00",
            close: "19:00",
            duration: "2-3 saat"
        },
        entryFee: {
            adult: "30 TL",
            student: "15 TL",
            museum_card: "Ücretsiz"
        },
        facilities: ["Rehberlik Hizmeti", "Otopark", "Hediyelik Eşya", "Kafeterya"],
        transportation: {
            car: "Şehir merkezinden 10 dakika",
            bus: "12 numaralı otobüs ile ulaşım",
            taxi: "Yaklaşık 30 TL"
        }
    },
    // Diğer turistik yerler...
]; 