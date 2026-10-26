# Devoir — Session 5

> Donné à la fin de la session 5, débriefé au début de la session 6.
>
> **Point de départ :** branche `session-5-start`
> **Corrigé :** branche `session-5-end`
> Repo : https://github.com/Ancyr-Academy/wk-ddd-2025April29

---

### Exercice 1

Le conducteur peut changer la date du voyage, même s'il y a des passagers.

Cas 1 : le voyage a lieu plus tôt que prévu. Dans ce cas le conducteur peut avancer le voyage mais doit toujours laisser 3 jours d'avance par rapport à aujourd'hui.
Cas 2 : le voyage a lieu plus tard, pas de règle spécifique.

### Exercice 2

Lorsque le conducteur met à jour la date, tous les passagers reçoivent une notification par e-mail.

Vous n'avez pas besoin de coder de système d'e-mail. Créez simplement une interface qui représente un serveur d'e-mail.

### Exercice 3

Un évènement peut venir de l'extérieur. C'est le cas lorsque le conducteur met à jour sa voiture, en remplaçant sa voiture par une autre qui a plus (ou moins) de capacité.

Quel impact sur le voyage ? 
Que faire si la nouvelle voiture a moins de capacité ?

Intégrez cet évènement et réflechissez à une solution.
