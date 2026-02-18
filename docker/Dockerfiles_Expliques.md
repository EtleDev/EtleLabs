# Dockerfiles pour Formation Docker

## 1. Dockerfile Simple (Démo 1)
## Fichier: Dockerfile.simple

```dockerfile
FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /app
COPY . .

CMD ["dotnet", "run"]
```

**Explication:**
- `FROM`: Image de base (SDK .NET complet)
- `WORKDIR`: Répertoire de travail dans le conteneur
- `COPY . .`: Copie le code source dans le conteneur
- `CMD`: Commande exécutée au lancement
- **Résultat:** 4 layers créées
- **Points pédagogiques:**
  - C'est simple et fonctionnel
  - Mais l'image est LOURDE (SDK inclus dans l'image finale)
  - Pas optimisé pour la prod

---

## 2. Dockerfile Multi-Stage (Démo 2 - VS Generated)
## Fichier: Dockerfile

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MonApp/MonApp.csproj", "MonApp/"]
RUN dotnet restore "MonApp/MonApp.csproj"
COPY . .
WORKDIR "/src/MonApp"
RUN dotnet build "MonApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MonApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ["dotnet", "MonApp.dll"]
```

**Explication:**

### Stage 1: `base` (fondation)
- Image légère `aspnet:8.0` (runtime seul, pas SDK)
- C'est la base où on va mettre le résultat final

### Stage 2: `build` (compilation)
- Image lourde `sdk:8.0` (avec compilateur)
- Restaure les dépendances NuGet
- Compile l'app

### Stage 3: `publish` (préparation)
- À partir du stage `build`
- Publie l'app en Release
- Génère les binaires optimisés

### Stage 4: `final` (production)
- À partir du stage `base` (léger)
- Copie UNIQUEMENT les binaires publiés
- Pas le SDK, pas les sources, rien d'inutile

**Points pédagogiques:**
- `--from=publish`: Copie depuis un autre stage
- SDK `build` n'est PAS dans l'image finale
- Image finale = ~5-10x plus petite que simple
- Conceptuellement: "Compile où tu veux, lance où c'est léger"

---

## 3. Dockerfile Optimisé (Bonus si temps)
## Fichier: Dockerfile.optimized

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copier d'abord UNIQUEMENT les fichiers .csproj
# Cela maximise le cache (ne rebuild que si .csproj change)
COPY ["MonApp/MonApp.csproj", "MonApp/"]
RUN dotnet restore "MonApp/MonApp.csproj"

# Puis copier le reste du code source
COPY . .

# Builder dans le bon répertoire
WORKDIR "/src/MonApp"
RUN dotnet build "MonApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MonApp.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# ENTRYPOINT vs CMD : nuance
# - CMD: peut être overridée à runtime
# - ENTRYPOINT: plus stricte, recommandée pour les apps
ENTRYPOINT ["dotnet", "MonApp.dll"]
```

**Optimisations expliquées:**

1. **Ordre des COPY (crucial pour le cache):**
   - D'abord les `.csproj` (changent rarement)
   - Puis le code source (change tout le temps)
   - Si code change → pas besoin de `dotnet restore`

2. **`/p:UseAppHost=false`:**
   - Réduit la taille de l'image (~50 MB économisés)
   - Utile pour les conteneurs

3. **`ENTRYPOINT` vs `CMD`:**
   - `ENTRYPOINT`: Commande "verrouillée"
   - `CMD`: Peut être remplacée à runtime
   - Ici: `ENTRYPOINT` car on VEUT toujours lancer l'app

**Points pédagogiques:**
- Layering = stratégie de cache
- Petit changement dans code = rebuild rapide
- Les détails importent pour la performance du build

---

## Utilisation lors de la démo

### Pour Démo 1 (Simple):
```bash
docker build -t mon-app:simple -f Dockerfile.simple .
docker images  # Voir la taille
```

### Pour Démo 2 & 3 (Multi-Stage):
```bash
# Montrer VS a généré exactement ça
docker build -t mon-app:multi-stage .
docker images  # Comparer les tailles

# Montrer les layers
docker history mon-app:multi-stage

# Modifier le code, rebuild (voir le cache)
docker build -t mon-app:multi-stage .  # Beaucoup plus rapide!
```

---

## Notes sur le layering

```
Dockerfile.simple:
Layer 1: FROM mcr.microsoft.com/dotnet/sdk:8.0         (2 GB)
Layer 2: WORKDIR /app
Layer 3: COPY . .
Layer 4: CMD ["dotnet", "run"]
IMAGE FINALE: ~2 GB (SDK complet dedans)

Dockerfile multi-stage:
STAGE build:
  Layer 1: FROM sdk                                     (2 GB)
  Layer 2-5: Compilation
STAGE final:
  Layer 1: FROM aspnet:8.0                              (200 MB)
  Layer 2: COPY --from=publish /app/publish .           (+50 MB)
IMAGE FINALE: ~250 MB (SDK jeté après build)

Résultat: 8x plus petit!
```

---

## Conseils pour la démo

1. **Avant la formation:** Pré-build les images en local (le build prend du temps)
2. **Pendant la démo:** 
   - Montrer `docker build` en temps réel sur Dockerfile simple
   - Montrer les layers progressivement
   - Faire `docker images` pour comparer les tailles
3. **Pas de panique si c'est lent:** Les premiers builds téléchargent les base images (~500 MB)
