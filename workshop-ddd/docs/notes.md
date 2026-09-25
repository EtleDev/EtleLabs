# Passe sur les notes de `ddd-cote-metier.html`

Rien n'a été modifié dans le deck. Tout ce qui suit est une proposition — tu coches
la case qui va pour chaque item et je reporte les changements validés dans le
fichier. Repère de navigation : `#/<chapitre>/<slide>` correspond au hash reveal.js
(ex. `ddd-cote-metier.html#/6/14`), 0-indexé, comme dans nos échanges précédents.

**Légende validation :**
`[ ] Appliquer tel que proposé   [ ] Appliquer avec modifs (précise)   [ ] Ne rien faire   [ ] Autre`

---

## 0. Avis général

Le corpus est riche et cohérent : beaucoup de notes sont déjà excellentes — des
exemples concrets et bien choisis (Kodak/Yamaha/Nokia, la douche/le carton pour
expliquer un modèle, "lorsque"/"condition" comme signal d'invariant), qui donnent
vraiment l'impression d'un formateur qui maîtrise son sujet et anticipe les
questions. Le ton "je découvre ce métier de formateur, dites-moi si ça ne va pas"
sur la première slide donne un cadre sympa, pas grave d'être visible tel quel.

Les points faibles sont surtout des **oublis de fin de phrase** (une note tronquée
au milieu d'une idée) et **quelques répétitions probablement non voulues**
(un même rappel collé sur deux chapitres consécutifs) plutôt que des problèmes de
fond. Le contenu ne demande pas de simplification nulle part — je n'ai rien trouvé
de trop verbeux au point de nuire à l'oral, à part la mise en forme (voir §2) de
la plus longue note (Amazon/LinkedIn/Google), qui gagnerait à être aérée sans
perdre un mot.

---

## 1. Changements de contenu proposés

### 1.1 — `#/5/0` — "Le domain" (titre de chapitre)

**Note actuelle :** *"dans ce cours on va surtout aborder le problem space"*

**Avis :** cette note est un copié-collé quasi identique de celle du chapitre
précédent (`#/4/0`, "Solution space" : *"dans ce cours on va surtout aborder le
problem space, et non le solution space"*). Elle est logique là-bas (le titre de
la slide est "Solution space", le rappel a du sens) mais semble être restée par
erreur sur le titre de CE chapitre ("Le domain"), où elle n'a pas vraiment de
rapport avec le sujet de la slide.

**Proposition :** supprimer cette note (celle du chapitre "Solution space" suffit).

`[x] Appliquer   [ ] Ne rien faire   [ ] Autre : ______`

---

### 1.2 — `#/5/3` — Domain node-grid (12 secteurs, aucun retenu)

**Note actuelle (dernière phrase) :** *"...ex : réservation, topologie, ... lis ta
diapo bordel"*

**Avis :** phrase d'auto-motivation, sympa mais probablement pas destinée à rester
si quelqu'un d'autre lit un jour ces notes (delivery partagée, export, etc.).

**Proposition :** retirer uniquement "*... lis ta diapo bordel*", garder le reste
tel quel :
> *Exemple : application de restauration qui a un domaine divisé en plusieurs
> sections (ex : réservation, topologie, ...)*
> *Tout ne fait pas partie du domaine du point de vue du logiciel que l'on veut
> développer. Nous on veut développer une application de réservation de table
> sur un restaurant.*

`[ ] Appliquer   [x] Ne rien faire (je la garde, c'est pour moi)   [ ] Autre : ______`

---

### 1.3 — `#/6/8` — Supporting subdomains, version remplie (Topologie + Client)

**Note actuelle :** *"dans notre exemple"* — s'arrête net.

**Avis :** ses slides sœurs sont complètes (`#/6/4` : *"dans le cadre de notre
exemple, c'est le système de réservation"* ; `#/6/12` : *"dans notre exemple,
gestion du personnel administratif"*). Celle-ci semble juste tronquée à l'écriture.

**Proposition :**
> *dans notre exemple, ce sont la topologie du restaurant et le suivi client*

`[ ] Appliquer   [ ] Appliquer avec modifs : ______   [ ] Ne rien faire`

---

### 1.4 — `#/8/3` — "Impédance de langage" (3 bullets : essence du besoin / langage appauvri / produit non conforme)

**Note actuelle :** *"Ajouter une animation, se reférer au cours original"*

**Avis :** ça ressemble à un TODO technique plutôt qu'à une note de présentateur
— et il semble déjà résolu : la slide a `class="fragment"` sur 3 des 4 lignes,
donc l'animation d'apparition progressive existe déjà. À confirmer avec toi
(peut-être que "l'animation" demandée dans le cours original est différente de
ce fragment simple ?).

**Proposition :** si le fragment actuel te convient, supprimer la note (obsolète).
Sinon, dis-moi ce que tu avais en tête et je l'implémente avant de reformuler la note.

`[ ] Supprimer (le fragment actuel suffit)   [x] Non, voici ce que je voulais : Tu peux enlever la partie d'ajout d'animation, mais il faut que je garde de checker le cours original`

---

### 1.5 — `#/12/4` — USECASE Template

**Note actuelle (dernière ligne) :** *"Les invariants c'est ce qui est maintenu
tout au long de l'execution de ton main course"*

**Avis :** le template affiché sur la slide n'a pas de champ "Invariants" (il a :
Nom / Description / Acteurs / Déclencheurs / Informations requises /
Préconditions / Postcondition / Main course / Alternative courses). La note
explique un concept qui n'apparaît nulle part à l'écran — un peu déroutant si un
élève cherche la case correspondante.

**Proposition (à choisir) :**
- **(a)** Ajouter une ligne `Invariants :` au template affiché, pour que note et
  slide correspondent.
- **(b)** Garder le template tel quel et préciser dans la note que c'est une
  notion bonus, pas un champ du template : *"(Note : les invariants ne sont pas
  un champ du template ci-dessus, c'est une notion complémentaire à garder en
  tête pendant le Main course.)"*

`[ ] Option (a)   [x] Option (b)   [ ] Ne rien faire`

---

### 1.6 — `#/2/2` — "Territoire" (1er diagramme Problem space / Solution space)

**Note actuelle :** *"Problem space => orienté produit"*

**Avis :** la note ne parle que du Problem space (moitié gauche du schéma), rien
sur le Solution space (moitié droite) — alors que la slide montre les deux.

**Proposition :**
> *Problem space => orienté produit (comprendre le besoin)*
> *Solution space => orienté technique (comment on construit la réponse)*

`[x] Appliquer   [ ] Appliquer avec modifs : ______   [ ] Ne rien faire`

---

## 2. Notes à ajouter (slides qui n'en ont pas, où ça me semble utile)

### 2.1 — `#/1/9` et `#/1/10` — "Problème : décalage développeurs/clients" et "Résultat"

Aucune note sur ces deux slides, pourtant charnières (c'est la conclusion visuelle
du chapitre d'intro : décalage → produit cassé). Proposition pour `#/1/9` :

> *C'est le même schéma que la slide précédente (silo), mais on isole le
> problème central : il n'y a plus AUCUN pont entre les deux équipes — pas juste
> une déformation du message (silo), une absence totale de lien.*

Et pour `#/1/10` :

> *L'écran cassé symbolise ce qui sort de ce vide : un produit qui ne correspond
> à rien de ce qu'attendait le client. Les 2 fragments (difficile à maintenir /
> pénible à utiliser) peuvent être introduits en demandant au groupe d'anticiper
> les conséquences avant de cliquer.*

`[ ] Ajouter les deux   [ ] Ajouter seulement #/1/9   [ ] Ajouter seulement #/1/10   [ ] Aucune`

---

### 2.2 — `#/11/1` — "Problème" (brief incomplet + cuillère Matrix en fragment final)

Aucune note. Proposition, en lien avec ce qu'on avait discuté sur le mythe de Babel :

> *La référence Matrix ("il n'y a pas de cuillère") marche bien ici : Neo essaie
> de plier la cuillère par la force, alors que le gamin lui dit qu'il faut d'abord
> accepter qu'elle n'existe pas comme il croit qu'elle existe. Même chose en
> logiciel : arrêter de chercher "la bonne info implicite" comme si elle était
> cachée quelque part dans le brief — elle n'existe nulle part tant qu'on ne l'a
> pas rendue explicite avec l'expert.*

`[ ] Ajouter   [ ] Ajouter avec modifs : ______   [ ] Non merci`

---

### 2.3 — `#/11/2` et `#/11/3` — "Vision du développeur" / "Vision de l'expert"

Aucune note sur ce diptyque (pourtant le cœur de la démonstration du chapitre :
la 2e colonne de règles invisibles qui apparaît). Proposition, une seule note sur
la 1ère slide du couple (`#/11/2`) puisque la 2e n'est qu'une révélation de la même chose :

> *Avant de cliquer pour révéler la colonne cachée : demander au groupe s'il
> pense que les deux équipes voient exactement la même chose. Le but est de leur
> faire ressentir l'écart avant de leur montrer — pas juste de l'expliquer.*

`[ ] Ajouter   [ ] Ajouter avec modifs : ______   [ ] Non merci`

---

### 2.4 — `#/3/4` — node-grid "Entreprise" (secteurs d'activité, un seul retenu)

Aucune note sur cette slide qui introduit le node-grid réutilisé plusieurs fois
ensuite dans le chapitre. Proposition :

> *Une entreprise a plein de secteurs d'activité, mais un seul (ici en 💰) est
> celui pour lequel on va investir le plus d'effort de conception — c'est le
> même principe qu'on va retrouver appliqué au domaine juste après (Core/
> Supporting/Generic subdomain).*

