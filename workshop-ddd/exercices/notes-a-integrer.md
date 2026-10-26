# Brouillons de notes de présentateur

Trois exercices n'ont pas de notes dans les decks. Ces brouillons sont reconstitués
à partir du contenu des boards — **à relire et corriger**, puis à déplacer dans
l'`<aside class="notes">` de la slide correspondante. Ce fichier n'a pas vocation
à rester : une fois les notes intégrées, il disparaît.

Rappel de la règle : les énoncés vivent dans les notes du présentateur, jamais sur
le canevas ni dans un fichier distribué.

---

## Exercice 13 — Persistance du domaine

**Deck :** `workshop-ddd-part4.html`, chapitre *La dernière règle des aggregates*
**Origine :** séance 6 du workshop original (*Domain Persistence*). Absent du master
board — oubli de la première itération, à réintégrer.

### Exercice

Comment persister un domaine qui doit rester pur ? Deux voies s'affrontent :
mapper le domaine vers des objets de persistance dédiés, ou persister directement
les objets du domaine.

**Consignes :**
- Lister les arguments pour et contre chaque approche
- Durée : 10-15 min
- Tri en deux colonnes, Positif / Négatif

### Arguments relevés sur le board original

| Persister directement le domaine | Mapper vers des objets dédiés |
|---|---|
| Pratique, évite le mapping | Le domaine reste pur |
| Évite de créer des DAO | Le modèle de persistance évolue indépendamment |
| | Coût : *Domain Verbose*, beaucoup de code |

Réserve notée : l'approche directe convient à un **projet avancé avec une équipe
qualifiée** ; elle est instable autrement.

### À faire ressortir au débrief

> On ne modifie **JAMAIS** la donnée en base. On passe **TOUJOURS** par le logiciel.

C'est la règle qui justifie tout le reste : si la base est un point d'entrée, les
invariants de l'agrégat ne valent plus rien.

---

## Exercice 14 — Intégration des bounded contexts

**Deck :** `workshop-ddd-part5.html`, chapitre *Intégrer les bounded contexts*
**Origine :** séance 5 du master, section *Intégration des contexts*

### Exercice

Trois façons d'intégrer deux bounded contexts sont posées sur le canevas :

1. **Shared model** — les deux contextes partagent le même modèle
2. **Direct communication** — un contexte appelle l'autre directement, en synchrone
3. **Asynchronous** — les contextes communiquent par évènements

**Consignes :**
- Pour chaque approche, poser les points positifs et les points négatifs
- Durée : 15 min
- Deux banques de post-its, *Positif* et *Négatif*

### Solution de référence (post-its du master)

| Approche | Positif | Négatif |
|---|---|---|
| **Shared model** | — | À éviter (vraiment) |
| **Direct communication** | À favoriser dans un monolithe modulaire, pour sa simplicité | Couplage fort entre contextes |
| **Asynchronous** | Découplage maximum · beaucoup de résilience | Beaucoup plus complexe à mettre en place |

Recommandation transverse relevée : **favoriser les DTOs entre bounded contexts**,
pour anticiper un futur découpage en microservices.

### À faire ressortir au débrief

Le piège du *shared model* n'est pas théorique : c'est lui qui produit les **imports
circulaires** entre contextes, point noté sur la séance 7 du board original.
Le choix dépend de la cible — monolithe modulaire ou microservices — et pas d'une
supériorité intrinsèque de l'asynchrone.

---

## Exercice 15 — Event Storming (bonus)

**Deck :** `partie-bonus-pratiques.html`, chapitre *Event storming*
**Origine :** frame bonus du master

> ⚠️ Ce bonus a changé de sujet par rapport au workshop d'Ancyr, où il portait sur
> les stratégies de test (Gherkin, driver maison).

### Exercice

Dérouler un Event Storming sur le parcours d'un covoiturage Moveo, de la publication
du trajet jusqu'au paiement du conducteur.

**Consignes :**
- Poser les évènements sur la ligne de temps, dans l'ordre chronologique
- Remonter ensuite les commandes qui les déclenchent, puis les acteurs
- Marquer les règles métier et les problématiques au fil de l'eau
- Durée : 30-45 min

### Légende des post-its

Six catégories, une banque par catégorie :

`Évènement` · `Commande` · `Acteur` · `Règle métier` · `Modèle` · `Problématiques`

### Proposition de correction (contenu du master)

**Acteurs :** Conducteur · Passager

**Commandes :** Proposer un trip · Rechercher un trip · Réserver un trip ·
Valider un passager · Conduire la voiture · Monter dans la voiture ·
Valider le trip · Publier une note sur le conducteur

**Évènements :** Trip publiée → Trip trouvée → Trip réservée → Passagé validée →
Trip effectuée → Trip terminée → Trip payée → Trip cloturée · Paiement reçus

**Modèle :** Trips

### À faire ressortir au débrief

Le vocabulaire des post-its mélange encore `trip` et le français. C'est un bon
support pour revenir sur le langage ubiquitaire : pourquoi *trip* et pas *trajet* ?
Et pourquoi *Passagé validée* n'est pas un nom d'évènement acceptable ?
