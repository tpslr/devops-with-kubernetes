#!/bin/bash
set -e

echo "Building frontend docker image..."
cd frontend
npm run docker-build

echo "Building backend docker image..."
cd ../backend
npm run docker-build

cd ..

echo "Importing images to kubernetes cluster..."
k3d image import todo-app todo-app-backend -m direct

echo "Deploying manifests..."
kubectl delete -f manifests --ignore-not-found
kubectl apply -f manifests