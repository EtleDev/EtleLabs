# Exercices en séance — découpage sur 5 séances

Adaptation du [workshop original sur 7 sessions](../ancyr/exercices/).

Les exercices **réalisés pendant la séance**, sur board ou en code, par opposition
aux [devoirs](../homeworks/) faits entre deux séances.

Les séances 2 à 5 ont été reconverties en `workshop-ddd-part*.html` ; la séance 1
et le bonus tournent encore sur les `partie-*.html` d'origine, pas encore
reprises. Le découpage est déjà matérialisé dans les decks : chaque exercice correspond à une
slide `<h2>Exercice pratique</h2>`, dont les notes du présentateur portent l'énoncé,
les consignes, la durée et les pistes de débrief. **Les énoncés restent dans les
notes** — ils ne sont pas repris ici, pour que les élèves ne puissent pas les lire
en avance. Ce dossier ne contient que les **canevas** et les **solutions**.

## Correspondance

| # | Séance | Deck | Chapitre | Exercice | Durée | Origine |
|---|---|---|---|---|---|---|
| 1 | 1 — Domain Discovery | `partie-1-domain-discovery.html` | Subdomains patterns | Classer les subdomains de Moveo | — | S1 ex. 1 |
| 2 | 1 | `partie-1-domain-discovery.html` | Rendre l'implicite explicite | Use cases : main course / alternative course | — | S1 ex. 2 |
| 3 | 1 | `partie-1-domain-discovery.html` | Analyser les use cases | Nommer les use cases | — | S1 ex. 2 |
| 4 | 2 — Domain Modeling | `workshop-ddd-part2.html` | Domain objects | Exercice de refacto | 15 mn | S2 Refactoring |
| 5 | 2 | `workshop-ddd-part2.html` | Architecture | Trier les objets par nature | 10-15 mn | S2 Domain/App Services |
| 6 | 3 — Entities | `workshop-ddd-part3.html` | Repositories | Le trilemme du DDD | 10 mn | S3 Purity & Completeness |
| 7 | 3 | `workshop-ddd-part3.html` | Policy pattern | Strategy vs Template Method | — | S3 Policy Pattern |
| 8 | 3 | `workshop-ddd-part3.html` | Policy pattern | Implémenter la policy | 20-25 mn | S3 Policy Pattern |
| 9 | 4 — Aggregates | `workshop-ddd-part4.html` | Aggregates | Graphe d'objets (intro) | 5-10 mn | S4 Graphe d'Objet |
| 10 | 4 | `workshop-ddd-part4.html` | Aggregates | Frontières d'agrégats | 20 mn | S4 Aggregates Boundaries |
| 11 | 4 | `workshop-ddd-part4.html` | Domain events | Patterns de domain events | 7 mn | S5 Patterns de Domain Events |
| 12 | 4 | `workshop-ddd-part4.html` | Domain events | Identifier les domain events | 15 mn | S5 Domain Events |
| 13 | 4 | `workshop-ddd-part4.html` | La dernière règle des aggregates | Persistance du domaine | 10-15 mn | S6 Domain Persistence |
| 14 | 5 — Bounded Context | `workshop-ddd-part5.html` | Intégrer les bounded contexts | Shared model / Direct / Asynchronous | 15 mn | master séance 5 |
| 15 | bonus | `partie-bonus-pratiques.html` | Event storming | Event Storming du parcours Moveo | 30-45 mn | master bonus |

## Confirmé par le master board Lucid

Le master est découpé en **5 séances + un bonus**, et ses sections confirment la
correspondance ci-dessus :

| Séance | Sections du master |
|---|---|
| 1 | Domain discovery · Usecase Mapping (+ 2 blocs Solution) |
| 2 | Refactoring · Domain / application services |
| 3 | Purity & Completeness · Policies · Policy pattern |
| 4 | Graphe d'objets · Aggregates boundaries (discussion + exercice) · Domain Events Patterns · Domain Events |
| 5 | Intégration des contexts |
| bonus | Event Storming |

**Les deux trous sont comblés.** Le master dit ce que sont les exercices 14 et 15,
mais ne porte ni consignes ni durée pour eux. Des brouillons reconstitués à partir du
contenu des boards attendent relecture dans [notes-a-integrer.md](notes-a-integrer.md) ;
une fois validés, ils rejoindront les notes des decks.

**Trois écarts avec le workshop original :**

1. **L’exercice 13 (Persistance du domaine) manquait au master.** Aucune trace de
   *Domain Persistence* ni de *Capacity Rule Pattern* : oubli non volontaire de la
   première itération, confirmé par Etienne. **Réintégré** dans les exercices finaux,
   à partir de la séance 6 du workshop original.
2. **Le bonus a changé de sujet.** Chez Ancyr c'était les stratégies de test
   (Gherkin / driver maison) ; dans le master c'est un **Event Storming** — ce qui
   colle au chapitre du deck `partie-bonus-pratiques.html`.
3. **Le vocabulaire a bougé.** Le master dit **passager** (37 occurrences) là où le
   board d'avril disait *covoituré* / *covoitureur* (9). Les canevas doivent suivre
   le master, puisque c'est le langage que tu emploies maintenant.

