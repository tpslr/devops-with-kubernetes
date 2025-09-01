
command ran to deploy to kubernetes:

```
docker build -t log-output
k3d image import log-output
kubectl create deployment log-output --image=log-output
```