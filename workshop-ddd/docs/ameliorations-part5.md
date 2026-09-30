# Pistes d'amélioration — `workshop-ddd-part5.html`

Créé le 2026-09-28, pendant la conversion de `partie-5-bounded-context.html`
vers `workshop-ddd-part5.html` (nouveau thème, chapitres verticaux, schémas en
HTML/CSS/SVG). La conversion elle-même est **fidèle** : rien n'a été ajouté
ni retiré du contenu. Ce fichier liste ce qui a été remarqué au passage et qui
mériterait d'être traité **dans un second temps**, sur décision d'Etienne.

Rien ici n'est appliqué (sauf l'annexe). Chaque item est indépendant et peut
être pris ou écarté séparément.

## Ce qui a changé par rapport à l'original (pour mémoire)

- Thème `hexafox-dark`, plugin `chapter-footer`, 4 chapitres verticaux :
  Bounded Contexts / Délimiter les contextes — *Heuristiques* / Délimiter
  les contextes — *Pistes et indices* / Intégrer les Bounded Contexts.
  L'ancien h1 vide « DELIMITER LES CONTEXTS » est devenu le titre commun des
  chapitres 2 et 3, avec le sous-titre en `h3` (rappelé en italique par le
  footer). Les notes de l'ancien h1 « HEURISTIQUES » (définition du mot) sont
  sur la slide de chapitre 2.
- Titres harmonisés : `h1` en casse normale, `h2` posés sur des schémas
  (« Folders », « Packages », « Services / Microservices », « Intégration des
  Bounded Contexts ») → `h5`. Les slides de texte seul sont passées dans un
  `<p>`.
- Les **13 images** de `img/part5/` sont refaites en HTML/CSS/SVG inline, sans
  toucher à `reveal-extended.css` : `.titled-frame` / `.frame-title` pour les
  cadres, `.node.node--filled` pour les pastilles, un `<symbol id="bc-cloud">`
  (nuage) et un `<marker id="bc-arrow">` (pointe de flèche) définis une seule
  fois en tête du `<body>`. Les images ne sont **pas** orphelines :
  `partie-5-bounded-context.html` les utilise toujours.
- Slide de titre avec sous-titre, et slide « Merci ! / Des questions ? » en
  fin de deck (comme les parties 2 et 3). Les notes vides de la slide de titre
  ont été retirées.

## 1. L'« Exercice pratique » n'a ni consignes ni notes

Slide 4-5 : un titre seul, et contrairement aux parties 2 et 3, **pas même de
notes**. On ne sait pas sur quoi porte l'exercice (découper un domaine en BC ?
choisir un mode d'intégration ?). Même constat que l'item 1 de
`ameliorations-part2.md` / `ameliorations-part3.md` : une slide de consignes
visible (objectif, support, durée), plus le corrigé en notes.

## 2. Des séquences qui gagneraient à s'animer

Trois paires ou séries de slides montrent le même schéma qui évolue :

- 1-5 → 1-6 : un seul BC dans le monolithe, puis quatre ;
- 1-8 → 1-9 : boîte noire, puis boîte blanche (le contenu apparaît) ;
- 4-1 → 4-2/4-3/4-4 → 4-6 : vue d'ensemble, puis chaque mode en gros plan,
  puis la même vue d'ensemble avec l'axe dépendance / complexité.

Avec `data-auto-animate` (ou des fragments), le passage de l'une à l'autre
serait lisible au lieu d'être un simple changement d'image. Attention au
piège déjà connu (`memory.md`) : pas de `transform` de centrage sur les
éléments animés.

