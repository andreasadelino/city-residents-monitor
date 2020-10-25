# CityResidentTrack

### Requirements to execute the app

- Docker
- Docker-compose
- Java 14

### Commands to setup the app

Open the terminal and go to the root dir.:

1. ./mvnw clean package -Pprod verify jib:dockerBuild -Dmaven.test.skip=true
2. docker-compose up --always-recreate-deps --build --force-recreate --remove-orphans
