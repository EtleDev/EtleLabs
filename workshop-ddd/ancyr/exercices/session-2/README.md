# Séance 2 — Domain Objects & Services

Première séance avec débrief de devoir. Le code des participants devient le
matériau des exercices.

## Rendu du devoir

[Devoir session 1](../../homeworks/session-1/) — calcul du prix intra/extra-muros.
Rétro en trois pastilles, puis revue des solutions.

## Exercice 1 — Domain Objects Découverts

**Consigne :** « Quels Domain Objects ressortent du code que vous avez écrit dans
vos devoirs ? »

**Canevas :** une zone par participant, où il pose les objets sortis de son propre code.
Objets effectivement relevés : `Price`, `PriceCalculationService`, `Ride`, `Distance`,
`Money`, `PricePerMeter`, `TravelType`, `Zone`, `Currency`.

**Questions de relance posées sur le board :** qu'est-ce que `Money` dans le domaine ?
Y a-t-il une notion de « taux » ? Existe-t-il des horaires majorés ? Un prix par pays ?
`0.12` — quelle unité ? Est-ce vraiment un `trip` ?

**Auto-évaluation associée :** « Sur une note de 1 à 10, à combien pensez-vous que
votre code reflète le Domain ? » (les participants se sont donné 5 et 6).

## Exercice 2 — Refactoring

Passage de l'`enum TravelType` à une classe avec constructeur privé et fabriques
statiques — le point d'entrée vers les Value Objects. Exercice **de code**, support
board pour la comparaison des solutions.

## Exercice 3 — Domain / Application Services

Distinguer les deux responsabilités. Mise en garde relevée sur le board : le
*Services Prison* — tout finit en service et le domaine se vide de son
comportement. Concepts posés : un Concept du Domaine est défini par des règles,
« l'algèbre de la classe ».

## Devoir annoncé en fin de séance

[Devoir session 2](../../homeworks/session-2/) — taux depuis un système tiers,
devises, remise de 10 %.
