# Treeo REST Service
A restful service for treeo.

- [NodeJS](https://nodejs.org/en/)
- [NestJS](https://nestjs.com/)

## Installation
### Requirements
Before you get started, the following need to be installed:

- **[NodeJS](https://nodejs.org/en/)**. ***Version 14*** and above is currently used and we don't guarantee everything works with other versions. If you need to work with multiple versions of NodeJS, [NVM](https://github.com/nvm-sh/nvm/blob/master/README.md) is recommended.
- **[NestJS](https://nestjs.com/)**. ***Version 7.5.1*** is currently used to build our restful service. We don't guarantee everything works with other versions.
- **[npm](https://www.npmjs.com/)**. We are currently using npm to manage our dependancies.

## Running locally
Clone the repo
```
git clone https://github.com/fairventures-worldwide/treeo2-rest-service
```
cd into the repo
```
cd treeo2-rest-service
```
Install dependancies
```
npm install
```
Run the application
```
npm run start
```
Run the application on **hot-reload**
```
npm tun start:dev
```
## Unit testing
Running unit tests
```
npm run test
```
Running unit tests with coverage
```
npm run test:cov
```
## Run the App with Docker

create a .env file with contents `PORT=9001`

```bash
$ docker build . -t treeo

$ docker run -p 9001:9001 treeo
```

The application is now available on localhost:9001

## Access database in docker-compose
```
docker exec -ti NAME_OF_CONTAINER psql -U YOUR_POSTGRES_USERNAME
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
