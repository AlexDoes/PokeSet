# Build backend
FROM openjdk:17-slim as backend-builder
WORKDIR /app/backend
COPY Backend .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Build frontend
FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY Client/frontend/package*.json ./
RUN npm install
COPY Client/frontend .
RUN npm run build

FROM nginx:alpine
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html
COPY --from=backend-builder /app/backend/target/*.jar /app/app.jar
COPY Client/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY Backend/.env /app/.env

RUN apk add --no-cache openjdk17-jre

COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]