# Team Hub

A configuration driven dev team dashboard that provides organized access to team resources and a projects monitoring tool. team-hub-ui takes a JSON configuration object that drives all of its functionality.

team-hub-ui works in tandem with team-hub-api - the corresponding websockets server.

## Project Setup
```
npm install
```

## Run in Docker

##### Build:
```
docker build -t team-hub-ui:dev .
```

##### Run:
```
docker run --name team-hub-ui -p 4200:4200 team-hub-ui:dev
```

##### Run in detached mode:
```
docker run -d --name team-hub-ui -p 4200:4200 team-hub-ui:dev
```

## Development

This project requires the corresponding websockets server: **team-hub-api**.

team-hub-ui is an Angular project that provides the configurable front end of Team Hub. The configuration JSON file is in team-hub-ui/src/assets/config.json.

team-hub-api is a Nest.js project that provides a websockets server that processes the configuration JSON object from the front end. It monitors the team projects (and any dependencies) as specified in the config file.

During development you can either run both the team-hub-ui and team-hub-api projects separately, or you can use the team-hub project on my github to spin them both up in their respective docker containers with docker-compose.

## Build

TODO

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

TODO
