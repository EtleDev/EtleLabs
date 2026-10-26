# Séance 5 — Agrégats & Domain Events

## Rendu du devoir

[Devoir session 4](../../homeworks/session-4/) — Voyage, Voiture, Passagers.

## Exercice 1 — Aggregates Découverts

Les participants posent les agrégats sortis de leur code et les commandes qui les
traversent : `PlanTrip`, `BookSeat`, « Réserver un ticket », « Rendre un ticket »,
« Rejoindre un trajet », « Quitter un trajet », « Ajouter un passager »,
« Annuler », avec les attributs disputés : `MaxAvailableSeats`, `Date du voyage`,
`Vehicule`, `Itinerary`, `tripDate`, `driverId`.

Arbitrage récurrent : **moins de contrôle** (petits agrégats) contre **moins de
code à écrire** (gros agrégats).

## Exercice 2 — Domain Events

Identifier les évènements du domaine et les distinguer des commandes.

## Exercice 3 — Patterns de Domain Events

Trois approches à comparer, décrites puis mises en balance. Point de doctrine
relevé en notes : un évènement est un **stimulus du système**, un point d'entrée
au même titre qu'un use case.

## Exercice 4 — Patterns de Transaction

Frontière transactionnelle et cohérence. Mentions relevées : *Transactionally
Consistent*, zone « Interdite ».

## Devoir annoncé en fin de séance

[Devoir session 5](../../homeworks/session-5/) — changement de date, notifications,
évènement externe.
