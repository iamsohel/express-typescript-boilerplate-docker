<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">NodeJS Boilerplate with Express, Typescript, Docker, TypeORM and Jest </h2>
</div>

## About The Project

There are a lot of section that goes into creating a production grade NodeJS application. In this repository I tried to gather as much as possible. This is an ExpressJS application with the following features.

- Typescript all the way
- EsLint, Prettier and Husky integration
- Docker
- TypeORM integration
- Logging
- Error handling in a central place
- Request Validation
- Swagger API documentation
- Dependency Injection
- Setting up Testing

Let me know what else can make this repo even better

<p align="right">(<a href="#top">back to top</a>)</p>

## Learn while building

One key difference with other similar projects is that I documented every step in the way. Following is a series of articles that will guide you on how to build this project from absolute scratch.

<p align="right">(<a href="#top">back to top</a>)</p>

## Technologies

The major technologies that were used to build this project are:

- [NodeJS](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [Docker](https://www.docker.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

Here goes the instructions to get the project up and running.

### Prerequisites

To run this project You will need the following things installed on your machine

- NodeJS
- NPM
- Docker (Optional)

### Run with Docker

It's super simple. If you already have Docker installed and running on your machine you can just run

```sh
docker-compose up
```

It will give you 3 things

1. The Express server in development mode (With hot reloading support)
2. A PostgreSQL database server (If you prefer something else like MySQL just make a couple of change inside the `docker-compose.yaml` file) The credentials are

```sh
DB_HOST = database-layer;
DB_NAME = dbname;
DB_USER = dbuser;
DB_PASSWORD = dbpassword;
```

3. A Database investigation tool named `Adminer` (You can inspect any kind of database from the browser) You can access it from `http://localhost:8080`

If you want to change or update any code you can just make the change and from the console you will see that the server is getting updated.

### Run without docker

If you don't use Docker then you will get an exception specifying you don't have any database.
TO avoid that you can do 2 things.

1. First go inside the `.env.development` file and specify the following variables of a database server that you are using.

```
DB_HOST=database-layer
DB_NAME=dbname
DB_USER=dbuser
DB_PASSWORD=dbpassword
```

2. Otherwise go inside the `index.ts` file and on line number 29 comment of the following line

```js
dbClient = await connection.sync();
```

## Project Structure

If you want to add a new route then you will goto `/routes` folder and add a new Router.
Then register that router in the `index.ts` file under the `/routes` folder.

Then you will create a Controller under the `/controllers` directory.All business logics should go into there.

Specific use cases should be handles by Service classes under the `/service` folder.

All Database related things should go under `/repositories` folder.

To create a new model for data base look into the `/models` folder.

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>