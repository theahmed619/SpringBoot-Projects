# Build stage with Java 21
FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /todoapp
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage with Java 21
FROM eclipse-temurin:21-jdk-alpine

WORKDIR /todoapp
COPY --from=build /todoapp/target/*.jar app.jar

EXPOSE 8090
ENTRYPOINT ["java", "-jar", "app.jar"]
