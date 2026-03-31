Event sourcing => sourcer les évènements

Rappels : event = quelque chose de passé (donc d'immuable)

Le but est de stocké tout ce qui s'est passé.

Permet l'historisation.

Amélioration des performances grace aux snapshots.

ReadModel = projection.

Modèle qui est extrêmement versatile à la lecture pour reconstruire de la donnée à la demande.

Problème de maintenance => Que se passe-t-il pour les anciens handlers si un event est mis à jour ? Que se passe-t-il pour un event si un handler est mis à jour ?

Permet de rejouer des scénarios utilisateurs complexe.

Le debug peut s'avérer complexe dans un système mal géré.

Convient parfaitement à un système distribués. 

Il existe des bases de données dédiées à cela (ex : martensDb) mais une base classique (ex : sql, objet) fait très bien l'affaire.

On rejoint les problématiques de transactionnal outbox pattern.