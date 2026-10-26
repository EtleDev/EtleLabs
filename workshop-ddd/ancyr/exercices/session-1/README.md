# Séance 1 — Domain Discovery

Première séance : aucun devoir à débriefer, aucun code. Deux exercices de board,
sur le domaine **Moveo** (covoiturage).

## Le brief Moveo

> Moveo est une application mobile qui permet à ses utilisateurs de partager un
> covoiturage sur de courtes et longues distances. Les conducteurs créent un profil
> et mettent leur véhicule à disposition aux horaires qui leur conviennent
> (répétitif ou ponctuel). Un covoituré fait une recherche pour trouver un véhicule
> qui l'emmène d'un point A à un point B via un module de recherche sophistiqué.
>
> L'entreprise prend une commission sur les covoiturages et offre **la meilleure
> rémunération du marché à ses covoitureurs**.

## Exercice 1 — Subdomains

**Consigne :** « Quels sont les subdomains de Moveo ? Classez-les. »

**Canevas :** le quadrant Core / Supporting / Generic, avec en abscisse
*Différenciation marché* (Faible → Fort) et en ordonnée *Complexité du modèle*
(Faible → Fort). C'est le même schéma que le composant `.quadrant-chart` des decks.

**Solution de référence** (board du 29 avril) :

| Classement | Subdomains |
|---|---|
| **Core** | Matching Conducteur / Covoituré · Voyage (prix, distance) · Module de recherche |
| **Supporting** | Profil Conducteur · Profil Covoituré · Gestion des trajets proposés · Réservation d'un trajet · Système de commissions / rémunérations |
| **Generic** | Auth · KYC · Paiement · Support Client · Avis & Feedback |

Le débat porte chaque fois sur le **paiement** (souvent placé en Core à tort) et sur
la **commission**, qui touche au modèle d'affaires sans être un différenciateur.

## Exercice 2 — Use Case Mapping

**Consigne :** « Quels sont les Use Cases principaux de Moveo ? »

Le brief est enrichi pour cet exercice : il introduit le vocabulaire
**covoitureur** / **covoituré**, et la règle « un conducteur a la possibilité
d'accepter ou non un covoituré ; s'il l'accepte, le covoituré doit payer une somme
fixe pour valider sa réservation ».

**Canevas :** des acteurs (pictogrammes) à gauche, leurs use cases reliés à droite.

**Solution de référence** — deux acteurs :

- **Covoitureur** : créer un profil · mettre sa voiture à disposition (récurrent / ponctuel) ·
  définir ses coordonnées bancaires · proposer un trajet · accepter ou refuser une demande ·
  valider le trajet · recevoir un paiement · annuler un trajet · lister les trajets à venir · laisser un avis
- **Covoituré** : créer un profil · rechercher un covoiturage · réserver une place ·
  payer la réservation · annuler la réservation · lister les trajets à venir · laisser un avis

**Points de débrief relevés sur le board :** bannir le mot « utilisateur » (on parle
de conducteur, covoitureur, passager) ; distinguer *main course* et *alternative
course* (un cas d'erreur est un cas alternatif, l'inverse n'est pas vrai) ;
une fonctionnalité n'est pas un use case.

## Devoir annoncé en fin de séance

[Devoir session 1](../../homeworks/session-1/) — le calcul du prix intra/extra-muros.
