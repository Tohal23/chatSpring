FROM openjdk:8-jdk-alpine

VOLUME /tmp

EXPOSE 8080

ADD target/chat-docker.jar chat-docker.jar

ENTRYPOINT ["java","-jar","/chat-docker.jar"]