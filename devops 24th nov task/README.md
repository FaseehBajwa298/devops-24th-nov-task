# Docker & Kubernetes Demo Project

This project implements the final "project" from the referenced video: a small Node.js + Express API backed by MongoDB, packaged with Docker, runnable with Docker Compose, and deployable to Kubernetes (manifests included).

What's included
- `api/` - Node.js Express API source, Dockerfile and npm manifest
- `docker-compose.yml` - Local development stack (mongo, api, mongo-express)
- `k8s/` - Kubernetes manifests (Deployments, Services, Secret, ConfigMap)

Quick start (Docker Compose)

1. Build the API image and start the stack:

```bash
cd "${PWD%/*}"
docker-compose up --build
```

2. API will be available at http://localhost:3000
   - GET / -> basic info
   - GET /notes -> list notes
   - POST /notes -> create note (json body {"title":"...","content":"..."})

Kubernetes

1. Use Minikube or kind. Apply manifests in `k8s/`:

```bash
kubectl apply -f k8s/
```

Notes and assumptions
- The API will attempt to connect to MongoDB using `MONGODB_URI` env var. In docker-compose and k8s manifests this is provided.
- The API has a simple fallback if MongoDB is unavailable: it will run but return 503 for DB operations.

Files of interest: `api/index.js`, `api/Dockerfile`, `docker-compose.yml`, `k8s/` manifests.
