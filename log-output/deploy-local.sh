#!/bin/bash
set -e

echo "Building string-generator docker image..."
cd string-generator
npm run docker-build

echo "Building string-server docker image..."
cd ../string-server
npm run docker-build

cd ..

echo "Importing images to kubernetes cluster..."
k3d image import log-output-generator log-output-server -m direct

echo "Deploying manifests..."
kubectl apply -f manifests