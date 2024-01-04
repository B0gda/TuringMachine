FROM openjdk:17-jdk-slim as builder
WORKDIR extracted
ADD ./target/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

FROM openjdk:17-jdk-slim
WORKDIR application
COPY --from=builder extracted/dependencies/ ./
COPY --from=builder extracted/spring-boot-loader/ ./
COPY --from=builder extracted/snapshot-dependencies/ ./
COPY --from=builder extracted/application/ ./

EXPOSE 8080

ENTRYPOINT ["java", "org.springframework.boot.loader.JarLauncher", "-Xms256m -Xmx2048m"]