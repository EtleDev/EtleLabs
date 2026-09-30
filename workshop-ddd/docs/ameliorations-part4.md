# Pistes d'amélioration — `workshop-ddd-part4.html`

Créé le 2026-09-28, pendant la conversion de `partie-4-aggregates.html` vers
`workshop-ddd-part4.html` (nouveau thème, chapitres verticaux, schémas en
HTML/CSS). La conversion elle-même est **fidèle** : rien n'a été ajouté ni
retiré du contenu. Ce fichier liste ce qui a été remarqué au passage et qui
mériterait d'être traité **dans un second temps**, sur décision d'Etienne.

Rien ici n'est appliqué. Chaque item est indépendant et peut être pris ou
écarté séparément.

## Ce qui a changé par rapport à l'original (pour mémoire)

- Thème `hexafox-dark`, 4 chapitres verticaux (Aggregates / Règles des
  aggregates / Domain Events / La dernière règle des aggregates) + plugin
  `chapter-footer`. Le `h1` isolé « PATTERNS TACTIQUES » (sans contenu) a été
  retiré ; la slide de titre a pour sous-titre « Aggregates ».
- Les slides « Responsabilité » consécutives fusionnées en une seule par
  chapitre (2 dans Aggregates, 4 dans Domain Events, leurs notes regroupées), avec fragments `fade-in-then-semi-out`
  (comme les parties 2 et 3).
- Titres harmonisés : `h1` en casse normale (plus de MAJUSCULES). Pas de
  slide de code dans cette partie, donc rien à passer en `h5`.
- 6 des 7 images refaites en HTML/CSS avec un nouveau composant
  `.aggregate-diagram` (dans `reveal-extended.css`) : `bank-account`,
  `bank-account-withdrawal`, `concert-buy-ticket`, `bank-account-event`,
  `bank-account-events`, `bank-account-eventual-consistency`. Les images
  ne sont **pas** orphelines, `partie-4-aggregates.html` les utilise
  toujours. `objects.png` reste une image (voir item 2).
- Corrections appliquées au passage : « Ne peux être / Ne peux acheter » →
  « Ne peut être / Ne peut acheter » (texte des schémas), et le
  `<span class="highlight"></span>` vide qui empêchait « Eventual » d'être
  surligné sur la slide « Eventual signifie “tôt ou tard” ».
- Slide de titre avec sous-titre, et slide « Merci ! / Des questions ? » en
  fin de deck (même chose que les parties 2 et 3).
- **Transverse** : le plugin `chapter-footer` prenait comme sous-titre le
  premier `h2`/`h3` de la slide de chapitre, *y compris dans les notes*
  (le markdown des notes est rendu en HTML). Sur « La dernière règle des
  aggregates », le pied de page affichait « RAPPEL et discussion : ». Le
  plugin ignore maintenant les `h2`/`h3` contenus dans `.notes`. Ça touche
  tous les decks, mais le comportement ne change que si une slide de chapitre
  a un titre markdown dans ses notes.

## 1. Les « Exercice pratique » et la « Démonstration » n'ont rien à l'écran

Six slides (1-1, 1-11, 3-4, 3-5, 4-10, plus la démonstration 1-10) : un
titre seul, les consignes et le corrigé sont dans les notes. La 1-1 parle
d'un « brief sur la gauche » qu'aucune slide ne montre, et la 3-4 de
« 3 approches » qui ne sont décrites nulle part. La 4-10 n'a même pas de
consignes, seulement des remarques.

Proposition : une slide de consignes visible (objectif, support, durée), le
corrigé restant en notes. Même constat que l'item 1 de
`ameliorations-part2.md` / `ameliorations-part3.md`.

## 2. `objects.png` gardée en image

L'arbre de 17 objets (User → Bank Account → Credit Card → …) n'a pas été
refait : trop de flèches en équerre pour le composant actuel. L'image garde
les couleurs de l'ancien thème (cyan saturé sur fond bleu pétrole) et
détonne à côté des schémas refaits. Options : la refaire en SVG inline, ou
la réexporter depuis la source (Figma ?) avec les couleurs hexafox.

