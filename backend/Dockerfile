# Stage 1: Build (Maven + JDK 17)
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Copy pom.xml first to leverage Docker layer caching for dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy source and build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Runtime (Slim JRE 17)
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Render usually uses 10000 or a dynamic $PORT
EXPOSE 10000

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]