Au passage, 4-1 et 4-6 sont presque identiques, séparées par les trois gros
plans et l'exercice. On pourrait n'en garder qu'une, construite
progressivement (les trois cadres un par un, puis l'axe).

## 3. Termes anglais dans un deck français

Les termes DDD (Bounded Context, Domain Model…) restent en anglais ailleurs,
mais plusieurs libellés pourraient être traduits ou au moins harmonisés :

- titres de slide : « Folders », « Packages », « Services / Microservices » ;
- cadres : « Shared Model », « Direct Communication », « Asynchronous »
  (« Modèle partagé », « Communication directe », « Asynchrone ») ;
- axe de la comparaison : « High Dependency / Low Complexity » → « Forte
  dépendance / Faible complexité » ;
- « Bounded Contexts = Autonomous Contexts » (1-2), une slide très elliptique
  qui mériterait une phrase ou une note.

## 4. Domaine d'exemple et langage : topology / reservation, `.jar`

Les exemples de découpage (`/topology`, `/reservation`, `Topology Service`)
ressemblent à un système de réservation de salles, un troisième domaine après
le restaurant (partie 1) et le voyage (parties 2 et 3). Même question que
l'item 2 de `ameliorations-part2.md`, à trancher une fois pour tout le
workshop.

`topology.jar` / `reservation.jar` suppose Java, alors que le code des parties
précédentes est en TypeScript. Un terme neutre (« module », « package »,
`@app/topology`) éviterait le décalage.

## 5. Heuristiques et indices : sept slides au même titre, peu de notes

- Les 7 slides « Heuristique » et les 5 slides « Indice » portent toutes le
  même `h5`. Les numéroter (« Heuristique 1/7 »…) ou ajouter une slide de
  récapitulatif en fin de série aiderait à s'y retrouver et ferait une bonne
  slide de référence pendant l'exercice.
- Aucune note sur ces 12 slides. Les notions citées sans explication :
  *Common Closure Principle* (Robert C. Martin), *Reverse Conway Maneuver*
  (et la loi de Conway elle-même), « suivre la data et son évolution ».
- « Relève plus de l'art que de la science » et « Comment savoir si notre
  décomposition est bonne ? » sont au début du chapitre *Heuristiques* ;
  le chapitre *Pistes et indices* n'a pas de slide d'introduction
  équivalente.

## 6. Notes de speaker

- 1-18 : « principe des micro front-end pour gérer la verticalité entre
  front et back » est très elliptique, à développer.
- 4-2 : « anti-pattern. » — pourquoi un anti-pattern et quand il reste
  acceptable (ex. shared kernel assumé) pourrait être dit.
- Coquilles restantes : « vis à vis » → « vis-à-vis », « A éviter » →
  « À éviter », « mettre en oeuvre » → « mettre en œuvre », « est privé au
  BC » → « est privé » / « propre au BC », virgule en trop dans « à
  l'intérieur du bounded context, est privé ».

## 7. (Transverse, CSS) Factoriser les schémas « nuage »

Tout est en styles inline (choix fait pour ne pas entrer en conflit avec la
partie 2, qui modifie `reveal-extended.css`). Conséquence : les trois
scènes (Shared Model / Direct Communication / Asynchronous) sont écrites
trois fois chacune (vue d'ensemble, gros plan, comparaison), et le bloc
nuage + libellé revient 18 fois. Une fois la partie 2 fusionnée, un petit
composant partagé (`.bc-cloud`, `.bc-scene`, `.bc-arrow`) réduirait
fortement le HTML. Les schémas boîte noire / boîte blanche (1-8, 1-9) sont
proches du `.layer-diagram` de la partie 2 et pourraient aussi s'y appuyer.

## 8. (Transverse, CSS) Pastille `.frame-title` dimensionnée en `svh`

Même constat que l'item 8 de `ameliorations-part3.md` : en 4:3 (1024×768),
les pastilles « Bounded Context », « Shared Model »… sont nettement plus
petites, en proportion, qu'en 16:10. À traiter à part, pour tous les decks.

## Annexe — micro-corrections déjà appliquées pendant la conversion

Ce sont les seules libertés prises sur le texte. À relire, et à annuler si
l'une d'elles ne convient pas.

**Coquilles (slides) :**
- « peu voir aucun impact » → « peu voire aucun impact »
- « Ecouter le langage des différents parties prenantes » → « Écouter le
  langage des différentes parties prenantes »
- dans les schémas : « Requêtes Entrante » → « Requêtes entrantes »,
  « Evènements Entrant / Sortant » → « Évènements entrants / sortants »,
  « Boite Noire » → « Boîte noire »

**Coquilles (notes) :**
- « responabilité » → « responsabilité », « verticialité » → « verticalité »
- « domain modèle » → « domain model »
- « via leur interfaces publique » → « via leur interface publique »

**Harmonisation de mise en forme** (aucun changement de sens) :
- titres de chapitre en casse de phrase ; « DELIMITER LES CONTEXTS » →
  « Délimiter les contextes » (accent + pluriel français) ;
- « Intégration des bounded contexts » → « Intégration des Bounded
  Contexts » (capitalisation utilisée partout ailleurs dans le deck) ;
- libellés de schéma en casse de phrase : « Application monolithique »,
  « Interface publique » ;
- « Bounded Contexts = Autonomous Contexts » : `Autonomous` mis en
  `.highlight` (demande d'Etienne).
