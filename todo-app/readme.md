commands ran to deploy to kubernetes:

```
docker build -t todo-app
k3d image import todo-app
kubectl apply -f manifests/deployment.yaml
```