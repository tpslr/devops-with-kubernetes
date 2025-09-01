
command ran to deploy to kubernetes:

```
docker build -t log-output
k3d image import log-output
kubectl apply -f manifests/deployment.yaml
```