`[ ] Ajouter   [ ] Ajouter avec modifs : ______   [ ] Non merci`

---

### 2.5 — `#/12/8` — "Avons-nous toutes les informations pour commencer à coder ?"

**Note actuelle :** *"Evidement NON ! ..."* — s'arrête sur des points de suspension.

**Proposition (complément plutôt que remplacement) :**
> *Evidemment NON ! On a listé les usecases qu'on nous a donnés, mais pas ceux
> qu'on va découvrir en posant de meilleures questions — cf. la slide suivante
> avec les 2 usecases implicites en jaune.*

`[x] Compléter comme proposé   [ ] Compléter autrement : ______   [ ] Ne rien faire`

---

### 2.6 — Slides "brief" sans note (`#/10/2` à `#/10/10`)

Sur les 9 slides de citations du brief client, une seule (`#/10/5`, "condition"/
"lorsque") a une note. Je n'ai pas de texte concret à proposer pour les 8 autres
(ça dépend trop de ta lecture à voix haute), mais je signale le déséquilibre au
cas où certaines méritent un petit repère de mise en scène (pause, insistance sur
un mot) comme celle qui existe déjà.

`[ ] Je m'en occupe moi-même   [ ] Pas la peine, c'est voulu`

---

## 3. Mise en forme

### 3.1 — Rendu visuel (dans la vue présentateur, notes en Markdown)

