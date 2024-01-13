#!/bin/bash

HERE="$(pwd)/$(dirname $0)"

cd ${HERE}/..

docker buildx build -t backend --platform linux/amd64 --load .
docker tag backend registry.digitalocean.com/fullstacktest/backend
docker push registry.digitalocean.com/fullstacktest/backend