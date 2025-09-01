commands ran to deploy to kubernetes:

```
docker build -t todo-app
k3d image import todo-app
kubectl create deployment todo-app --image=todo-app
```