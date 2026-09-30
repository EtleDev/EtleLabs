# Pistes d'amélioration — `workshop-ddd-part3.html`

Créé le 2026-09-25, pendant la conversion de `partie-3-entities.html` vers
`workshop-ddd-part3.html` (nouveau thème, chapitres verticaux, schéma en
HTML/CSS). La conversion elle-même est **fidèle** : rien n'a été ajouté ni
retiré du contenu. Ce fichier liste ce qui a été remarqué au passage et qui
mériterait d'être traité **dans un second temps**, sur décision d'Etienne.

Rien ici n'est appliqué. Chaque item est indépendant et peut être pris ou
écarté séparément.

## Ce qui a changé par rapport à l'original (pour mémoire)

- Thème `hexafox-dark`, 3 chapitres verticaux (Entities / Repositories /
  Policy pattern) + plugin `chapter-footer`.
- Titres harmonisés : `h1` en casse normale (plus de MAJUSCULES), `h3` des
  slides de code passés en `h5`, et un `h5` ajouté aux slides de code qui
  n'en avaient pas (« Collection-Oriented », « Persistence-Oriented »,
  « Exemple »).
- `entities-value-objects.png` refaite en HTML/CSS (deux `.titled-frame` +
  `.word-cloud`). Seule retouche de texte : « Egalité / Evolue » →
  « Égalité / Évolue » (accents sur majuscules). L'image n'est **pas**
  orpheline, `partie-3-entities.html` l'utilise toujours.
- Chapitre Entities : les deux slides « Définition » fusionnées en une (définitions en fragments `fade-in-then-semi-out`, comme « Territoire du DDD » dans ddd-cote-metier), et un `h5` « Exemples » ajouté à la slide suivante (demande d'Etienne du 2026-09-30).
- Chapitre Repositories : les 3 slides « Repository » descriptives fusionnées en une (fragments `fade-in-then-semi-out`) ; « Un Repository est un Domain Service » gardée seule en conclusion, avec « Domain Service » en highlight + italique.
- Chapitre Policy pattern : les 2 slides « Policy » fusionnées en une (fragments `fade-in-then-semi-out`), « métier » en highlight.
- Slide de titre avec sous-titre, et slide « Merci ! / Des questions ? » en
  fin de deck (même chose que la partie 2).

## 1. Les trois « Exercice pratique » n'ont pas de consignes à l'écran

Slides (numérotées comme le hash `#/h/v`) 2-8 (trilemme du DDD, paiement), 3-3 (strategy vs template method)
et 3-4 (implémenter le pattern policy) : un titre seul, tout le reste est
dans les notes. Les notes de 3-3 parlent de « à droite / à gauche » alors
qu'aucun support n'est affiché, et celles de 3-4 ont une liste de consignes
vide (`Consignes : -`).

Proposition : une slide de consignes visible (objectif, support, durée), le
corrigé restant en notes, et compléter les consignes de 3-4. Même constat
que l'item 1 de `ameliorations-part2.md`.

## 2. L'exercice « trilemme du DDD » est rangé sous Repositories

Il ne porte pas sur les repositories mais sur l'endroit où faire un appel
externe (couche domaine vs couche applicative). Il a gardé sa position
d'origine (fin du chapitre Repositories). À trancher : le laisser, ou en
faire un chapitre à part / le déplacer.

## 3. Titres anglais dans un deck français

« Domain Service or Repository ? » et « It's a detail ! » (le commentaire
de code `// Repository or Domain Service ?` aussi). Les termes DDD
(Repository, Domain Service, Policy) restent en anglais ailleurs, mais ces
deux phrases pourraient être traduites : « Domain Service ou Repository ? »,
« C'est un détail ! ».

## 4. Coloration syntaxique : du TypeScript déclaré en JavaScript

Tous les blocs sont en `class="language-javascript"` alors que le code est
du TypeScript (`private readonly`, annotations de type, `implements`). La
coloration reste correcte mais partielle (types non colorés dans certains
cas). Passer en `language-typescript`.

Au passage : dans `TripPriceCalculator.calculate()`, `userId` et `date` ne
sont définis nulle part — sans importance à l'oral, mais un participant
attentif pourra le relever.

## 6. Domaine d'exemple : voyages / trajets

Les exemples (Trips, Itinerary, TripPriceCalculator) sont dans le domaine du
voyage / covoiturage, pas du restaurant de la partie 1. Même question que
l'item 2 de `ameliorations-part2.md` — à trancher une fois pour l'ensemble
du workshop.

## 7. Notes de speaker

- « Memento pattern / snapshot pattern » (notes du chapitre Repositories)
  sont cités sans explication : développer ou retirer.
- Typos : « trilema » → « trilemme », « quite à » → « quitte à », « Ca » →
  « Ça », « template methode » → « template method », « au fur et à mesure
  qu'il arrive » → « qu'ils arrivent », « apparenté » → « apparentées ».

## 8. (Transverse, CSS) Pastille `.frame-title` dimensionnée en `svh`

`.frame-title` a `font-size: 2svh` dans `reveal-extended.css` : la pastille
ne suit pas la mise à l'échelle de reveal.js, et devient donc relativement
plus petite en 4:3 (constaté en 1024×768 sur la slide Entity / Value Object)
que sur un écran 16:10. C'est le même piège que `.slide-flex` (voir
`memory.md`, piège n° 2). Ça touche tous les decks, donc c'est à traiter à
part et pas dans cette conversion.