## 3. Animer l'enchaînement des schémas du compte bancaire

1-3 → 1-4 (on ajoute Alice et Bob) et 3-2 → 3-3 (on ajoute Deposit et
Argent Déposé) se suivent et ne diffèrent que par ce qu'on ajoute : c'est
un bon candidat pour `data-auto-animate`. Il faudrait des `data-id` sur les
boîtes et aligner leurs positions d'une slide à l'autre (aujourd'hui, la
frontière de 1-3 est centrée, celle de 1-4 est décalée à droite, comme dans
les images d'origine). Le composant se centre déjà sans `transform`, il est
donc compatible avec auto-animate.

## 4. Schémas moitié anglais, moitié français

« Bank Account » (1-3 à 3-3) devient « Compte Bancaire » en 4-7 ; les
commandes sont en anglais (Withdraw, Deposit, BuyTicket) mais les events en
français (« Argent Retiré », « Argent Déposé »), sauf en 4-7
(« MoneyDeposited »). À harmoniser, ou à assumer (langage du code vs
langage métier) et à dire à l'oral.

## 5. Slides de texte sans titre

« Gardez vos Aggregates… », « Gros Aggregate = Faible Concurrence »,
« Transactional / Eventual Consistency », « Eventual ne signifie pas… »,
« Est-ce grave si… » : texte nu directement dans la `<section>` (pas de
`<p>`, pas de `h5`), alors que les slides voisines ont un `h5`
(« Responsabilité », « Règle n »). Ajouter un `h5` (« Définition »,
« Question »…) les rendrait cohérentes.

La slide « Gardez vos Aggregates aussi petit que nécessaire » (1-6) fait
doublon avec la « Règle 2 » (2-2), qui dit la même chose.

## 6. Coquilles et formulations à l'écran

- « aussi petit que nécessaire » → « aussi **petits** que nécessaire »
  (1-6 et 2-2).
- « Designer vos Aggregates » → « Designez vos Aggregates » (2-1).
- « consistence » → « cohérence » (terme français usuel pour *consistency*)
  ou au moins « consistance » (4-5).
- Guillemets anglais “ ” → guillemets français « » (4-4, 4-5).

## 7. Deux fois la slide « Dans 5ms… »

4-6 (5ms → 1 minute) et 4-9 (5ms → 1 jour) : la seconde reprend la
première en ajoutant « 1 jour ! ». C'est sans doute voulu (on revient au
même raisonnement après le virement SEPA), mais on pourrait aussi
n'afficher que « 1 jour ! » en 4-9, pour ne pas refaire défiler les quatre
fragments.

## 8. Notes de speaker

- Timecodes de l'enregistrement d'origine (« Time code : 1h50 », « 2h02 »,
  « solution 2h14 », « timecode 0h23 ») et « Fin du cours 1 » : utiles à
  l'auteur, pas au speaker. À retirer ou à regrouper.
- La remarque « Rule pattern : différent de policy… » (notes de « La
  dernière règle des aggregates ») renvoie à la partie 3 et n'a pas de lien
  avec l'eventual consistency.
- L'exercice d'intro parle de « Journey » (domaine voyage) : même question
  que l'item 6 de `ameliorations-part3.md`, à trancher pour tout le workshop.
- Typos : « concurence » → « concurrence » (×3), « arrété » → « arrêté »,
  « intéractions » → « interactions », « permmettent » → « permettent »,
  « aggrégat » → « aggregate », « transactionnal » → « transactional »,
  « fonctionalités » → « fonctionnalités », « tu en tue » → « tu en tues »,
  « tu met » → « tu mets », « Ca » → « Ça », « quelque soit » → « quel que
  soit », « traffic » → « trafic », « sérialisable » → « sérialisables »,
  « mesures compensatoire » → « compensatoires », « la données » → « les
  données ».
