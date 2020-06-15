FROM maven:3.6.0-jdk-11-slim AS build

COPY src /home/sonar-plugin-jjoules/src
COPY pom.xml /home/sonar-plugin-jjoules
COPY package.json /home/sonar-plugin-jjoules
COPY scripts /home/sonar-plugin-jjoules/scripts
COPY conf /home/sonar-plugin-jjoules/conf

RUN mvn -f /home/sonar-plugin-jjoules/pom.xml clean package

workdir /home/sonar-plugin-jjoules
