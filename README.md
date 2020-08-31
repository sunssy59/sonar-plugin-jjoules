# sonar-plugin-jjoules

## BUILD

To build the project, use this command from the project root directory:
	
	git clone https://github.com/Mamadou59/sonar-plugin-jjoules
	cd sonar-plugin-jjoules
	mvn clean package

The plugin JAR file will be generated in the project's target/ directory.

### RUNNING SONARQUBE ON DOCKER

To run sonarqube on docker container you can use this docker-compose file which is in the repository `src/main/ressources
	

## DEPLOY

The standard way to install the plugin in SonarQube is to copy the JAR file from the target/ directory to the extensions/plugins/ directory of your SonarQube installation and restart the server.

##### Example 
	
	cd sonar-plugin-jjoules
	chmod u+x ./target/sonar-jjoules-plugin-8.1.0.jar
	docker ps
	
	docker cp ./target/sonar-jjoules-plugin-8.1.0.jar SONAR_CONTAINER_ID:/opt/sonarqube/extensions/plugins
	docker restart ${CONTAINER_ID}
	
Don't forget to replace `SONAR_CONTAINER_ID` by sonar docker container ID.


## ANALYSE A PROJECT 

With these maven goals you can analyse your project in SonarQube

	mvn clean test sonar:sonar
