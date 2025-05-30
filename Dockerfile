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
COPY --from=builder /app/build /usr/share/nginx/html/
COPY --from=builder /app/public /usr/share/nginx/html/public

# Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
