# TourConnect Projesi

Bu proje, tur operatörleri ve müşterileri arasında bağlantı kuran bir web uygulamasıdır. React frontend, Spring Boot backend ve PostgreSQL veritabanı kullanılarak geliştirilmiştir.

## Proje Yapısı

```
tour-connect/
├── frontend/           # React uygulaması
├── backend/           # Spring Boot uygulaması
└── nginx/             # Nginx konfigürasyonları
```

## Gereksinimler

- Docker
- Node.js 18+
- Java 17+
- PostgreSQL 13+

## Kurulum Adımları

### 1. Docker Network Oluşturma

```bash
docker network create rahvantur-network
```

### 2. PostgreSQL Container'ı Başlatma

```bash
docker run -d \
  --name rahvantur-postgres \
  --network rahvantur-network \
  -p 5433:5432 \
  -e POSTGRES_DB=rahvantur \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  postgres:13
```

### 3. Backend Container'ı Oluşturma ve Başlatma

```bash
# Backend dizinine git
cd backend

# Maven ile build
mvn clean package

# Docker image oluştur
docker build -t rahvantur-backend .

# Container'ı başlat
docker run -d \
  --name rahvantur-backend \
  --network rahvantur-network \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://rahvantur-postgres:5432/rahvantur \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=your_password \
  rahvantur-backend
```

### 4. Frontend Container'ı Oluşturma ve Başlatma

```bash
# Frontend dizinine git
cd frontend

# Bağımlılıkları yükle
npm install

# Production build
npm run build

# Docker image oluştur
docker build -t rahvantur-frontend .

# Container'ı başlat
docker run -d \
  --name rahvantur-frontend \
  --network rahvantur-network \
  -p 3000:80 \
  rahvantur-frontend
```

### 5. Nginx Container'ı Başlatma

```bash
# Nginx image'ını çek
docker pull nginx:latest

# Container'ı başlat
docker run -d \
  --name rahvantur-nginx \
  --network rahvantur-network \
  -p 80:80 \
  -p 443:443 \
  -v $(pwd)/nginx/nginx.conf:/etc/nginx/conf.d/default.conf \
  nginx:latest
```

## Docker Servisleri

### Frontend (React)
- Port: 3000
- Container: rahvantur-frontend
- Image: rahvantur-frontend
- Network: rahvantur-network

### Backend (Spring Boot)
- Port: 8080
- Container: rahvantur-backend
- Image: rahvantur-backend
- Network: rahvantur-network

### Database (PostgreSQL)
- Port: 5433
- Container: rahvantur-postgres
- Image: postgres:13
- Network: rahvantur-network

### Nginx
- Port: 80, 443
- Container: rahvantur-nginx
- Image: nginx:latest
- Network: rahvantur-network

## Nginx Konfigürasyonu

Nginx, frontend ve backend servisleri arasında reverse proxy olarak çalışır. Konfigürasyon dosyaları:

- `nginx.conf`: Ana Nginx konfigürasyonu
- `default.conf`: Site-spesifik konfigürasyon

## Docker Komutları

### Container Yönetimi

```bash
# Container'ları listele
docker ps

# Container loglarını görüntüle
docker logs rahvantur-frontend
docker logs rahvantur-backend
docker logs rahvantur-nginx

# Container'ı yeniden başlat
docker restart rahvantur-frontend

# Container'ı durdur
docker stop rahvantur-frontend

# Container'ı sil
docker rm rahvantur-frontend
```

### Image Yönetimi

```bash
# Image'ları listele
docker images

# Image'ı sil
docker rmi rahvantur-frontend

# Image'ı yeniden build et
docker build -t rahvantur-frontend .
```

## Sorun Giderme

### Frontend Sorunları

1. Logo ve statik dosyalar yüklenmiyorsa:
   - Nginx konfigürasyonunu kontrol et
   - Docker volume'larını kontrol et
   - Container loglarını incele

2. API bağlantı sorunları:
   - Network bağlantısını kontrol et
   - Backend servisinin çalıştığından emin ol
   - API endpoint'lerini kontrol et

### Backend Sorunları

1. Veritabanı bağlantı sorunları:
   - PostgreSQL container'ının çalıştığından emin ol
   - Veritabanı bağlantı bilgilerini kontrol et
   - Network bağlantısını kontrol et

2. API hataları:
   - Log dosyalarını kontrol et
   - API endpoint'lerini test et
   - CORS ayarlarını kontrol et

## Güvenlik

- Tüm servisler Docker network içinde izole edilmiştir
- Nginx SSL/TLS konfigürasyonu için sertifika gereklidir
- API endpoint'leri için authentication gereklidir
- Veritabanı bağlantıları şifrelenmiştir

## Deployment

### Production Ortamı

1. SSL sertifikalarını hazırla
2. Environment değişkenlerini ayarla
3. Container'ları sırasıyla başlat:
   - PostgreSQL
   - Backend
   - Frontend
   - Nginx
4. Nginx konfigürasyonunu kontrol et
5. Log'ları monitör et

### Monitoring

- Docker container logları
- Nginx access/error logları
- Backend uygulama logları
- Veritabanı logları

## Geliştirme

### Frontend Geliştirme

```bash
cd frontend
npm install
npm start
```

### Backend Geliştirme

```bash
cd backend
mvn spring-boot:run
```

## Lisans

Bu proje özel lisans altında dağıtılmaktadır. Tüm hakları saklıdır.
