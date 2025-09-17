
command ran to deploy to kubernetes:

```
docker exec k3d-k3s-default-agent-0 sh -c "mkdir -p /tmp/kube && chmod 777 /tmp/kube"

kubectl apply -f ../persistentvolume.yaml
kubectl apply -f ../persistentvolumeclaim.yaml

cd ../ping-pong
npm run deploy-local
cd ../log-output
./deploy-local.sh
```

status endpoint: /status
ping endpoint: /pingpong

