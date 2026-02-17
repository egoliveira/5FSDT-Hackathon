FROM node:24-slim

FROM eclipse-temurin:17-jdk-focal AS build
WORKDIR /app
COPY backend/build.gradle.kts .
COPY backend/gradlew .
COPY backend/gradle gradle
COPY backend/question.yaml .
COPY backend/settings.gradle.kts .
COPY backend/src src
RUN ./gradlew clean assemble

FROM eclipse-temurin:17-jre-focal

EXPOSE $BACKEND_DOCKER_PORT

WORKDIR /app
COPY --from=build /app/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]
