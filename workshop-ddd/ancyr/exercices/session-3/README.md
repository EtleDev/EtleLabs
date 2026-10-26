# Séance 3 — Pureté & Policy Pattern

## Rendu du devoir

[Devoir session 2](../../homeworks/session-2/).

## Exercice 1 — Domain Objects Découverts (tri)

Même exercice qu'en séance 2, mais le canevas devient un **tri par catégorie** :
chaque participant range les objets de son code sous sept en-têtes.

`Value Object` · `Entity` · `Repository` · `Domain Service` · `Infrastructure` ·
`Policy` · `Other`

Objets effectivement triés : `Currency`, `Discount`, `Distance`, `TravelType`,
`PricePerKmProvider`, `SpyPricePerKmProvider`, `TripZone`, `MonthlyTrips`,
`TravelTypeRates`, `RealtimeClock`, `TauxChangeRepository`, `InMemoryForex`,
`SpyForex`, `SpyTripsRepository`, `CalculerPrixHandler`.

C'est le canevas le plus réutilisé du workshop — il revient en séance 4.

## Exercice 2 — Purity & Completeness

Évaluer son propre code selon deux axes : le domaine est-il **pur** (sans
dépendance à l'infrastructure) et **complet** (le comportement est-il dans le
domaine ou dans les services) ? Verdicts relevés : « Domaine est pure »,
« respecte le SRP », « Semble clean », « Complet », « Impure ».

## Exercice 3 — Policy Pattern

Deux implémentations d'un système de paiement à comparer : **Strategy Pattern** à
droite, **Template Method** à gauche. La différence posée en débrief : le Template
Method internalise l'algorithme et délègue la variabilité à des méthodes
abstraites.

Puis implémentation du pattern Policy, avec une consigne forte : implémenter les
besoins métier **au fur et à mesure qu'ils arrivent**, sans sauter directement à
la solution finale.

## Auto-évaluation

Deux axes à positionner : *connaissance théorique* (aucune · j'en ai entendu parler ·
j'ai lu sur le sujet · j'ai étudié en profondeur · j'ai enseigné) et *expérience
pratique* (aucune · j'ai fait des exos · j'ai construit un prototype · utilisé en
production · j'ai mené un projet DDD).

## Devoir annoncé en fin de séance

[Devoir session 3](../../homeworks/session-3/) — geocoder, segments d'itinéraire,
péages, tarifs par ville.
