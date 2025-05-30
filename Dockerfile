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

# Create necessary directories
RUN mkdir -p /usr/share/nginx/html && \
    mkdir -p /var/log/nginx

# Build dosyalarını Nginx'e kopyala
COPY --from=builder /app/build /usr/share/nginx/html/

# Public dosyalarını kopyala
COPY --from=builder /app/public /usr/share/nginx/html/

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
