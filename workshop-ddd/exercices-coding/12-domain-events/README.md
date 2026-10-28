# Exercice 12 — Identifier les domain events

> Pendant en code de [`exercices/12-domain-events/`](../../exercices/12-domain-events/).

## Scénarios

1. Lorsqu'un passager rejoint un voyage, le conducteur est notifié.
   Implémentez le code qui correspond à cette fonctionnalité.
2. Lorsqu'un passager est banni de l'application, il doit être retiré du voyage.
   Vous recevez cette notification depuis l'extérieur. Implémentez la solution.

## Consignes

- Partir du squelette fourni.
- **Scénario 1** : le domaine doit dire ce qui vient d'arriver, sans connaître
  qui l'écoute.
- **Scénario 2** : l'évènement vient du dehors — ce n'est pas un domain event,
  il en *déclenche* un.
- Durée : 15 min.

Les deux scénarios se ressemblent et ne sont pas du tout la même chose. C'est
tout l'exercice.

## Démarrer

| Langage | Installer | Tester |
|---|---|---|
| TypeScript | `npm install` | `npm test` |
| Java | — | `mvn test` |
| .NET | — | `dotnet test` |

Le test fourni décrit le scénario 1 et **échoue** au départ : c'est à vous de le
faire passer. Le scénario 2 n'a pas de test — à vous de l'écrire.
