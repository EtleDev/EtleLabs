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
- `ancyr/` — **gelé, conservation historique, ne jamais y toucher.** Ancienne
  copie de reveal.js, ne sera plus mise à jour.

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
