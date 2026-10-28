# workshop-ddd

Supports du workshop Domain-Driven Design (reveal.js). Deux publics : un
workshop complet pour développeurs (`docs/partie-*.html`, 6 parties + bonus)
et un cours condensé pour experts métier / PO / fonctionnels
(`docs/ddd-cote-metier.html`).

## Contrainte non négociable : tout doit marcher hors ligne, sans serveur

Les decks sont ouverts en double-cliquant le fichier HTML (`file://`), sans
serveur ni réseau. Conséquences concrètes :

- Jamais de `data-markdown="fichier.md"` ni `data-chart-src="..."` (chargement
  XHR, bloqué en `file://`). Le markdown et les données de graphique doivent
  être **inline** dans le HTML.
- Toute dépendance externe (plugins, polices, librairies) doit être vendorisée
  dans le repo, jamais chargée depuis un CDN.
- Avant de committer, vérifier qu'un deck se charge sans erreur JS. Un
  navigateur headless n'est généralement pas disponible dans cet environnement
  (sandbox) ; utiliser `jsdom` (`resources:'usable', runScripts:'dangerously'`)
  pour un smoke test — charger le fichier, attendre `Reveal.isReady()`,
  vérifier l'absence d'erreurs. Pour Chart.js, stubber
  `HTMLCanvasElement.prototype.getContext` (canvas natif indisponible/non
  installé) ; le warning `console.warn` interne de Chart.js sur la
  détection de plateforme est inoffensif tant que le chart s'instancie
  (`canvas.chart` non nul).
- Le serveur (`seminar`/`poll`/`questions` pour pilotage à distance, Q&A,
  sondages) est un chantier **à part**, pas encore activé — ne pas
  introduire de dépendance serveur dans les decks existants sans qu'on en
  reparle explicitement.

## Dossiers

- `docs/` — les decks HTML et leurs images (`docs/img/part*/`).
- `ancyr/` — **gelé, conservation historique.** Le workshop original sur
  7 sessions : `cours1.html` … `cours7.html` et leur copie de reveal.js, plus
  `exercices/` et `homeworks/` qui reconstituent les exercices de référence
  (complétés le 2026-10-02, ce qui manquait à l'origine). **Ne plus rien y
  toucher sauf demande expresse et explicite d'Etienne.** C'est la référence
  dont le cours actuel s'écarte sciemment.
- `exercices/` — la **banque d'exercices** : un dossier par exercice, numéroté,
  à plat. Pas de découpage par séance : on y pioche pour monter une formation
  dédiée. Le README porte le catalogue. Chaque dossier contient
  `<nom>-exercice.excalidraw`, `<nom>-solution.excalidraw` et, le cas échéant,
  sa bibliothèque de post-its.
  Les canevas sont **générés** par `exercices/tools/gen-*.js` — modifier le
  générateur, jamais le `.excalidraw`.
- `exercices-coding/` — les trois exercices dont le livrable est du code (4, 8,
  12), en Java, .NET et TypeScript. Même numéro que le board, au choix du
  participant. Les solutions n'y sont pas : elles restent sur le canevas.
- `homeworks/` — les devoirs entre deux séances.
- Les **énoncés** restent dans les notes du présentateur des decks, jamais dans
  un fichier distribué. Chaque slide « Exercice pratique » porte en tête de ses
  notes le numéro de l'exercice et son dossier.
- `miro-exports/` — exports bruts des boards, **non versionnés** (voir le
  `.gitignore` à la racine du repo). Matériau de conversion, pas une source.

Les assets partagés (thème, CSS d'extension, plugins vendorisés, template de
démarrage) vivent **hors** de ce dossier, dans `presentation-set-custom/` à
la racine du repo — hors du dossier vendored `presentation-set/` pour
survivre aux mises à jour du framework. Voir ce dossier pour :
- `css/reveal-extended.css` — utilitaires de mise en page partagés (classes
  en anglais : `col-left`/`col-right`, `titled-frame`, `frame--ok/--warning/
  --danger`, `.highlight`/`.highlight-blue`/`.highlight-red`, `.source`,
  `figure`/`figcaption`, `.chapter-footer`).
- `css/theme/hexafox-light.css` / `hexafox-dark.css` — thème maison (bleu
  caraïbes `#3399cc`, orange renard `#ff8904`, fonds gris en dégradé radial
  central). L'orange renard est la couleur d'highlight *intégrée* au thème
  (`.highlight` devient orange sous hexafox, cyan par défaut sous les
  thèmes officiels comme moon).
- `plugin/chalkboard/`, `plugin/chart/`, `plugin/mermaid/` — plugins tiers
  vendorisés (scripts classiques, pas de modules ES, pour fonctionner en
  `file://`).
- `plugin/chapter-footer/` — petit plugin maison : rappelle en bas à gauche
  le `h1` du chapitre courant (masqué sur la slide de chapitre elle-même),
  avec sous-titre en italique si la slide de chapitre porte un `h2`/`h3`.
- `template.html` — squelette de deck prêt à copier, montre chaque utilitaire.

## Convention de structure : chapitres verticaux

Dans `ddd-cote-metier.html`, chaque `<h1>` ouvre un chapitre : les slides
suivantes (jusqu'au prochain `h1`) sont imbriquées en pile verticale sous
lui. Navigation ↔ entre chapitres, ↕ dans le chapitre. Le plugin
`chapter-footer` dépend de cette convention (il lit le `h1` de la colonne
horizontale courante).

## Style et workflow

- Commits en anglais, conventional commits, petits et ciblés (un sujet par
  commit/branche).
- Classes CSS en anglais dans `reveal-extended.css`, même si le contenu des
  decks est en français.
- Ne pas committer sans demande explicite ; ne pas pousser de branche sans
  demande explicite.
- **Pas de ligne `Co-Authored-By: Claude`** dans les messages de commit, ni de
  mention `Generated with Claude Code` dans les descriptions de PR.
