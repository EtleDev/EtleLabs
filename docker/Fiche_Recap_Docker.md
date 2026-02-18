# FICHE RÉCAP DOCKER - Formation 2h
## Format: A4 Paysage - 2 Colonnes

---

## COLONNE GAUCHE: CONCEPTS & SCHÉMAS

### 🎯 L'ANALOGIE CLÉS

```
CONTENEUR = Boîte hermétique + légère
  • Tout ce qui est dedans fonctionne pareil partout
  • Boîte contient: code + dépendances + config
  • Démarre en <1s, pèse 10-500 MB
```

### 📦 IMAGE vs CONTENEUR

```
IMAGE        = DVD Windows (template)
CONTENEUR    = PC démarré (instance vivante)

De 1 image → 100 conteneurs identiques
```

### 🔗 LAYERS (Couches)

```
┌────────────────────────┐
│ Application (RW)       │ ← Layer 5
├────────────────────────┤
│ COPY /app (read-only)  │ ← Layer 4
├────────────────────────┤
│ RUN build (read-only)  │ ← Layer 3
├────────────────────────┤
│ RUN install (read)     │ ← Layer 2
├────────────────────────┤
│ Base OS (read)         │ ← Layer 1
└────────────────────────┘

Clés:
• Chaque RUN, COPY, ADD = 1 layer
• Layers en cache (rebuild rapide)
• Modifier ligne 3 → rebuild 4-5
```

### 📝 DOCKERFILE

```
Recette pour construire une image
Chaque ligne = instruction = layer

Exemple simple:
FROM base                 ← Image de base
WORKDIR /app             ← Répertoire de travail
COPY . .                 ← Copier code
RUN cmd                  ← Exécuter commande
EXPOSE 8000              ← Port (info)
CMD ["cmd"]              ← Commande au lancement
```

### 🏗️ MULTI-STAGE BUILD

```
Stage 1: BUILD (lourd, SDK)
  • Compile l'app
  • Génère binaires
  
Stage 2: FINAL (léger, runtime)
  • Copie binaires depuis Stage 1
  • Image 5-10x plus petite
  
➜ SDK jeté après build, pas dans image finale
```

### 🌐 DOCKER COMPOSE

```
Fichier YAML qui décrit votre stack:
  • Services (conteneurs)
  • Networking (communiquent par nom)
  • Volumes (données persistantes)
  • Ports (exposés à l'hôte)

Une commande:
  docker-compose up
  = Lance tous les services
```

### 🎭 RÉSEAUTAGE

```
Services Docker Compose:
  backend → communique avec → postgres
  
Pas localhost, utilise le nom du service!
  connection: "Server=postgres:5432"
  
Bridge Network = connexion automatique
```

### 📚 VOCABULAIRE

- **Registry**: Dépôt d'images (Docker Hub)
- **Pull**: Télécharger image
- **Push**: Uploader image
- **Tag**: Version (ubuntu:24.04)
- **Volume**: Stockage persistant
- **Port mapping**: Exposer ports

---

## COLONNE DROITE: COMMANDES ESSENTIELLES

### 🖼️ IMAGES

```bash
# Télécharger
docker pull ubuntu:24.04
docker pull mcr.microsoft.com/dotnet/sdk:8.0

# Construire
docker build -t mon-app:v1 .
docker build -f Dockerfile.custom -t app:v2 .

# Lister
docker images
docker images --filter "dangling=true"

# Supprimer
docker rmi mon-app:v1
docker image prune  # Supprimer images non utilisées

# Info
docker history mon-app:v1
docker inspect mon-app:v1
```

### 🚀 CONTENEURS

```bash
# Lancer
docker run -d --name myapp \
  -p 8000:5000 \
  -e VAR=value \
  mon-app:v1

# Lister
docker ps              # Actifs
docker ps -a           # Tous

# Logs
docker logs myapp
docker logs -f myapp   # Follow (temps réel)
docker logs --tail 50 myapp

# Accès
docker exec -it myapp bash
docker exec myapp cmd

# Arrêter/Démarrer
docker stop myapp
docker start myapp
docker restart myapp
docker pause myapp
docker unpause myapp

# Supprimer
docker rm myapp
docker container prune  # Supprimer arrêtés
```

### 🎭 DOCKER COMPOSE

```bash
# Démarrer
docker-compose up           # Foreground
docker-compose up -d        # Background

# Arrêter
docker-compose down         # Arrête conteneurs
docker-compose down -v      # + supprime volumes

# Logs
docker-compose logs myservice
docker-compose logs -f backend

# Accès
docker-compose exec postgres \
  psql -U user -d mydb

# Status
docker-compose ps
docker-compose ps myservice

# Build
docker-compose build
docker-compose up --build   # Build + start

# Rebuild service spécifique
docker-compose build backend
docker-compose up backend
```

### 📁 DOCKERFILE PATTERNS

```dockerfile
# Base
FROM ubuntu:24.04

# Répertoire travail
WORKDIR /app

# Copier fichiers
COPY . .
COPY file.txt /app/

# Exécuter commandes
RUN apt-get update
RUN apt-get install -y curl

# Exposer ports (info)
EXPOSE 8000

# Variables env
ENV NODE_ENV=production

# Volume
VOLUME ["/data"]

# Commande défaut
CMD ["node", "index.js"]

# Multi-stage
FROM builder AS build
RUN npm run build

FROM node:slim
COPY --from=build /app/dist .
```

### ⚙️ DOCKER DESKTOP / CLI

```bash
# Infos
docker version
docker info

# Network
docker network ls
docker network inspect bridge

# Volume
docker volume ls
docker volume inspect myvolume

# Cleanup
docker system prune          # Tout non utilisé
docker system prune -a       # + images

# Help
docker help
docker run --help
docker-compose help
```

### 🔍 DÉBOGAGE

```bash
# Quand ça ne marche pas
docker logs container-name        # Logs
docker exec -it name bash         # Entrer dedans
docker ps -a                      # Voir état
docker inspect container-name     # Détails
docker stats                      # CPU/RAM

# Port binding?
docker port container-name
netstat -tlnp | grep 5000

# Network?
docker exec myapp ping postgres   # Test DNS
```

---

## À RETENIR (3 COMMANDES CLÉS)

```bash
# Dev: Stack complète
docker-compose up

# Test: Voir ce qui se passe
docker-compose logs -f

# Prod: Orchestration
# → Docker Swarm ou Kubernetes
```

---

## RESSOURCES

- **Docker Hub:** hub.docker.com
- **Docs:** docs.docker.com
- **Formation:** KodeKloud Docker course
- **Slides:** Lien fourni
- **Repo:** Lien fourni

---

## SCHEMA: DE DEV À PROD

```
┌─────────────────┐
│  Dev Machine    │
│  docker-compose │
│    (3 services) │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Build Pipeline  │
│ docker build    │
│ (tests + image) │
└────────┬────────┘
         ↓
┌─────────────────┐
│ Staging/Prod    │
│  Kubernetes ou  │
│ Docker Swarm    │
│ (scaling +      │
│  high-avail)    │
└─────────────────┘

Même image: Dev → Staging → Prod ✓
```

