chmod u+x target/sonar-jjoules-plugin-8.1.0.jar

docker cp target/sonar-jjoules-plugin-8.1.0.jar cd7803b793f2:/opt/sonarqube/extensions/plugins
docker-compose restart
