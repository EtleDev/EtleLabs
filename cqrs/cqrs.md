# Introduction


CQRS = Command and Queries Responsibility Seggregation

CQRS ≠ CQS

A quoi ça sert ⇒ séparer les Queries et les commandes qui n’ont pas les mêmes besoin

traffic web ⇒ 90% de queries / 10% de command

Queries ⇒ axé concurrence et performances

Command ⇒ axé consistance et fiabilité

Potentiellement 2 types de base de données différentes

Responsability segregation => 2 flux différents ! (Model d'interrogations différents)

Le DDD se pratique principalement sur la partie commande.