## Canevas

Un fichier Excalidraw par exercice, en deux versions — le canevas vierge diffusé en
séance, et la solution réservée à l'animateur :

```
exercices/seance-1/
  01-subdomains-canevas.excalidraw        exercice 1
  01-subdomains-solution.excalidraw
  02-usecase-mapping-canevas.excalidraw   exercices 2 et 3
  02-usecase-mapping-solution.excalidraw
exercices/seance-2/
  04-refacto-canevas.excalidraw           exercice 4
  04-refacto-solution.excalidraw
  05-tri-objets-canevas.excalidraw        exercice 5
  05-tri-objets-solution.excalidraw
exercices/seance-3/
  06-trilemme-canevas.excalidraw          exercice 6
  06-trilemme-solution.excalidraw
  07-strategy-vs-template-canevas.excalidraw    exercice 7
  07-strategy-vs-template-solution.excalidraw
  08-policy-canevas.excalidraw            exercice 8
  08-policy-solution.excalidraw
exercices/seance-4/
  09-graphe-objets-canevas.excalidraw     exercice 9
  09-graphe-objets-solution.excalidraw
  10-aggregates-canevas.excalidraw        exercice 10
  10-aggregates-solution.excalidraw
  10-concurrence-debrief.excalidraw       exercice 10, débrief
```

L'exercice 4 est un exercice **de code**, mais il se pilote sur le board comme sur
le master : le brief, le code de départ, puis cinq ateliers « code + message de
commit ». Le message de commit est le vrai livrable — c'est lui qui prouve que le
pas de refacto portait une seule intention.

L'exercice 5 porte un piège assumé : **« UserService » n'est pas dans la banque au
départ**, il est lâché en cours d'exercice (c'est ce que disent les notes du deck).
Le canevas le fournit quand même, en orange, pour que tu l'aies sous la main — à
masquer jusqu'au bon moment. Sa place est « dehors » : un nom qui ne dit ni le
métier ni la couche.

La solution n'est **pas** celle du master, qui ne porte que la banque non triée :
c'est une reconstitution à partir des points de débrief des notes du deck
(« passengers » collection-oriented, le DTO côté application, la duplication
acceptée). À valider par Etienne avant la séance.

L'exercice 6 ne montre que **deux** implémentations : la troisième colonne est
vide, puisque la question posée est justement « en existe-t-il une troisième ? ».
La solution la remplit, et pose les trois verdicts par colonne — un seul angle est
sacrifié à chaque fois, c'est le trilemme.

L'exercice 7 est court et oral : deux écritures du même modèle de tarification,
Template Method à gauche et Strategy à droite. Les post-its ne sont qu'un prétexte
à la vraie question, posée dans les notes du deck — quelle est la différence de
fond ? La solution la pose noir sur blanc : héritage et choix à la compilation
contre composition et choix à l'exécution.

L'exercice 8 utilise les **caches** : les règles 2 à 5 sont recouvertes de
rectangles blancs verrouillés, que tu retires une par une. C'est le ressort de
l'exercice — le design doit émerger au fur et à mesure que les règles tombent, pas
être deviné d'avance. Un cache reste un cache : qui veut le déverrouiller le peut,
et ce n'est pas grave.

L'exercice 9 est l'échauffement de l'exercice 10 : on reconstitue le graphe
d'objets de Moveo à partir de douze indications, et la banque de noms contient
deux pièges — *Passenger* et *Driver* ne sont pas des types mais deux rôles du
même *User*, et ils disparaissent du graphe. Le graphe final est connexe, ce qui
est exactement le problème que l'exercice suivant vient découper.

L'exercice 10 porte **trois** fichiers. Le canevas pose le graphe verrouillé et
les trois colonnes de post-its qui guident le découpage — use cases, invariants,
contraintes de concurrence. La solution donne les cinq agrégats, racine en bordure
rouge. Le troisième fichier est le débrief : pourquoi *Note* sort de *Journey*,
avec les deux arbitrages du master côte à côte, transactional consistency contre
eventual consistency, et le code de chacun. C'est là que se joue la vraie leçon —
une frontière d'agrégat se décide, elle ne se déduit pas du graphe.

Le Use Case Mapping sert **les deux slides** « Rendre l’implicite explicite » et
« Analyser les use cases » : c’est un seul canevas travaillé en deux temps, comme
sur le master board.

### Géométrie et code couleur, repris du master

Le canevas des subdomains n'est pas trois boîtes en diagonale : c'est le **quadrant
des decks** (`.quadrant-chart`, ratio 3:2) — *Generic* en bande verticale à gauche
sur 25 % de la largeur, *Core* en haut à droite (à partir de 50 %, sur 75 % de la
hauteur), *Supporting* occupant le reste.

Le code couleur des post-its vient de la banque du master : **Core rouge**,
**Supporting jaune**, **Generic gris**. Le canevas fournit une banque de trois
post-its sources à dupliquer, plutôt qu'un stock de post-its vierges.

