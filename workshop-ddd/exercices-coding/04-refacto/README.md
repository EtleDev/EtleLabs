# Exercice 4 — Refacto du PriceCalculator

> Pendant en code de [`exercices/04-refacto/`](../../exercices/04-refacto/).
> Le board et le code portent le **même** brief et les **mêmes** consignes :
> choisis l'un ou l'autre, pas les deux.

## Brief

Pour calculer le prix d'un trajet, l'algorithme prend la distance parcourue et la
multiplie par un taux fixe. Ce taux varie selon que la course est intra-muros ou
extra-muros :

- intra-muros → 1.20 € / km
- extra-muros → 1.65 € / km

## Consignes

- Lire le brief, puis refactoriser le code en introduisant des **Domain Objects**.
- Procéder par **pas très courts** : une intention par étape, et un message de
  commit qui la dit.
- L'appel HTTP vous mènera à un autre type de domain object : ne le sautez pas,
  faites-le émerger.
- Durée : 15 min.

Le livrable, ce n'est pas le code final : c'est la **suite des messages de
commit**. Commitez à chaque étape, même minuscule.

## Démarrer

| Langage | Installer | Tester |
|---|---|---|
| TypeScript | `npm install` | `npm test` |
| Java | — | `mvn test` |
| .NET | — | `dotnet test` |

Le test fourni passe déjà : il protège le comportement pendant la refacto.
Il ne doit **jamais** devenir rouge.
