# DevOps 24th Nov Task

Node.js + Express API with MongoDB, packaged for Docker, runnable via Docker Compose, and deployable to Kubernetes.

## Structure
- `devops 24th nov task/api/` API source with `Dockerfile` and `package.json`
- `devops 24th nov task/docker-compose.yml` Local stack (MongoDB, API, Mongo Express)
- `devops 24th nov task/k8s/` Kubernetes manifests (Namespace, Secret, Deployments, Services)

## Quick Start (Docker Compose)
```bash
cd "devops 24th nov task"
docker-compose up --build
```
API: `http://localhost:3000`

## Kubernetes
```bash
kubectl apply -f "devops 24th nov task/k8s/"
```

## Notes
- API uses `MONGODB_URI` environment variable provided in compose/manifests.
- If MongoDB is unavailable, API serves but DB endpoints return 503.