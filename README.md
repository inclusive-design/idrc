# Inclusive Design Research Centre

[![Netlify Status](https://api.netlify.com/api/v1/badges/f40e64ad-e099-4924-9077-e5313e127631/deploy-status)](https://app.netlify.com/sites/idrc/deploys)

Website for the Inclusive Design Research Centre.

## Getting Started

To work on the project, you need to:

* Install [NodeJS and NPM](https://nodejs.org/en/download/) for your operating system
* Clone the project from GitHub. [Create a fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
with your GitHub account, then run the following in your command line (make sure to replace `your-username` with
your username):

```bash
git clone https://github.com/your-username/idrc
cd idrc
npm install
```

## How to Build

To build and serve a static version of the website, enter the following in your command line:

```bash
npm run build
npm run serve
```

The website will be available at [http://localhost:3000](http://localhost:3000).

## How to Start a Server for Development

To start the server in the development mode, enter the following in your command line:

```bash
npm start
```

The website will be available at [http://localhost:8080](http://localhost:8080).

When the server runs in a development mode, changes to the source code will automatically trigger the server to rebuild.

## How to Lint and Run Tests

To lint, enter the following in your command line:

```bash
npm run lint
```

To run tests, enter the following in your command line:

```bash
npm test
```

## How to Deploy using Docker

This website can also be served with [Docker](https://docs.docker.com/get-docker/) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t idrc .`
* Run the container: `docker run --name idrc -p 8000:80 idrc`

The website will be available at [http://localhost:8000](http://localhost:8000)

* To stop and remove the container: `docker rm -f idrc`

If you make changes to the code, repeat the steps to build the image and start a new container.
