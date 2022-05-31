#! /bin/bash

if [ -z "$1" ];  then
        echo "  [!] No argument supplied, this script expects a docker tag to run."
        exit 1
fi

tag=$1
image="gcr.io/treeo-dev/treeo-api-develop"

echo "[>] Starting deployment"

# echo "  [+] Remove containers, volume and networks older than 1 week..."
# docker system prune --force --filter "until=168h"

# cd /docker

echo "  [+]  GithubActions commit ID: $tag"

echo "  [+]  Pull image $image:$tag"
pull=$(docker pull $image:$tag)

# Check if docker pull returns empty string
if [[ -z "$pull" ]]; then
        echo "  [!] Fail to pull image with tag $tag"
        exit 1
fi

echo "[>] exporting tag $tag to environment"
export tag=$tag
echo $tag


echo "  [+] Start (or Restart) containers: docker-compose -f deployment.yaml up"
TAG=$tag docker-compose -f deployment.yaml up -d

echo "[>] Deployment done."

# echo "Get latest migration file"

# migration= $(find . -type f -printf '%T@ %p\n' | sort -n | tail -1 | cut -f2- -d" ")
# echo $migration
