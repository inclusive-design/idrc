# Inclusive Design Research Centre

[![Netlify Status](https://api.netlify.com/api/v1/badges/f40e64ad-e099-4924-9077-e5313e127631/deploy-status)](https://app.netlify.com/sites/idrc/deploys)

Website for the Inclusive Design Research Centre.

## How to Deploy using Docker

This website can also be served with [Docker](https://docs.docker.com/get-docker/) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

- Build the image: `docker build -t idrc .`
- Run the container: `docker run --name idrc -p 8000:80 idrc`

The website will be available at [http://localhost:8000](http://localhost:8000)

- To stop and remove the container: `docker rm -f idrc`

If you make changes to the code, repeat the steps to build the image and start a new container.