Les canevas sont générés par script — `tools/excalidraw-kit.js` porte les helpers
communs, un `gen-NN-*.js` par exercice — et non dessinés à la main : la
géométrie reste reproductible et un changement de palette se répercute partout.

### La banque de post-its passe par la bibliothèque

Excalidraw n’a **pas** de banque de formes posée sur le canevas, comme Lucid ou
Miro. Son équivalent est la **bibliothèque** : un fichier `.excalidrawlib` chargé une
fois — en le glissant sur le canevas, ou via le panneau *Bibliothèque* → **⋯** →
*Ouvrir* — dont les éléments s’attrapent ensuite dans le panneau latéral.

⚠️ **Le panneau est global et cumulatif.** Charger une bibliothèque *ajoute* ses
éléments à ceux déjà présents ; recharger le même fichier crée des doublons. Pour
repartir propre : **⋯** → *Réinitialiser la bibliothèque*, puis charger une seule fois.

**Une bibliothèque par exercice qui en a besoin**, rangée à côté de son canevas —
voir des post-its d’Event Storming pendant le classement des subdomains n’a aucun
sens, et le panneau étant global, mélanger les deux parasite la séance :

```
exercices/
  seance-1/01-subdomains.excalidrawlib        Core · Supporting · Generic
  seance-1/02-usecase-mapping.excalidrawlib   Acteur · Use case · Variante
  bonus/15-event-storming.excalidrawlib       Évènement · Commande · Acteur ·
                                              Règle métier · Modèle · Problématiques
```

Les post-its de bibliothèque ont les mêmes dimensions que ceux des canevas
(140 × 80), pour qu’un élément déposé s’aligne avec les autres. Tout est généré par
`tools/gen-libraries.js`.
### Encart consignes

Chaque canevas porte un encart **Consignes** à droite du plan de travail :
ce que les participants doivent produire, la convention de couleurs et la durée.
Verrouillé, comme tout ce qui n’est pas un post-it.

Il ne contient **ni le brief ni la solution** — le brief reste dans les notes du
présentateur, pour ne pas être lu en avance.

### Taille de la scène : contrainte, pas préférence

**Excalidraw ignore la vue enregistrée dans le fichier.** À l’import,
`cleanAppStateForExport` retire zoom et scroll, puis `getScrollToContentState`
recentre sur le contenu **en conservant le zoom courant** — donc 100 % dans la
plupart des cas. Inutile d’écrire `appState.zoom` dans le `.excalidraw`, c’est sans effet.

La seule façon d’obtenir une vue exploitable à l’ouverture est donc de **dessiner
la scène à une taille qui tient à 100 %**. D’où le quadrant en **1050 × 700**
(ratio 3:2 conservé, celui du composant des decks) plutôt qu’en 1800 × 1200 :
la scène complète fait environ **1205 × 930**, ce qui entre dans n’importe quelle
fenêtre. Le recentrage, lui, est fait par Excalidraw tout seul.

Les générateurs vérifient cette contrainte : toute scène dépassant ~1900 × 950
redevient inconfortable à l’ouverture.


## Idées d'adaptation

Deux exercices du workshop original gagneraient à changer de cas support. Moveo
(covoiturage) sert de fil rouge à l'ensemble, mais sur ces deux notions précises un
domaine plus proche du métier des participants rend la démonstration plus parlante.

**Idées d'Etienne, pas encore instruites** — à creuser avant d'écrire quoi que ce soit.

### Policies → le colisage d'expédition

Remplacerait le cas « tarif au km selon la ville » (exercice 8, chapitre *Policy
pattern*).

Répartir des articles dans des colis sous contraintes : poids et volume maximum,
produits incompatibles entre eux, règles propres à chaque transporteur, articles
hors gabarit. L'intérêt : les règles **arrivent les unes après les autres**, ce qui
colle exactement à la consigne de l'exercice (implémenter au fur et à mesure que le
besoin tombe, sans sauter à la solution finale), et chacune est une policy évidente
plutôt qu'un `if` de plus dans un service.

À vérifier : que le cas reste assez simple pour tenir dans les 20-25 minutes de
l'exercice.

### Invariants d'agrégat sous concurrence → la numérotation de facturation

Remplacerait le cas `BookSeat` / `MaxAvailableSeats` (exercice 10, *Frontières
d'agrégats*, et son prolongement en séance 6 sur la cohérence).

Une numérotation de factures doit être **continue et sans trou**, par journal et par
exercice comptable — et c'est une contrainte légale, pas une préférence de
conception. Deux facturations simultanées ne peuvent ni partager un numéro ni en
sauter un. L'intérêt : l'invariant est indiscutable, tout le monde en comprend
l'enjeu sans explication, et le cas montre crûment les **limites de l'eventual
consistency** — ici, elle est tout simplement interdite. Ça ouvre naturellement sur
la frontière transactionnelle et sur le verrouillage.

À vérifier : l'articulation avec le chapitre *Eventual Consistency* de la séance 6
de référence, qui n'a pas encore de slide dans le découpage sur 5.
