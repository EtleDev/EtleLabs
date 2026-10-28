# Banque d'exercices

Les exercices **réalisés pendant la séance**, sur board ou en code, par opposition
aux [devoirs](../homeworks/) faits entre deux séances. Adaptation du
[workshop original sur 7 sessions](../ancyr/exercices/).

C'est une **banque**, pas un programme : on y pioche de quoi monter une formation
dédiée à un client, un atelier d'une demi-journée ou le workshop complet. Chaque
exercice est autonome dans son dossier — canevas, solution, bibliothèque de
post-its — et la colonne *Suppose* ci-dessous dit le seul enchaînement qu'il faut
respecter.

**Les énoncés restent dans les notes du présentateur** des decks, jamais ici : les
élèves ne reçoivent que le PDF, qui exclut les notes. Chaque slide
`<h2>Exercice pratique</h2>` porte en tête de ses notes le numéro de l'exercice
et son dossier.

## Catalogue

| # | Exercice | Ce qu'il produit | Suppose | Durée | Code |
|---|---|---|---|---|---|
| 1 | [Classer les subdomains de Moveo](01-subdomains/) | un classement core / supporting / generic | — | 10 min | |
| 2 | [Repérer acteurs et use cases](02-usecase-mapping/) | une carte acteurs → use cases | — | 10-15 min | |
| 3 | [Nommer les use cases](02-usecase-mapping/) | les mêmes use cases, renommés | 2 | — | |
| 4 | [Refacto du PriceCalculator](04-refacto/) | une suite de petits commits de refacto | — | 15 min | ✅ |
| 5 | [Trier les objets par nature](05-tri-objets/) | un tri application / domaine / service | 4 | 10-15 min | |
| 6 | [Le trilemme du DDD](06-trilemme/) | un verdict argumenté sur 3 implémentations | — | 10 min | |
| 7 | [Strategy vs Template Method](07-strategy-vs-template/) | la différence de fond entre les deux | — | 10 min | |
| 8 | [Faire émerger la policy](08-policy/) | du code, règle après règle | 7 | 20-25 min | ✅ |
| 9 | [Le graphe d'objets](09-graphe-objets/) | un graphe connexe du domaine Moveo | — | 5-10 min | |
| 10 | [Frontières d'agrégats](10-aggregates/) | le même graphe, découpé en agrégats | **9** | 20 min | |
| 11 | [Patterns de domain events](11-domain-events-patterns/) | un verdict sur 3 façons de lever un event | — | 7 min | |
| 12 | [Identifier les domain events](12-domain-events/) | les events du parcours, nommés au passé | 11 | 15 min | ✅ |
| 13 | [Persister un domaine pur](13-persistance/) | le pour et le contre de deux voies | 10 | 10-15 min | |
| 14 | [Intégrer deux bounded contexts](14-integration-bc/) | un choix entre 3 modes d'intégration | 12 | 15 min | |
| 15 | [Event Storming du parcours Moveo](15-event-storming/) | une frise évènements → commandes → acteurs | — | 30-45 min | |

*Suppose* = l'exercice reprend le matériau du précédent ; **10 en gras** parce que
c'est le seul couplage dur (c'est littéralement le graphe de l'exercice 9 qu'on
découpe). Les autres sont des enchaînements confortables, pas des obligations.
*Code* = l'exercice existe aussi en projet IDE dans [`exercices-coding/`](../exercices-coding/),
en Java, .NET et TypeScript.

L'exercice 15 marche aussi bien en ouverture (découvrir le domaine) qu'en clôture
(relire tout le workshop sur une frise). Les exercices 1, 2, 4, 6, 7, 9, 11 et 15
ne supposent rien : ce sont les bons candidats pour un format court.

## Parcours type : le workshop complet en 5 séances

Un assemblage parmi d'autres — celui des decks de `docs/`. Pour une formation
dédiée, repartir du catalogue.

| Séance | Deck | Exercices |
|---|---|---|
| 1 — Domain Discovery | `partie-1-domain-discovery.html` | 1, 2, 3 |
| 2 — Domain Modeling | `workshop-ddd-part2.html` | 4, 5 |
| 3 — Entities | `workshop-ddd-part3.html` | 6, 7, 8 |
| 4 — Aggregates | `workshop-ddd-part4.html` | 9, 10, 11, 12, 13 |
| 5 — Bounded Context | `workshop-ddd-part5.html` | 14 |
| bonus | `partie-bonus-pratiques.html` | 15 |

Les séances 2 à 5 ont été reconverties en `workshop-ddd-part*.html` ; la séance 1
et le bonus tournent encore sur les `partie-*.html` d'origine.

⚠️ La slide « Exercice pratique » de l'exercice 2 est **commentée** dans
`partie-1-domain-discovery.html` (chapitre « Rendre l'implicite explicite »).
En l'état le deck ne propose que les exercices 1 et 3.

## Confirmé par le master board Lucid

Le master est découpé en **5 séances + un bonus**, et ses sections confirment le
parcours type ci-dessus :

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

## Une banque d'exercices

**Un dossier par exercice, à plat, numéroté** — pas de découpage par séance. Le
découpage, c'est la [table de correspondance](#correspondance) ci-dessus qui le
porte : il change d'une promo à l'autre, les exercices non. Piocher dedans ne
demande alors rien d'autre que de connaître son numéro.

Chaque dossier porte l'exercice vierge diffusé en séance, la solution réservée à
l'animateur, et la bibliothèque de post-its quand il y en a une :

```
exercices/
  01-subdomains/
    01-subdomains-exercice.excalidraw
    01-subdomains-solution.excalidraw
    01-subdomains.excalidrawlib
  02-usecase-mapping/           exercices 2 et 3
  04-refacto/
  05-tri-objets/
  06-trilemme/
  07-strategy-vs-template/
  08-policy/
  09-graphe-objets/
  10-aggregates/                + 10-concurrence-debrief.excalidraw
  11-domain-events-patterns/
  12-domain-events/
  13-persistance/
  14-integration-bc/
  15-event-storming/
  tools/                        les générateurs
```

Nomenclature : `<nom>-exercice.excalidraw` et `<nom>-solution.excalidraw`. Le
numéro est dans le nom du dossier *et* dans celui des fichiers, pour qu'un fichier
téléchargé reste identifiable hors de son dossier.

Les exercices qui se font **en code** ont leur pendant dans
[`../exercices-coding/`](../exercices-coding/) : même numéro, trois langages.

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

L'exercice 11 pose les trois endroits d'où lever un domain event — le use case,
un objet global, l'infrastructure — et laisse les post-its de verdict vides. La
solution porte les verdicts du master : possible, **interdit**, recommandé, et
enchaîne sur le *transactional outbox pattern*.

L'exercice 12 donne le squelette du master et deux scénarios qui vont dans des
sens opposés : un évènement qui **sort** du domaine (un passager rejoint, le
conducteur est notifié) et un évènement qui y **entre** (un utilisateur banni,
reçu de l'extérieur). Le second n'est pas un domain event — c'est un signal
d'un autre contexte, qu'un handler applicatif traduit en geste du domaine. Il
ouvre directement la séance 5.

L'exercice 13 est celui qui manquait au master : il vient de la séance 6 du
workshop original (*Domain Persistence*). Deux façons de persister un domaine
pur, à juger en Positif / Négatif. Le débrief porte la règle qui justifie tout
le reste — **on ne modifie jamais la donnée en base, on passe toujours par le
logiciel** — car si la base est un point d'entrée, les invariants de l'agrégat
ne valent plus rien.

L'exercice 14 illustrait ses trois modes d'intégration par des **images** sur le
master. Elles sont redessinées en formes Excalidraw — un schéma versionnable vaut
mieux qu'une capture, et il se corrige. Les post-its de verdict sont ceux du
master, remis dans leur colonne.

L'exercice 15 est le seul dont le canevas est **vide par construction** : la frise
et la légende sont verrouillées, tout le reste vient de la bibliothèque
`15-event-storming.excalidrawlib`. Sa « solution » n'est pas un corrigé mais
la frame *Proposition de correction* du master — chaque groupe produit la sienne.
Les quinze canevas sont désormais générés.

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

### L'encart consignes est toujours en haut à gauche

C'est la première chose qu'on lit, donc la première chose qu'on voit. La règle est
tenue par le kit, pas par la bonne volonté du générateur : `consignes()` ne prend
**pas de coordonnées**, et `write()` sort les encarts du lot, les empile dans une
colonne à gauche et décale le reste de la scène à leur droite. Un exercice ne peut
donc pas poser sa consigne ailleurs.

`aGauche(éléments)` range un autre groupe dans cette colonne, sous les consignes :
une banque de deux post-its, une légende — tout ce qui se lit avant d'agir, et qui
n'a rien à faire au milieu de l'aire de travail.

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
  01-subdomains/…                             Core · Supporting · Generic
  02-usecase-mapping/…                        Acteur · Use case · Variante
  15-event-storming/…                         Évènement · Commande · Acteur ·
                                              Règle métier · Modèle · Problématiques
```

Les post-its de bibliothèque ont les mêmes dimensions que ceux des canevas
(140 × 80), pour qu’un élément déposé s’aligne avec les autres. Tout est généré par
`tools/gen-libraries.js`.

### Encart consignes

Chaque canevas porte un encart **Consignes** en haut à gauche, avant le plan de
travail : ce que les participants doivent produire, la convention de couleurs et
la durée. Verrouillé, comme tout ce qui n’est pas un post-it.

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