Trois incohérences reviennent dans le fichier :

- **En-têtes de section :** tantôt `# Titre` (une seule fois, `#/1/0`), tantôt
  `## Titre` (`#/6/5`, sous-parties Amazon/LinkedIn/Google), tantôt
  `**Titre :**` en gras simple (`#/8/1` "**Définition :**", `#/3/7` "**Distillation** :"),
  tantôt rien du tout. Résultat : dans la
  vue présentateur, certaines notes ont un vrai titre de section qui ressort
  visuellement, d'autres non, sans que ça corresponde à une différence
  d'importance ou de longueur.
  → **Proposition :** réserver `##` aux notes qui ont plusieurs sous-parties
  (comme `#/6/5`, 4 sous-parties Amazon/LinkedIn/Google/Conclusion), et
  `**Label :**` pour un simple repère en début de note (comme `#/8/1`
  "**Définition :**"). Pas de `#` (H1) — trop gros à l'usage vu le peu de place
  dans le panneau de notes.

- **Retours à la ligne "durs" :** certaines notes utilisent la technique Markdown
  du double-espace en fin de ligne pour forcer un retour à la ligne sans nouveau
  paragraphe (ex. `#/1/0`, `#/2/1`, `#/6/2`, `#/6/5`) — invisible à l'œil dans un éditeur
  normal, donc facile à casser par erreur en retapant la ligne. D'autres notes
  s'appuient juste sur des lignes vides (vrais paragraphes). Les deux rendent
  différemment (paragraphe séré vs. espacé).
  → **Proposition :** abandonner les doubles-espaces en fin de ligne partout,
  et utiliser uniquement des lignes vides pour séparer les idées. Rendu un peu
  plus aéré, mais rien de risqué à l'édition.

