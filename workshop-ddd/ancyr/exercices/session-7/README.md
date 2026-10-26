# Séance 7 — Intégration des contextes

Dernière séance : pas de devoir annoncé à la fin.

## Rendu du devoir

[Devoir session 6](../../homeworks/session-6/) — Conducteur Confirmé.

## Exercice 1 — Intégration des Contextes

Le cas support sort du domaine Moveo : `Doctor` / `Vacation` / `Schedule` avec un
`ReservedHandler` — un second domaine, pour montrer l'intégration sans se laisser
piéger par la familiarité du premier.

Côté Moveo, le fil se poursuit avec `DriverTitlesHandler`, `OnPassengerRemoved`,
`Driver Score handler`, `TripPlanned`, `TripCreated`, et un `PublicAPI` /
`Profile` / `Reward`. Le piège central : les **imports circulaires** entre
contextes.

## Auto-évaluation finale

Même canevas qu'en séance 3, pour mesurer le chemin parcouru.

## Questions

Un tableau permanent en trois colonnes, alimenté tout au long du workshop :
`Questions sans réponses` · `En attente` · `Traitées`.

> « Posez ici les questions que vous pouvez avoir au fur et à mesure que le
> Workshop avance. »

## Ressources

Le board se clôt sur une bibliographie, organisée en quatre entrées :
*Domain Driven Design*, *Design Orienté Objet*, *Recommandations débutants —
chemin du DDD*, *Recommandations débutants — chemin du design orienté objet*.
Y sont aussi cités les ateliers connexes : Example Mapping, Event Storming,
Impact Mapping, Domain Storytelling.
