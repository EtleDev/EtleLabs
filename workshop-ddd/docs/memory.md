# Memory — connaissances techniques accumulées sur `ddd-cote-metier.html`

Dernière mise à jour : 2026-07-28. Complète `roadmap.md` (même dossier) qui
donne le statut ; ce fichier donne le *comment/pourquoi* — conventions de
travail, composants CSS créés, pièges reveal.js déjà rencontrés et corrigés,
techniques de vérification utilisées. Objectif : qu'une reprise depuis une
machine neuve (sans historique de conversation ni mémoire locale) retrouve
tout le contexte nécessaire ici.

## Repère : structure du repo

Voir `workshop-ddd/CLAUDE.md` pour la doc de référence (contrainte `file://`
sans serveur, dossiers, conventions générales). En résumé pour ce qui suit :
- `workshop-ddd/docs/ddd-cote-metier.html` — le deck condensé pour experts
  métier/PO, celui sur lequel tout ce travail a porté.
- `workshop-ddd/docs/partie-*.html` — le workshop complet développeurs,
  **pas encore touché** par cette conversion HTML/CSS, mais partage le même
  dossier d'images `workshop-ddd/docs/img/part1/`.
- `presentation-set-custom/css/reveal-extended.css` — tous les composants
  HTML/CSS créés pendant ce travail y vivent (fichier partagé, donc les
  changements ici impactent potentiellement tous les decks du repo — vérifié
  à chaque fois qu'aucune règle existante n'était modifiée de façon à casser
  un autre deck).
- `presentation-set-custom/css/theme/hexafox-dark.css` — thème utilisé par
  ce deck ; définit les vraies valeurs derrière certaines variables (voir
  piège `--ext-highlight` plus bas).

## Conventions de travail d'Etienne (déjà en mémoire, rappel)

- Ne jamais committer/pousser sans demande explicite — mais une fois qu'il
  dit "commit et push", le faire directement sans redemander.
- Commits en anglais, conventional commits, petits et ciblés (un sujet par
  commit). Voir `git log` sur `feature/business-distilled` pour le style.
- `workshop-ddd/ancyr/` est **gelé** — ne jamais y toucher.
- Il valide visuellement chaque changement (via un rendu que je lui fournis,
  voir technique de screenshot ci-dessous) avant de demander le commit.
- Quand quelque chose ne lui convient pas mais qu'il ne précise pas quoi
  exactement (ex. l'icône écran cassé), **demander avant d'itérer à
  l'aveugle** plutôt que de deviner.

## Technique : vérifier un rendu sans serveur ni Playwright

Cette machine n'a pas de navigateur headless pour Playwright/jsdom, mais
**Chrome est installé** (`C:/Program Files/Google/Chrome/Application/chrome.exe`).
Ça a servi pour absolument toutes les vérifications visuelles de ce travail :

```
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless --disable-gpu --no-sandbox \
  --screenshot="<scratchpad>/preview.png" --window-size=1600,1000 \
  --virtual-time-budget=4000 \
  "file:///C:/Users/.../ddd-cote-metier.html#/<chapitre>/<slide>"
```

Points importants :
- **Chemin Windows obligatoire** (`file:///C:/...`), pas un chemin git-bash
  (`/c/...`) — sinon `ERR_FILE_NOT_FOUND` silencieux.
- Le hash `#/<h>/<v>` cible directement une slide (0-indexé, horizontal puis
  vertical) — voir méthode de calcul des index plus bas.
- Pour une slide avec des fragments : `#/<h>/<v>/<f>` où `f` est l'index du
  dernier fragment visible (0-indexé). Un `f` supérieur au nombre réel de
  fragments est simplement plafonné (pratique pour "tout afficher").
- Pour vérifier le rendu en mode **export PDF**, ajouter `?print-pdf` à
  l'URL (pas de hash de slide, tout s'empile verticalement) et augmenter
  `--window-size` en hauteur (ex. `1600,6000`) pour capturer plusieurs
  slides d'un coup. `--print-to-pdf=fichier.pdf` fonctionne aussi pour
  générer un vrai PDF, mais aucun outil sur cette machine ne sait en
  rendre une page en image (`pdftoppm`/`poppler`, ImageMagick et PIL sont
  tous absents) — préférer le screenshot direct de la page `?print-pdf`.
