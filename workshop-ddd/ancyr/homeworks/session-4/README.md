# Devoir — Session 4

> Donné à la fin de la session 4, débriefé au début de la session 5.
>
> **Point de départ :** branche `session-4-start`
> **Corrigé :** branche `session-4-end`
> Repo : https://github.com/Ancyr-Academy/wk-ddd-2025April29

---

### Introduction

L'API que vous avez développé ces dernières semaines permet de créer un itinéraire et d'en calculer le prix (qui inclus l'essence et les péages).

Pour rappel, Moveo est une application de covoiturage qui permet à des covoitureurs d'embarquer des covoiturés avec eux en échange d'une rémunération.

### Exercice 1

Intégrez l'itinéraire et son prix dans un objet qui représente un Voyage.
Cet objet représente un voyage ponctuel (qui n'est planifié qu'une seule fois). Il doit donc contenir :

- La date du voyage
- L'itinéraire
- Le prix

Notez qu'un voyage doit être planifié avec au moins 3 jours d'avance.

### Exercice 2

Intégrez la notion de Voiture au Voyage. Un voyage est associé à la voiture du Conducteur. 
Cette information doit-être sauvegardée avec le Voyage.

Vous trouverez l'API permettant de récupérer le voiture d'un conducteur par son ID dans le dossier `internal`.

### Exercice 3

Intégrez maintenant la notion de passagers dans ce Voyage.

Ajoutez une API qui permet à un passager de participer au voyage ou de se retirer du voyage.

Vous devez valider que la voiture a suffisamment de capacité pour accueillir les voyageurs.
