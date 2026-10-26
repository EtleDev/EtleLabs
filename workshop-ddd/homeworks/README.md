# Devoirs — découpage sur 5 séances

## Le rôle d'un devoir

Un devoir fait deux choses à la fois :

1. **Appliquer** les notions de la séance qui vient de se terminer ;
2. **faire buter** sur les problèmes que les patterns de la séance suivante vont résoudre.

C'est ce second rôle qui commande le découpage. Un devoir mal placé prive la séance
suivante de son déclencheur : les participants découvrent le pattern sans avoir
ressenti le besoin.

## La source de référence

Les **6 devoirs d'origine** sont conservés intacts dans
[`../ancyr/homeworks/`](../ancyr/homeworks/), avec leurs branches de départ et de
corrigé. C'est le réservoir : on y puise, on y recoupe, on n'y touche pas.

Un devoir peut être **scindé** entre deux séances — c'est même nécessaire ici, le
cours ayant été redécoupé.

## Proposition A — alignée sur le cours redécoupé

Lecture des chapitres réels des decks :

| Partie | Chapitres | Notions installées |
|---|---|---|
| 1 | Territoire · Problem/Solution space · Subdomains · Impédance de langage · Le modèle · Créer le langage · Rendre l'implicite explicite · Analyser les use cases | Découverte du domaine, langage ubiquitaire, use cases |
| 2 | Analyser les objets · Domain Objects · Value Objects · Domain Services · Architecture | Objets du domaine, VO, services |
| 3 | Entities · Repositories · Policy pattern | Entités, repositories, policies |
| 4 | Aggregates · Règles des aggregates · Domain Events · La dernière règle | Agrégats, invariants, évènements |
| 5 | Bounded Contexts · Délimiter · Intégrer | Contextes et leur intégration |

D'où :

| Après | Devoir | Applique | Fait émerger — pour la partie suivante |
|---|---|---|---|
| **1** | [S1](../ancyr/homeworks/session-1/) *(entier)* | Langage du domaine sur un premier bout de code | L'obsession des primitifs : `number`, `string` partout → **Value Objects** (partie 2) |
| **2** | [S2](../ancyr/homeworks/session-2/) *(entier)* | VO et services sur le taux, les devises | Le taux vient d'un système tiers et la remise exige de retrouver les trajets du mois → **repository** et **entité** (partie 3) |
| **3** | [S3](../ancyr/homeworks/session-3/) *(entier)* + [S4](../ancyr/homeworks/session-4/) **exercice 1** | Policies sur les tarifs par ville, repository du geocoder | L'objet Voyage porte une règle (3 jours d'avance) que rien ne protège → **agrégat et invariant** (partie 4) |
| **4** | [S4](../ancyr/homeworks/session-4/) **exercices 2-3** + [S5](../ancyr/homeworks/session-5/) *(entier)* | Agrégat Voyage, capacité de la voiture, évènements | Le conducteur change de voiture **depuis l'extérieur** du voyage → deux modèles, deux responsables → **bounded contexts** (partie 5) |
| **5** | [S6](../ancyr/homeworks/session-6/) *(clôture, facultatif)* | Isolation d'un module, système de points | — dernière séance |

**La coupure du devoir S4 est le cœur de la proposition.** Son exercice 1 (intégrer
itinéraire et prix dans un Voyage, avec la règle des 3 jours) fait apparaître
l'invariant sans donner le pattern : c'est le déclencheur parfait de la partie 4.
Ses exercices 2 et 3 (Voiture, Passagers) supposent au contraire qu'on sait déjà ce
qu'est un agrégat — ils appartiennent à l'après.

### Points de vigilance

- Le créneau après la partie 3 est **le plus chargé** (S3 entier + un exercice de S4).
  S3 est déjà le plus gros devoir du workshop.
- Le devoir S6 après la dernière séance n'a plus de débrief. À donner comme
  prolongement facultatif, ou à basculer en exercice de séance dans la partie 5.

## Autres répartitions

À remplir au fil des itérations. Chacune est une variante assumée, pas une
correction de la précédente — le contexte d'un groupe peut en justifier une autre
(niveau, temps disponible, durée des séances).

| Variante | Quand l'utiliser | Répartition |
|---|---|---|
| **A** *(ci-dessus)* | Par défaut | 1 \| 2 \| 3 + 4.1 \| 4.2-3 + 5 \| 6 |
| *(à venir)* | | |

## Code

Tout part du même repo : <https://github.com/Ancyr-Academy/wk-ddd-2025April29>
(TypeScript, vitest, pnpm). Branches `session-N-start` / `session-N-end` — voir les
[exceptions pour les sessions 1 et 2](../ancyr/homeworks/).

Une coupure de devoir implique un **point de reprise intermédiaire** qui n'existe pas
dans le repo d'origine : pour la proposition A, il faudra créer une branche entre
`session-4-start` et `session-4-end` correspondant à la fin de l'exercice 1.

## Rétro de devoir

Chaque séance s'ouvre sur la rétro en trois pastilles : temps passé, difficulté
(1-5), plaisir (1-5). Canevas à produire dans `../exercices/retro-devoir.excalidraw`.
