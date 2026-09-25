# Roadmap — `ddd-cote-metier.html`

Dernière mise à jour : 2026-07-28. Ce fichier + `memory.md` (même dossier) sont
prévus pour reprendre le travail sans perte, y compris depuis une autre
machine — tout est dans le repo, rien ne dépend d'un historique de
conversation ou d'une mémoire locale à un poste. Branche de travail :
`feature/business-distilled`.

## Comment reprendre

1. `git pull` sur `feature/business-distilled`.
2. Lire ce fichier (statut) puis `memory.md` (comment/pourquoi, conventions,
   pièges déjà rencontrés) avant de retoucher quoi que ce soit.
3. Vérifier l'état de `notes.md` (même dossier) — c'est une proposition de
   révision des notes de speaker, en attente des validations d'Etienne
   case par case. Ne pas la considérer comme appliquée tant qu'il n'a pas
   répondu.

## Fait

Tout ce qui suit est committé et poussé sur `feature/business-distilled`
(voir `git log` pour le détail commit par commit).

**Conversion image → HTML/CSS**, chapitre par chapitre, sur `ddd-cote-metier.html` :
- Chapitre 1 (Introduction) : silo dev/client, décalage dev/client + résultat
  (icônes SVG maison : silhouettes, lien cassé, écran fissuré).