- Pour un test rapide isolé (ex. déboguer un plugin), créer un fichier HTML
  minimal **dans `workshop-ddd/docs/`** (mêmes chemins relatifs vers
  `../../presentation-set/...`), itérer dessus, puis le supprimer une fois
  fini — beaucoup plus rapide que de re-tester sur le deck entier à chaque
  essai.

## Technique : calculer l'index chapitre/slide d'une slide

Les chapitres sont les `<section>` à 4 tabulations d'indentation (niveau
`.slides > section`), 0-indexés dans l'ordre du fichier. Pour trouver leurs
lignes de départ et titres :

```
grep -n "^				<section>\|<h1>" workshop-ddd/docs/ddd-cote-metier.html
```

Puis, à l'intérieur d'un chapitre (entre sa ligne de départ et celle du
chapitre suivant), les slides verticales sont les `<section>` à 5 tabulations :

```
awk 'NR==<debut>,NR==<fin>' workshop-ddd/docs/ddd-cote-metier.html | grep -nP '^\t{5}<section'
```

⚠️ `awk 'NR==a,NR==b && /pattern/'` (condition combinée sur une seule ligne)
ne fonctionne **pas** comme attendu (precedence awk) — toujours découper en
deux étapes (extraire la plage avec `awk`, puis `grep` dessus) comme ci-dessus.
Ces index bougent à chaque ajout/suppression de slide — **toujours
recalculer**, ne jamais réutiliser un index d'une session précédente sans
vérifier.

## Composants HTML/CSS créés (tous dans `reveal-extended.css`)

### `.quadrant-chart` + variantes (3 usages)
Plan de classification 2 axes (Complexité du Modèle / Différenciation
Métier), ratio fixe **3:2**, reproduit `subdomains-topology.png` etc.
Proportions dérivées par décodage pixel-exact de l'image de référence (voir
technique ci-dessous) : zone `generic` = 25% de large, zone `core` =
`left:50%`/`height:75%` (un carré parfait quand W=1.5H).
- `.quadrant-zone--supporting/--generic/--core` : les 3 zones colorées
  (rectangles positionnés en `style` inline par usage).
- `.quadrant-diagonal` + `.quadrant-diagonal-label` : variante "axe
  d'alignement" (ligne pointillée en diagonale du coin bas-gauche au
  coin haut-droit, angle et longueur fixes calculés depuis le ratio 3:2 :
  `atan(2/3)≈33.69°`, longueur `hypot(3,2)/3≈120.19%`).
