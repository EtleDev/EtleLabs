# Séance 6 — Persistance & cohérence

## Rendu du devoir

[Devoir session 5](../../homeworks/session-5/).

## Exercice 1 — Domain Persistence

Comment persister un domaine pur ? Arguments relevés des deux côtés :
« Pratique, évite le mapping », « Évite de créer des DAO » contre « Domaine impur »,
« Domain Verbose ». Réserves notées sur le board quant au contexte : convient à un
projet avancé, avec une équipe de gens assez qualifiés ; instable sinon.

**Règle posée en débrief :** on ne modifie **jamais** la donnée en base, on passe
**toujours** par le logiciel.

## Exercice 2 — Eventual Consistency

Quand accepter une cohérence différée entre agrégats, et ce que ça implique
(`TicketReserved`, `NewTicketAvailable`, `OnTicketRefunded`).

## Exercice 3 — Capacity Rule Pattern

Le cas support : `BookSeat` contre `MaxAvailableSeats`, « Quitter le voyage »,
« Modifier la date de départ ». Où vit la règle de capacité ?

## Devoir annoncé en fin de séance

[Devoir session 6](../../homeworks/session-6/) — Conducteur Confirmé, isolation en
module, système de points.
