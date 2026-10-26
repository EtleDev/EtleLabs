# Règles métier Moveo

Catalogue de 54 règles, repris de la frame **notes** du master board Lucid.

Ce n'est pas un énoncé d'exercice : c'est un **réservoir**. Le brief remis aux
participants reste court, et ces règles servent à alimenter les exercices au
fur et à mesure — ce qui colle à la consigne récurrente du workshop :
implémenter les besoins métier **quand ils tombent**, sans sauter à la solution
finale. Elles nourrissent surtout les exercices sur les policies, les invariants
d'agrégat et les domain events.

## Les règles

- Un trajet a un départ et une arrivée
- Un trajet a des étapes (segment)
- Un trajet a un prix qui peut-être différent de la somme des étapes (si un voyageur prend tout le trajet)
- Une etape a un prix
- Un trajet peut passer par l'autoroute (implique des coûts suppl)
- En fonction des préférences du conducteur
- Un trajet peut avoir moins de places que de places disponibles dans la voiture
- Un conducteur peut avoir plusieurs véhicules
- Un conducteur peut souscrire à une assurance par trajet
- Un conducteur peut accepter les chiens (animaux de companie)
- Un trajet peut être girl only
- On peut annuler un trajet 48h avant la date de départ sans pénalités
- Un trajet ne peut être plannifier moins de 3 jours avant sa date de départ
- Un trajet peut être en réservation automatique (ou soumise à acceptation)
- Un trajet a des préférences de voyages (musique ou pas, style de musique, arrêt touristique, ...)
- On ne peut laisser des avis sur un trajet lorsqu'il n'est pas terminé
- Le conducteur ne peut pas recevoir son argent moins de 48h après la fin du trajet
- Un conducteur a un style de conduite
- Un trajet peut être anglophone
- Un passager peut demander à modifier un trajet (pour prendre le trajet en cours de route, ou modifier le point de récupération / dépose)
- Un passager peut laisser un bonus au conducteur
- Conducteur et passager peuvent se géolocaliser une fois arrivé à moins de 10km du lieu de RDV
- Un passager peut enchainer 2 trajets pour se rendre à sa destination
- Un passager peut indiquer une correspondance (entrante ou sortante avec un train / avion)
- Un conducteur peut décrocher un badge de bonne "conduite" si sa note de conduite dépasse 80% sur les 10 derniers trajets
- Un conducteur peut décrocher un badge de bonne humeur
- Un conducteur peut décrocher un badge de Zickos
- Un conducteur peut décrocher un badge de Guide touristique
- Des frais de plateformes s'applique à chaque trajet (commission fixe + variable)
- un trajet peut être récurrent (on fait cadeau de la commission variable si toutes les occurences sont assurées)
- Le trajet peut être payé en bon cadeau
- Des frais de réservations sont appliqués dès réservation
- Le paiement du voyage s'effectue 48h à l'avance
- Un passager est un utilisateur
- Un conducteur est un utilisateur
- Un passager peut réserver plusieurs places en même temps
- Un passager peut laisser un avis sur un conducteur
- Le temps de trajet estimé doit tenir compte des étapes et d'un plein de carburant éventuel
- Le prix estimé doit tenir compte du cout du carburant, et des péages
- Un trajet peut être transfrontalier
- Un passager ne peut pas réserver 2 fois le même trajet
- Un conducteur peut modifier la date du voyage (mais pas moins de 3 jours avant)
- Un conducteur peut modifier le nombre de places disponibles
- Un conducteur peut obtenir le badge de conducteur confirmé ou expert (après avoir proposé 3 trajets, ou 10)
- Un conducteur obtient 1 point par passager transporté
- Un conducteur perd 5 point s'il annule une réservation
- Un conducteur perd 10 point s'il annule un trajet (en plus des réservation annulées)
- Un passager obtient 1 point par réservation honorée
- Un passager obtient le badge de passager fiable s'il dépasse 10 points
- Un passager perd 5 points s'il n'honore pas une réservation
- Un passager se voit appliquer une pénalité de 10% si son solde de point est négatif (en faveur de la plateforme)
- Les points ont une durée de validité de 2 ans
- Un trajet peut être child ready (enfant non accompagné)
- Un passager ne peut réserver 2 trajets qui se chevauchent