- `.quadrant-marker`/`.quadrant-marker--ghost` + `.quadrant-arrow` :
  losanges de position + flèche de transition, utilisés sur les 8 slides
  "Subdomains patterns". **Taille des marqueurs en `%` de la boîte, jamais
  en `em`** (`width:7%; height:10.5%` — le ratio 1:1.5 compense le 3:2 du
  cadre pour rester un carré non déformé) : une taille en `em` ne suit pas
  si le graphe change de taille ailleurs. Les extrémités de flèche sont
  **insérées** (reculées d'une marge) par rapport aux centres des marqueurs,
  sinon la pointe de flèche disparaît sous le losange opaque.

### `.word-cloud` / `.word-cloud-item(--big)`
Liste de termes à tailles variables, en vrac (pas une grille), dans un
`.titled-frame`. `--big` grossit la police ; le décalage horizontal
("nuage" plutôt que liste alignée) se fait via `margin-left` inline
par item. Réutilisé aussi tel quel (sans `--big`, sans décalage) pour de
simples listes uniformes (ex. triptyques "Modèle").

### `.titled-frame` + `.frame-title` / `.frame-title-group` / `.frame-title--ghost`
Cadre à bordure avec pastille de titre flottante. `.frame-title-group` = deux
pastilles collées côte à côte (ex. "Développeurs" + "Experts Métier" sur un
seul cadre, au moment où deux vocabulaires fusionnent). `.frame-title--ghost`
= variante creuse pour un titre imbriqué (vs. plein pour le niveau principal
— hiérarchie par **style**, jamais par taille de police, sinon ça déborde).
⚠️ **`.titled-frame` a `flex:1` dans sa règle de base** (pensé pour un usage
en rangée) — si on l'utilise seul et centré avec une largeur fixe en `style`,
ajouter `flex: none;` sinon la largeur inline est silencieusement ignorée.

### `.node-root` / `.node-grid` / `.node(--filled/--dim/--compact)` / `.node-badge` / `.node-arrow-down/--up`
Diagramme hiérarchique (racine + grille d'éléments), très réutilisé (secteurs
d'entreprise, subdomains, listes "Objets/Comportements", "Vision
développeur/expert"...). `--filled` = mis en avant (fond plein) ; `--dim`
= désactivé (opacité 0.35, via la classe, ou une opacity inline plus faible
pour un effet "quasi invisible" comme sur les slides Vision dev/expert) ;
`--compact` (ajouté tardivement) = padding/min-height réduits pour qu'une
longue liste en une colonne tienne sur la diapo sans que le texte devienne
minuscule. `.node-arrow-up` est le miroir de `.node-arrow-down` (ajouté
quand il a fallu deux flèches convergeant vers un point central).

### `.icon` + SVG inline
Petites icônes dessinées à la main en SVG inline (pas de fichiers séparés),
colorées via `currentColor` + `color` CSS. Trois existent à ce jour :
silhouettes (groupe de personnes), lien cassé, écran fissuré — ce dernier
jugé perfectible par Etienne (voir `roadmap.md`). Un **cadre acteur à
double bordure** sera nécessaire pour les 3 dernières images du deck
(voir `roadmap.md`) — pas encore construit.

### `.slide-2col-container/--text/--image`, `.slide-flex`/`.col-left`/`.col-right`, `.r-frame--rounded/--accent`
Utilitaires de mise en page plus anciens, réutilisés tels quels. `.slide-flex`
a été corrigé (`40vh` → `em`, voir pièges ci-dessous).

## Pièges reveal.js découverts et corrigés

### 1. `data-auto-animate` + centrage par `transform` = casse
`data-auto-animate` anime `transform` sur les éléments appariés (technique
FLIP). Si l'élément se centre lui-même via
`left:50%; transform:translateX(-50%)`, les deux transforms rentrent en
conflit et l'élément perd son centrage pendant/après la transition.
**Corrigé** sur `.frame-title`/`.frame-title-group` en centrant via
`left:0; right:0; width:fit-content; margin:0 auto;` à la place (même rendu
visuel, aucun `transform` en jeu). Les exemples officiels reveal.js pour
auto-animate centrent aussi par marges, pas par transform, pour cette
raison précise.

### 2. `vh`/`vw` ignorent la mise à l'échelle de reveal.js
Reveal.js dessine chaque slide dans un espace virtuel fixe (960×700 par
défaut) puis applique un seul `transform: scale(...)` sur tout le conteneur
pour s'adapter à l'écran réel. Tout ce qui est en `em`/`%`/`px` suit ce zoom ;
`vh`/`vw` non — ils se calculent sur le **vrai** viewport, quel que soit le
zoom appliqué. Résultat : un élément dimensionné en `vh` dérive hors de
proportion dès que l'écran réel a un ratio différent de celui utilisé pour
régler le composant (typiquement : vidéoprojecteur 4:3 vs écran d'auteur
16:10). C'est ce qui rendait des boîtes "aplaties" en présentant sur un
autre écran. **Ne jamais utiliser `vh`/`vw` dans le contenu d'une slide** —
`em` est le choix par défaut. Corrigé sur `.slide-flex` (`40vh` → `15em`,
valeur retrouvée empiriquement en comparant le rendu à 1600×1000 et
1024×768 jusqu'à ce que la boîte tienne sans chevaucher son propre texte).

### 3. Export PDF (`?print-pdf`) et graphiques Chart.js invisibles
Le plugin `RevealChart` (`presentation-set-custom/plugin/chart/plugin.js`,
vendorisé, pas modifié) construit les graphiques Chart.js avec son
détecteur de taille "responsive" habituel dès l'évènement `ready` de
reveal.js. En mode `?print-pdf`, ce détecteur ne capte jamais la bonne
taille du conteneur (les `<canvas>` restent bloqués à une taille nulle,
donc invisibles à l'export) — probablement parce que la mise en page
spécifique à l'impression (qui rend toutes les slides visibles
simultanément) ne se met en place qu'au chargement complet de la page
(`load`), après que les graphiques ont déjà été construits avec une
mauvaise taille. **Corrigé** en ajoutant, dans le `<script>` du deck
lui-même (pas dans le plugin vendorisé), un gestionnaire sur `load` qui
**recrée** chaque graphique (`destroy()` + `new Chart(...)`) en lui donnant
explicitement la taille réelle mesurée de son conteneur
(`getBoundingClientRect()`) plutôt que de compter sur l'auto-détection.
Un simple `.resize()` sur l'instance existante ne suffisait **pas** — testé
et invalidé avant de trouver la bonne approche. Reproduit et validé sur un
fichier de test minimal isolé avant d'appliquer au deck réel (beaucoup plus
rapide à itérer que sur le fichier complet).

### 4. `pdfSeparateFragments`
Config reveal.js standard, mise à `false` pour qu'une slide à fragments
n'éclate pas en une page par fragment à l'export PDF.

## Technique : décoder les proportions exactes d'une image de référence

Pas d'ImageMagick ni de PIL sur cette machine (`convert`/`magick` résolvent
vers d'autres binaires Windows sans rapport). Pour mesurer précisément une
proportion dans un PNG de référence (zone colorée, position d'un marqueur...)
quand l'œil ne suffit pas : un petit script Node utilisant seulement
`zlib` intégré (`zlib.inflateSync` sur les chunks `IDAT` concaténés, puis
un dé-filtrage par ligne de scan, puis mapping palette→RGB pour les PNG
indexés). Ensuite, échantillonner quelques pixels intérieurs connus pour
identifier les couleurs de chaque zone, et scanner lignes/colonnes pour
trouver leur boîte englobante. `node.exe` sur cette machine veut des chemins
Windows (`C:/Users/...`) même appelé depuis git-bash, pas des chemins
`/c/Users/...`.

## Autres notes utiles

- **`--ext-highlight` devient orange sous le thème hexafox-dark** (aliasé à
  `--hf-fox`), pas cyan comme sa valeur de base dans `reveal-extended.css`
  le suggère — c'est `--ext-highlight-blue` (aliasé à `--hf-cyan`) qui donne
  le cyan/turquoise visible sur les captures de référence. Facile de se
  tromper de variable.
- Les images `img/part1/*.png` remplacées par du HTML/CSS dans
  `ddd-cote-metier.html` **ne sont pas orphelines** : `partie-1-domain-
  discovery.html` (et probablement d'autres `partie-*.html`) les utilisent
  encore. Toujours vérifier avec `grep` sur tous les `docs/*.html` avant de
  supprimer un fichier image.
- Couleurs de marque hexafox d'origine (à ne pas reperdre si le thème est
  retouché un jour) : bleu caraïbes `#3399cc`, orange renard `#ff8904`.
