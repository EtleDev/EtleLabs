# Devoirs — workshop original (7 sessions)

Les devoirs sont les exercices **réalisés entre deux séances**, puis débriefés au
début de la séance suivante. Ils forment un fil continu : une seule base de code
TypeScript qui grossit de session en session.

Source : <https://github.com/Ancyr-Academy/wk-ddd-2025April29> (TypeScript, vitest, pnpm).
Les énoncés proviennent du `README.md` du repo, qui s'enrichit à chaque branche ;
la version la plus complète est celle de `session-6-end`.

## Convention de branches

Pour un devoir donné en fin de session N :

| | Branche |
|---|---|
| Point de départ | `session-N-start` |
| Corrigé | `session-N-end` |

`session-N-end` est (à quelques fichiers près) le point de départ de la session
suivante — d'où la continuité du fil rouge.

**Deux exceptions :** la session 1 part de `main` et son corrigé est `session-2` ;
la branche `session-2-start` n'existe pas, c'est `session-2` qui en tient lieu.

## Attention à la numérotation

Le `## Session N` du README du repo **n'est pas** la session N du board Miro :
c'est le devoir **donné à la fin** de cette session-là. Exemple : le devoir
« Session 4 » (Voyage, Voiture, Passagers) est débriefé à la session **5** du
board, intitulée « Aggregates Découverts ».

## Les devoirs

| Devoir | Sujet | Notions |
|---|---|---|
| [Session 1](session-1/) | Calcul du prix intra/extra-muros à taux fixe | Value Objects, Domain Objects |
| [Session 2](session-2/) | Taux depuis un système tiers, devises, remise de 10 % | Application / Domain Services, Repositories, Entities |
| [Session 3](session-3/) | Geocoder, segments d'itinéraire, péages, tarifs par ville | Policies, Process |
| [Session 4](session-4/) | Voyage, Voiture, Passagers | Aggregates, invariants |
| [Session 5](session-5/) | Changement de date, notifications, évènement externe | Domain Events |
| [Session 6](session-6/) | Conducteur Confirmé, isolation en module, système de points | Bounded Contexts |

Il n'existe pas de devoir pour la session 7 : c'était la dernière séance.

## Rétro de devoir

Chaque séance s'ouvrait sur une rétro du devoir, en trois pastilles à glisser :

- **Combien de temps vous a pris le devoir ?** — `< 30 mn` · `< 1 h` · `< 2 h` · `< 4 h` · `+ 4 h`
- **Quelle a été la difficulté ?** — de `Facile` (1) à `Difficile` (5)
- **Avez-vous aimé l'exercice ?** — de `Peu aimé` (1) à `Beaucoup aimé` (5)
