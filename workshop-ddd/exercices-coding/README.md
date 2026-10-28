# Exercices de code — Java · .NET · TypeScript

Les mêmes exercices que ceux du [board](../exercices/), pour les participants qui
préfèrent taper dans un IDE. **Les deux dispositifs coexistent** : personne n'est
obligé de passer au code, et le board reste le support par défaut en séance.

Trois exercices seulement s'y prêtent — ceux dont le livrable *est* du code :

| # | Dossier | Exercice | Board |
|---|---|---|---|
| 4 | [`04-refacto/`](04-refacto/) | Refacto du PriceCalculator en domain objects | [`exercices/04-refacto/`](../exercices/04-refacto/) |
| 8 | [`08-policy/`](08-policy/) | Faire émerger la policy, règle après règle | [`exercices/08-policy/`](../exercices/08-policy/) |
| 12 | [`12-domain-events/`](12-domain-events/) | Identifier les domain events | [`exercices/12-domain-events/`](../exercices/12-domain-events/) |

Les autres exercices (classer des subdomains, trier des objets par nature, tracer
des frontières d'agrégats, juger trois modes d'intégration) produisent des
**décisions**, pas du code. Les faire en IDE les appauvrirait.

## Arborescence

```
exercices-coding/
  04-refacto/
    README.md        le brief et les consignes, identiques au board
    typescript/      npm install && npm test
    java/            mvn test
    dotnet/          dotnet test
```

Un projet autonome par langage : le participant ouvre **un seul dossier** dans son
IDE, sans rien à configurer. Pas de solution commune, pas de workspace multi-module
— la mise en route doit tenir en une commande.

## Trois langages, un seul exercice

Le code de départ est **traduit**, pas réinventé : mêmes noms, même découpage,
mêmes tests. Un participant en C# et son voisin en Java doivent pouvoir parler du
même objet pendant le débrief.

Le code sur les canevas Excalidraw est en **TypeScript** — c'est la langue du
master board, et celle des slides. C'est donc la version de référence quand les
trois divergent.

Quelques écarts assumés, parce que les forcer rendrait le code faux dans sa
langue :

- **TypeScript** utilise `number` là où **Java** utilise `double` et **.NET**
  `decimal`. Un prix en `double` est une faute en C# ; l'exercice ne porte pas
  là-dessus, autant ne pas l'enseigner de travers.
- **Java** n'a pas de type union : `"urban" | "rural"` devient un `String` au
  départ. C'est justement un des domain objects à faire émerger.
- L'`async` du squelette de l'exercice 12 est retiré partout : il n'apporte rien
  à la question posée, et il complique le test dans les trois langages.

## Les solutions

Elles ne sont **pas** ici. Le corrigé vit sur le canevas
`<exercice>-solution.excalidraw` du board correspondant, côté animateur — un seul
endroit à maintenir, et rien à oublier de retirer avant de distribuer un dossier.

## Ce que le participant reçoit

Le dossier de l'exercice, tel quel. Il contient le brief, les consignes et un
projet qui compile. Il ne contient **ni la solution ni les pistes de débrief**,
qui restent dans les notes du présentateur.

## Prérequis

| Langage | Version | Remarque |
|---|---|---|
| TypeScript | Node 20+ | `npm install` une fois, puis `npm test` (vitest) |
| Java | JDK 21+, Maven 3.9+ | `mvn test` télécharge JUnit 5 au premier lancement |
| .NET | SDK 8.0+ | `dotnet test` restaure xUnit au premier lancement |

⚠️ Le premier lancement **a besoin du réseau**, dans les trois langages. À faire
dire aux participants *avant* la séance — un `npm install` au moment de démarrer
l'exercice, c'est dix minutes de perdues.
