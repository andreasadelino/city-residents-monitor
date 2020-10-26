# City Residents Monitor

### Requirements to execute the app

- Docker version >= 19.03.13
- Docker-compose version >= 1.26.0 or up
- Java 14

### Commands to setup the app

Open the terminal in the root dir:

1. ./mvnw clean package -Pprod verify jib:dockerBuild -Dmaven.test.skip=true
2. docker-compose up --always-recreate-deps --build --force-recreate --remove-orphans
3. The app should be running on http://localhost:8080
