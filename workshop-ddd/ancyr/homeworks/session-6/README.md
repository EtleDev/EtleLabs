# Devoir — Session 6

> Donné à la fin de la session 6, débriefé au début de la session 7.
>
> **Point de départ :** branche `session-6-start`
> **Corrigé :** branche `session-6-end`
> Repo : https://github.com/Ancyr-Academy/wk-ddd-2025April29

---

### Exercice 1

Après avoir créé son premier trajet, le conducteur gagne le titre de "Conducteur Confirmé".
Implémentez la solution.

### Exercice 2

Avez-vous implémenté la solution dans l'objet Driver ? Dans ce cas, vous avez certainement créé un repository pour gérer les Drivers.
Ont-ils vraiment leur place à côté du code de planification de trajet ?

Essayez d'isoler la gestion du titre de Conducteur dans un module à part. Si votre solution vous amène à avoir deux objets Driver dans votre système, c'est tout à fait normal.

### Exercice 3

Le système de conducteur confirmé évolue et est basé sur un système de points.

Un trajet créé : 1 point
Un passager ajouté : 1 point
Un passage retiré : -1 point

Il faut 10 points pour devenir Conducteur Confirmé.

### Exercice Bonus

Si le conducteur repasse en dessous des 10 points, il perd son statut de Conducteur Confirmé.
