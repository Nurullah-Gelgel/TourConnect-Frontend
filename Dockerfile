# Build stage
FROM node:18-alpine as builder

WORKDIR /app

# Package files kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install --legacy-peer-deps

# Tüm kaynak kodları kopyala
COPY . .

# Production build oluştur
RUN npm run build

# Production stage
FROM nginx:alpine

# Build dosyalarını Nginx'e kopyala
COPY --from=builder /app/build /usr/share/nginx/html

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
