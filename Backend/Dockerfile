FROM openjdk:17-slim as builder
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
COPY .env .env
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