- Chapitre 6 (Subdomains) : grilles Core/Supporting/Generic, quadrant-chart
  (topologie + axe d'alignement diagonal).
- Chapitre 7 (Subdomains patterns) : 8 slides, quadrant-chart + marqueurs/flèches
  (`.quadrant-marker`, `.quadrant-arrow`).
- Chapitre 8 (Impédance de langage) : nuages de mots (`.word-cloud`), tour de
  Babel en 2 colonnes, fusion des vocabulaires (`.frame-title-group`).
- Chapitre 9 (Le modèle) : triptyques "modèle trop riche / distillé / autre
  domaine" (titled-frame + word-cloud).
- Chapitre 10 (Créer le langage) : "Verbes & Noms" (node-root/node-grid).
- Chapitre 11 (Rendre l'implicite explicite) : Vision développeur/expert
  (node-grid avec règles cachées en opacité quasi nulle), référence Matrix
  ("il n'y a pas de cuillère") en fragment.
- Slide de clôture ajoutée : "Merci ! / Des questions ?"

**Corrections transverses (bugs reveal.js) :**
- `data-auto-animate` cassait le centrage de `.frame-title`/`.frame-title-group`
  (transform en conflit avec le FLIP de reveal) → recentré via `margin:auto`.
- `.slide-flex` utilisait `40vh` → boîtes aplaties en changeant d'écran
  (vidéoprojecteur, résolution différente) → passé en `em`.
- Export PDF (`?print-pdf`) : fragments désormais tous sur la même page
  (`pdfSeparateFragments: false`), et les graphiques Chart.js qui restaient
  invisibles à l'export sont maintenant recréés avec une taille de canvas
  mesurée explicitement après le chargement complet de la page.
- `babel-tower.jpg` avait été référencée sans jamais être committée — corrigé.

**En attente de retour d'Etienne (pas bloquant, mais pas encore actionné) :**
- `notes.md` : proposition de révision des notes de speaker (contenu +
  mise en forme), organisée en items validables un par un. Voir ce fichier.
- Rendu de l'icône "écran cassé" (`.icon` sur la slide 1-10) à améliorer —
  Etienne a signalé que ça ne lui convenait pas mais n'a pas précisé quoi
  exactement. **Lui demander ce qui cloche avant d'itérer** (proportions ?
  forme de la fissure ? le pied de l'écran ?).

## À faire

### Prochaine étape naturelle : les 3 dernières images du deck

Ce sont, à ce jour, les **seules** images restantes dans
`ddd-cote-metier.html` qui sont des diagrammes (donc candidates à la
conversion HTML/CSS) plutôt que des photos/œuvres :

- **slide `#/12/6`** — `img/part1/usecase-book-table.png` : un acteur
  ("Hôte d'Accueil", icône silhouette dans un cadre à double bordure arrondie)
  relié par 2 flèches courbes à 2 usecases ("Réserver une table" /
  "Annuler une Table", pilules pleines).
- **slide `#/12/7`** — `img/part1/usecases-list.png` : version enrichie,
  2 acteurs (Administrateur + Hôte d'Accueil) avec 4 usecases chacun de
  part et d'autre, plus 2 usecases oranges en bas (liés différemment,
  rattachés à l'Hôte d'Accueil par des flèches de couleur distincte).
- **slide `#/12/17`** — `img/part1/full-usecases-list.png` : la même chose
  encore enrichie (un 3e groupe de 3 usecases ajouté au centre, sous
  l'Hôte d'Accueil, pour "Ajouter/Retirer une Table" + "Lister les tables
  d'un emplacement").

Il faudra un **nouveau composant** (pas encore construit) : un cadre "acteur"
à bordure double (voir l'image — deux traits concentriques, pas juste un
`titled-frame` classique) + des pilules "usecase" reliées par des **flèches
courbes** (pas des lignes droites comme `.quadrant-arrow`) partant d'un point
central. Le composant `.icon` (silhouette) existant est réutilisable tel quel
pour l'icône acteur. Etienne a dit que ces 3 slides sont *probablement* les
dernières images du deck — **revérifier** avec `grep '<img class="r-frame"'
workshop-ddd/docs/ddd-cote-metier.html` avant de considérer le deck "fini"
(au 2026-07-28, cette commande ne remonte plus que ces 3 + `babel-tower.jpg`,
qui elle est une vraie image/tableau à garder telle quelle).

### Autres demandes explicites d'Etienne, pas encore commencées

- **Étude comparative** entre `ddd-cote-metier.html` et le cours original en
  PDF, pour vérifier qu'aucun contenu n'a été perdu/dénaturé pendant la
  conversion HTML/CSS. Demander le PDF si absent du repo.
- **Étendre la conversion image→HTML/CSS aux autres cours** du workshop
  (`workshop-ddd/docs/partie-*.html`), qui partagent le dossier d'images
  `img/part1/` et probablement les mêmes diagrammes non convertis.
  ⚠️ Rappel important : les images "remplacées" dans `ddd-cote-metier.html`
  ne sont **pas** orphelines pour autant — `partie-1-domain-discovery.html`
  (et sans doute d'autres `partie-*.html`) les référencent encore. Toujours
  `grep` tous les `docs/*.html` avant de supprimer une image.
- **Passe globale sur les notes de speaker** — voir `notes.md` pour la
  proposition détaillée ; scope à confirmer avec Etienne au cas où il veuille
  autre chose que ce qui a été proposé.
- **Mode serveur pour l'interactivité** (plugins reveal.js `seminar` +
  `poll` + `questions`, pilotage à distance / sondages / Q&A en direct) —
  pas commencé, nécessite de vendoriser ces plugins + un petit serveur
  socket.io. Détails dans `memory.md`.
- **Refaire les boards Miro en Excalidraw** — Etienne doit fournir des
  exports/captures des boards existants ; produire des `.excalidraw` (JSON)
  éditables.
- **Nettoyage** : `workshop-ddd/docs/img/screen/Sans titre.png` est une
  capture de validation qu'Etienne veut supprimer une fois la diapo en cours
  terminée — le lui rappeler.

### Idée reportée, pas de demande explicite récente

- **Conversion en Markdown inline** des slides "texte simple" (~80% du deck :
  h5 + paragraphe + citations). Approche validée en discussion mais jamais
  démarrée : markdown *inline* uniquement (`<section data-markdown><textarea
  data-template>`, jamais de `.md` externe — le chargement XHR est bloqué en
  `file://`), garder en HTML les slides à layout (`slide-2col-*`,
  `slide-flex`, `titled-frame`). Décision explicite d'Etienne : **attendre
  que les gros changements de contenu soient terminés** avant de s'y
  attaquer — probablement le bon moment maintenant que la conversion
  HTML/CSS touche à sa fin, mais reconfirmer avec lui avant de commencer.
- **Utilitaires sémantiques CSS** (`.source`, `figure`/`figcaption`,
  `.frame--info/--ok/--warning/--danger`) déjà appliqués sur
  `ddd-cote-metier.html`, pas encore sur les `partie-*.html` — changement
  visuel, attendre le feu vert explicite d'Etienne avant de l'étendre.
