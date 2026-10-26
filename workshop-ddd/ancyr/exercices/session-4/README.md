# Séance 4 — Graphe d'objets & frontières d'agrégats

## Rendu du devoir

[Devoir session 3](../../homeworks/session-3/).

## Exercice 1 — Domain Objects Découverts (tri)

Reprise du canevas de tri de la séance 3, sur les objets du devoir sur
l'itinéraire : `Address`, `GeoPoint`, `Segment`, `Location`, `Lat/Long`,
`PathType`, `Distance`, `Arrival`, `Entrance`, `DepartureSegment`, `Highway`,
`Itinerary`, `UrbanRoadSegment`, `Price policy`, `factory`.

Question de relance notée sur le board : **« Où est le langage métier ? »** —
les objets portent des noms techniques (`Segment`, `PathType`) plutôt que le
vocabulaire du domaine (`Itinéraire`, `Adresse`).

## Exercice 2 — Graphe d'Objet

Construire le graphe d'objets correspondant au brief. Consignes relevées :
pas d'obligation d'annoter les flèches, pas de piège, 5-10 minutes.

**Le débrief est le cœur de l'exercice** : le graphe est volumineux ; traduit en
modèle physique de données, charger un `Journey` impose une énorme jointure SQL
(« bravo, tu viens de charger toute ta base »), ou du lazy loading configuré par
contexte, avec son risque de `NullRef`. Conclusion : on ne peut pas partir du
graphe d'objets pour modéliser le comportement — il vient **en complément** d'un
Event Storming.

## Exercice 3 — Aggregates Boundaries

Exercice puis discussion. Le cas support est un compte bancaire (« Retirer
l'argent » / « Déposer ») : où placer la frontière transactionnelle ?

## Devoir annoncé en fin de séance

[Devoir session 4](../../homeworks/session-4/) — Voyage, Voiture, Passagers.
