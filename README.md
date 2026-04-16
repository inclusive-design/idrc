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
npx serve _site
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

## Release Process

Changelogs and releases are handled by [release-please](https://github.com/googleapis/release-please-action). We use a
modified versioning scheme based on [calendar versioning](https://calver.org/) in the form `YYYY.MM.MICRO` (where
`MICRO`, the third and final number in the version, indicates a patch, starting at 0 within each month's sequence of releases).

Prior to release, commit and push a single commit to bump the version appropriately:

```bash
git commit --allow-empty -m "chore: prepare release

Release-As: 2026.4.2"
```

(In this example, that would be the third release for April 2026 for a given package.)

Once that commit is in the version history, release-please will update the release pull request to the new version and
it can be merged.

