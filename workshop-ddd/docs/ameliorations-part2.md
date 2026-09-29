# Pistes d'amélioration — `workshop-ddd-part2.html`

Créé le 2026-09-25, pendant la conversion de `partie-2-domain-modeling.html`
vers `workshop-ddd-part2.html` (nouveau thème, chapitres verticaux, schémas en
HTML/CSS). La conversion elle-même est **fidèle** : rien n'a été ajouté ni
retiré du contenu. Ce fichier liste ce qui a été remarqué au passage et qui
mériterait d'être traité **dans un second temps**, sur décision d'Etienne.

Rien ici n'est appliqué. Chaque item est indépendant et peut être pris ou
écarté séparément.

## 1. Les deux « Exercice pratique » n'ont pas de consignes à l'écran

Les slides 2-5 (refacto vers des domain objects) et 5-5 (classer des objets
dans les couches) ne portent qu'un titre. Tout le reste — énoncé, durée,
corrigé — vit dans les notes de speaker, donc l'audience n'a rien sous les
yeux pendant 15 minutes d'exercice.

Proposition : une slide de consignes visible (objectif, support, durée,
livrable attendu), le corrigé restant en notes. C'est le seul item de cette
liste qui a un impact direct sur le déroulé de l'atelier.

## 2. Deux domaines d'exemple cohabitent

Le deck fait cohabiter deux fils rouges :

- **Movéo / covoiturage** — distance d'un trajet, itinéraire terrestre, prix
  d'un trajet, `passengers` dans le corrigé de l'exercice ;
- **le restaurant / la réservation de tables** — le schéma « Candidats
  d'Objets » (Hôte d'Accueil, Table de Couple, Rez-de-chaussée, Terrasse,
  Pénalité), qui est aussi le fil rouge de la partie 1 et de
  `ddd-cote-metier.html`.

Ça se tient si c'est assumé (montrer que les mêmes patterns s'appliquent à
deux domaines), mais ça n'est jamais dit à l'écran. À trancher : soit unifier
sur le restaurant pour rester dans la continuité de la partie 1, soit
introduire explicitement Movéo comme second domaine.

## 3. Du contenu marquant n'existe que dans les notes

Plusieurs notions fortes ne sont pas à l'écran aujourd'hui :

- les **exemples d'invariants** (une distance ne peut pas être négative ; dans
  le contexte Movéo, elle ne peut pas être inférieure à 200 m — faux dans
  l'absolu, pertinent dans ce contexte). C'est exactement le point que la
  slide « Invariant » cherche à faire passer ;
- **Collection-Oriented vs Persistence-Oriented**, et le fait qu'on préfère
  le collection-oriented en DDD ;
- « le design logique ne doit pas être influencé par le design physique » ;
- la **différence Architecture Hexagonale / Clean Architecture** ;
- « en DDD, on accepte la duplication de code » (et le pourquoi : formatage
  Merise / pensée relationnelle).

Les trois derniers sont dans le corrigé de l'exercice 2, donc peut-être
volontairement réservés à l'oral. Les deux premiers, eux, ressemblent à du
contenu de slide.

## 4. « Comportement = Fonction » est très elliptique

La slide tient en trois mots et n'a pas de note. Sortie de son contexte oral
elle ne se suffit pas — une phrase d'appui ou un micro-exemple aiderait.

## 5. Pas de transition vers la partie 3

Les notes de la slide « Prédiction » annoncent « quelques entités, quelques
aggregates » — c'est le sujet des parties 3 et 4, mais rien à l'écran ne fait
le lien. Une slide de transition en fin de partie donnerait le fil.

## 6. Références internes non résolues

Deux notes renvoient à une ressource non identifiable depuis le repo :
« regarder la vidéo à 2h03 » et « timecode 2h26 ». À remplacer par un lien ou
une référence durable, sinon l'information est perdue pour quelqu'un d'autre
qu'Etienne.

## 7. Mise en forme des notes de speaker

Même chantier que celui proposé dans `notes.md` pour `ddd-cote-metier.html`
(retours à la ligne markdown, listes, hiérarchie) : les notes de la partie 2
ont été reprises telles quelles, sans passe de mise en forme. À traiter en
même temps que l'autre deck, pour rester cohérent.

## 8. Images désormais inutilisées… mais pas orphelines

`img/part2/objects-candidates.png` et `img/part2/clean-architecture.png` ne
sont plus référencées par `workshop-ddd-part2.html` (converties en HTML/CSS),
mais **`partie-2-domain-modeling.html` les utilise toujours**. Ne pas les
supprimer tant que l'ancien fichier existe — même piège que pour `img/part1/`
(voir `memory.md`).

---

## Annexe — micro-corrections déjà appliquées pendant la conversion

Ce sont les seules libertés prises sur le texte. À relire, et à annuler si
l'une d'elles ne convient pas.

**Coquilles :**
- « une abstraction d'un un concept » → « d'un concept »
- « Catégorisé en temps que » → « en tant que »
- « La distance d'un trajet doit être positif » → « positive »
- « ValueObject » → « Value Object » (comme partout ailleurs dans le deck)

**Harmonisation de mise en forme** (aucun changement de sens) :
- titres de chapitre passés des capitales (`ANALYSER LES OBJETS`) à la casse
  de phrase (`Analyser les objets`), comme dans `ddd-cote-metier.html` ;
- `<h3>Langage ubiquitaire - Analyse de noms</h3>` scindé en
  `<h5>Langage ubiquitaire</h5>` + un paragraphe, le `h1` étant réservé aux
  chapitres et le `h5` étant l'intitulé de slide standard du deck ;
- `<h5>EXEMPLE</h5>` → `<h5>Exemple</h5>` ;
- « Comportement = Fonction » : `Fonction` mis en `.highlight`, comme les
  autres termes-clés du deck ;
- dans le schéma Ports & Adapters, « Requête Entrantes » / « Requête
  Sortantes » → « Requêtes entrantes » / « Requêtes sortantes ».