- **Listes :** parfois de vraies listes Markdown (`- système de paiement`,
  `#/6/13`), parfois des flèches `=>` en début de ligne (`#/1/0`),
  parfois juste des phrases séparées par des retours à la ligne. Les vraies
  listes (`- item`) sont les seules à produire des puces visuelles dans le rendu.
  → **Proposition :** remplacer les `=>` d'énumération par de vraies listes
  `- item` quand il y a 2+ éléments côte à côte (les `=>` gardent leur sens
  ailleurs, comme lien de cause à effet dans une phrase).

`[ ] Appliquer les 3 (je passe sur tout le fichier)   [ ] Appliquer seulement : ______   [ ] Ne rien faire`

---

### 3.2 — Lisibilité du code source (pour tes futures éditions à la main)

- **Un `<aside>` mal placé :** sur `#/7/2` ("DECISIVE CORE"), la note est
  imbriquée à l'intérieur de `<div class="slide-2col-text">` au lieu d'être un
  enfant direct de `<section>`, comme partout ailleurs. Ça fonctionne quand même
  (reveal.js retrouve la note peu importe sa profondeur), mais si tu cherches "où
  sont mes notes" en scannant l'indentation, celle-ci se cache un niveau plus bas
  que ses voisines.
  → **Proposition :** la sortir au même niveau que les autres `<aside>`, juste
  avant le `</section>` de fermeture.

- **Ligne vide après l'ouverture de l'`<aside>` :** incohérent — parfois le texte
  commence juste après `<aside data-markdown class="notes">` (la majorité des
  cas), sauf sur `#/3/7` où une ligne vide traîne juste après l'ouverture. Sans impact sur le
  rendu, juste un confort de lecture du code.
  → **Proposition :** supprimer systématiquement cette ligne vide en tête.

- **La note "Amazon/LinkedIn/Google" (`#/6/5`)** fait ~50 lignes d'un bloc quasi
  continu dans le fichier. Le contenu est très bon, je ne toucherais à aucune
  phrase, mais dans le code source, une ligne vide franche avant/après chaque
  `##` sous-partie (Amazon / LinkedIn / Google / Conclusion) aiderait à
  repérer où on est d'un coup d'œil en scrollant, sans avoir à tout relire.

- **TODO personnels mélangés aux notes de présentateur :** deux notes ("*lis ta
  diapo bordel*" en §1.2, "*Ajouter une animation...*" en §1.4) sont des
  pense-bêtes pour toi, pas des notes à dire à voix haute — mais rien ne les
  distingue visuellement des vraies notes de présentateur dans le code.
  → **Proposition (pour la suite, pas une action immédiate) :** si tu gardes ce
  genre de pense-bêtes à l'avenir, préfixe-les par `TODO:` — ça te permettra de
  les retrouver avec une recherche et de les nettoyer d'un coup avant une vraie
  présentation.

`[ ] Appliquer les 3 premiers points   [ ] Appliquer seulement : ______   [ ] Ne rien faire`

---

## Récapitulatif rapide

| # | Slide(s) | Type | Statut |
|---|----------|------|--------|
| 1.1 | `#/5/0` | Supprimer | ⬜ |
| 1.2 | `#/5/3` | Simplifier | ⬜ |
| 1.3 | `#/6/8` | Compléter | ⬜ |
| 1.4 | `#/8/3` | Supprimer / à clarifier | ⬜ |
| 1.5 | `#/12/4` | Corriger incohérence | ⬜ |
| 1.6 | `#/2/2` | Compléter | ⬜ |
| 2.1 | `#/1/9`, `#/1/10` | Ajouter | ⬜ |
| 2.2 | `#/11/1` | Ajouter | ⬜ |
| 2.3 | `#/11/2` | Ajouter | ⬜ |
| 2.4 | `#/3/4` | Ajouter | ⬜ |
| 2.5 | `#/12/8` | Compléter | ⬜ |
| 2.6 | `#/10/2`–`#/10/10` | Signalement seul | ⬜ |
| 3.1 | Tout le fichier | Mise en forme visuelle | ⬜ |
| 3.2 | Tout le fichier | Mise en forme code | ⬜ |
