# Devoir — Session 2

> Donné à la fin de la session 2, débriefé au début de la session 3.
>
> **Point de départ :** branche `session-2` (il n'existe pas de `session-2-start`)
> **Corrigé :** branche `session-2-end`
> Repo : https://github.com/Ancyr-Academy/wk-ddd-2025April29

---

### Exercice 1

Le taux à appliquer selon la situation (intramuros/extramuros) n'est plus fixe. 
Il doit désormais être récupéré depuis un système tier.

Les utilisateurs peuvent désormais préciser si la distance du trajet est en mètres ou en kilomètres.

Le prix de retour peut-être en euros ou en dollars selon le besoin de l'utilisateur. Le taux de change est également calculé depuis un système tier.

### Exercice 2

Un usager obtient une réduction de 10% sur son trajet s'il a déjà pris 2 trajets au cours du mois. 
En d'autres termes, chaque mois, après 2 trajets, tous les autres trajets pris au cours du moins offrent -10% à l'usager.

Hint : il faudra certainement sauvegarder l'information des trajets effectués par l'utilisateur identifié par `userId`.

Notions : Value Objects, Application Services, Domain Services, Repositories, Entities.
