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
- **Adapter deux exercices à des cas support plus parlants** — policies
  → colisage d'expédition, invariants d'agrégat sous concurrence →
  numérotation de facturation. Idées d'Etienne du 2026-10-16, détaillées dans
  `workshop-ddd/exercices/README.md`, pas encore instruites.
- **Outillage autour des canevas Excalidraw** — quatre outils demandés par
  Etienne le 2026-10-20 ; **les outils 1 et 3 sont prioritaires**, et feront
  l’objet de commits voire de branches séparés. Principe directeur :
  l’`.excalidraw` versionné reste la **source**, Lucid et Miro ne sont que des
  surfaces de diffusion en séance.
  1. **Convertisseur Excalidraw → Lucid.** ⭐ **Prioritaire.** Contrainte de
     politique d’entreprise : le travail se versionne sous Excalidraw mais doit
     pouvoir vivre sous Lucid. Cible probable : le format *Lucid Standard Import*
     (JSON documenté et importable), à vérifier avant de s’engager.
  2. **Convertisseur Excalidraw → Miro.** Plus contraint : Miro n’offre pas
     d’import de fichier public, il faudra passer par l’**API REST** (création
     des items un par un), donc une app Miro et un token.
  3. **Synthèse PDF post-séance.** ⭐ **Prioritaire.** Reproduit ce qu’Etienne
     fait aujourd’hui à la main : le master est copié dans un board dédié à
     l’équipe, elle travaille dessus, et le board entier part en un grand PDF.
     L’outil doit donc **rassembler** les sorties de tous les petits exercices,
     regroupées par séance, en un board unique, puis l’exporter.
     Intention explicite : une **synthèse inamovible**, pas un support avec lequel
     les participants continuent de jouer — le PDF est le bon format, pas un
     board partagé.
     Piste technique : les **frames** Excalidraw pour matérialiser les séances,
     export SVG, assemblage HTML, impression via Chrome headless (présent sur la
     machine ; poppler, non).
     ⚠️ **Question bloquante avant de coder** : où se déroule réellement la séance ?
     Si les exercices tournent sous Excalidraw, l’outil 3 lit des `.excalidraw` et
     tout s’enchaîne. S’ils tournent sous Lucid, il faut un retour Lucid →
     Excalidraw (coûteux), ou alors l’outil 3 se réduit à l’assemblage et c’est
     Lucid qui exporte le PDF.
  3bis. **Embarquer l’éditeur Excalidraw dans le deck** — à instruire **le jour où
     le deck passe en mode serveur**, pas avant : le paquet `@excalidraw/excalidraw`
     est un module ES qui exige React et un bundler, incompatible avec la règle
     `file://`.
     ⚠️ À savoir avant de s’emballer : **le paquet npm n’embarque pas la
     collaboration**. Un éditeur intégré donne à chaque élève un canevas *privé*,
     pas un tableau partagé. La collaboration d’excalidraw.com repose sur un
     service séparé (`excalidraw-room`, socket.io + chiffrement de bout en bout)
     qu’il faudrait héberger et câbler soi-même — donc du développement, pas un
     réglage. Les images Docker toutes faites embarquent en dur le serveur public
     d’Excalidraw, ce qui est un piège classique.
     Contournement sans rien construire : garder le tableau partagé sur
     excalidraw.com (collaboration en direct, gratuite, chiffrée) dans une seconde
     fenêtre, et n’embarquer dans le deck qu’un canevas individuel si le besoin
     s’en fait sentir.
  4. **Plateforme d’exercices interactifs dédiés.** Chantier énorme, à cadrer
     séparément. Recouvre en partie l’item *Mode serveur pour l’interactivité*
     ci-dessus : même besoin de serveur, même public. À instruire ensemble
     plutôt qu’en parallèle.
- **Volet « IA et bonnes pratiques »** — demandé le 2026-10-26. Questions ouvertes :
  un chapitre dédié dans un seul deck, ou un disclaimer repris dans tous ? Faut-il
  ajuster les decks existants et y ajouter des exemples ? À cadrer avant d'écrire.
- **Alimenter la banque d'exercices** — adapter et créer plusieurs exercices
  supplémentaires, au-delà des 15 recensés. Rejoint les idées d'adaptation
  (colisage, numérotation de facturation) déjà notées.
- **Intégrer Mermaid quand c'est pertinent** — le plugin est déjà vendorisé dans
  `presentation-set-custom/plugin/mermaid/` mais n'est utilisé nulle part.
  Identifier les schémas des decks qui gagneraient à être des diagrammes Mermaid
  plutôt que du HTML/CSS ou des images.
- **Brainstorming « comment améliorer le cours »** — session de travail à prévoir
  entre Etienne et Claude. Objectif : des propositions, **sans modifier le cours**
  tant qu'elles ne sont pas validées.
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
