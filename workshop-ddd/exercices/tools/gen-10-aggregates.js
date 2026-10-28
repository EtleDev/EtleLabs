// Exercice 10 — Frontières d'agrégats (séance 4, chapitre « Aggregates »)
// Le graphe de l'exercice 9, à découper en agrégats. Les use cases, les
// invariants et les contraintes de concurrence sont les guides du découpage.
const path = require('path');
const { rect, text, labelled, connect, consignes, aGauche, write } = require('./excalidraw-kit');

const N = { w: 140, h: 38 };
const NODE = { bg: '#e5dbff', stroke: '#6741d9', txt: '#5f3dc4' };
const ROOT = { bg: '#e5dbff', stroke: '#e03131', txt: '#5f3dc4' };
const ID = { bg: '#f1f3f5', stroke: '#adb5bd', txt: '#495057' };

const node = (x, y, label, style = NODE, libre = true) => labelled({
  x, y, width: N.w, height: N.h,
  backgroundColor: style.bg, strokeColor: style.stroke,
  strokeWidth: style === ROOT ? 3 : 2, locked: !libre,
}, label, 12, style.txt);

// ---------------------------------------------------------------- le graphe
// Mêmes objets que l'exercice 9, resserrés pour laisser la place aux post-its.
const GX = 0, GY = 70;
const POS = {
  review:   [0, 230], journey: [165, 60], user: [165, 400],
  trip:     [330, 20], address: [330, 360], settings: [330, 430],
  roadbook: [495, -40], note: [495, 90], phone: [495, 410], email: [495, 470],
  departure: [660, -110], segment: [660, -50], arrival: [660, 10],
};
const LABEL = {
  review: 'Review', journey: 'Journey', user: 'User', trip: 'Trip',
  address: 'PersonalAddress', settings: 'Settings', roadbook: 'Roadbook',
  note: 'Note', phone: 'PhoneSettings', email: 'EmailSettings',
  departure: 'Departure', segment: 'Segment', arrival: 'Arrival',
};
const LIENS = [
  ['review', 'journey'], ['review', 'user'], ['journey', 'trip'],
  ['trip', 'roadbook'], ['trip', 'note'], ['roadbook', 'departure'],
  ['roadbook', 'segment'], ['roadbook', 'arrival'],
  ['user', 'address'], ['user', 'settings'], ['settings', 'phone'], ['settings', 'email'],
];

function graphe() {
  const G = {}, e = [text({ x: GX, y: GY - 150, text: "Graphe d'objets", fontSize: 16, strokeColor: '#495057' })];
  for (const [k, [x, y]] of Object.entries(POS)) {
    const [box, txt] = node(GX + x, GY + y, LABEL[k], NODE, false);
    G[k] = box; e.push(box, txt);
  }
  for (const [a, b] of LIENS) e.push(connect(G[a], G[b], '#6741d9'));
  return e;
}

// ------------------------------------------------------------ les post-its
const S_W = 190;
const COL = {
  'Use cases': [
    'Changer son adresse personnelle',
    'Mettre à jour ses paramètres de téléphone',
    'Mettre à jour ses paramètres emails',
    'Créer une review',
    'Retirer un trip du voyage',
    'Ajouter des notes à un voyage',
    'Ajouter un trajet (Trip) à un voyage (Journey)',
    'Modifier le carnet de route d’un trip',
  ],
  'Règles métier / invariants': [
    'Un voyage ne peut avoir que 4 passagers',
    'Une review ne peut être écrite qu’après la fin du voyage',
    'On ne peut plus ajouter de notes après la fin du voyage',
    'Un voyage est limité à 6 segments',
    'L’auteur d’une review doit nécessairement être un passager',
    'Impossible de modifier un voyage une fois qu’il a commencé',
  ],
  Concurrence: [
    'On ne peut rajouter des notes que pendant le voyage',
    'Plusieurs passagers peuvent ajouter des notes en même temps',
  ],
};
const TEINTE = {
  'Use cases': ['#d0ebff', '#1971c2'],
  'Règles métier / invariants': ['#ffec99', '#f08c00'],
  Concurrence: ['#ffd8a8', '#e8590c'],
};

const P_X = 850;
function postits() {
  const e = [];
  let x = P_X;
  for (const [titre, items] of Object.entries(COL)) {
    e.push(...labelled({
      x, y: 0, width: S_W, height: 44,
      backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1,
    }, titre, 13, '#495057'));
    let y = 46;
    for (const it of items) {
      const h = 16 + Math.ceil(it.length / Math.floor((S_W - 12) / (11 * 0.7))) * 11 * 1.25 + 8;
      e.push(...labelled({
        x, y, width: S_W, height: h,
        backgroundColor: TEINTE[titre][0], strokeColor: TEINTE[titre][1],
        strokeWidth: 1, locked: false,
      }, it, 11, '#495057'));
      y += h + 8;
    }
    x += S_W + 16;
  }
  return e;
}

// ------------------------------------------------------------- la consigne
const CONSIGNES = consignes('Consignes', [
  'Décomposer ce graphe d’objets en',
  'agrégats.',
  '',
  'Entourer chaque agrégat et colorer la',
  'bordure de l’objet qui en est la racine.',
  '',
  'Indices :',
  '· un agrégat est un graphe d’objets',
  '  avec des règles spécifiques ;',
  '· il s’architecture autour des',
  '  invariants ;',
  '· on regroupe les objets régulés par',
  '  les mêmes règles métier ;',
  '· les use cases et les règles métier',
  '  sont les meilleurs guides.',
  '',
  'Durée : 20 min',
], 380);

const LEG_Y = 400;
function legende() {
  const e = [text({ x: 0, y: LEG_Y - 26, text: 'Légende', fontSize: 14, strokeColor: '#868e96' })];
  const items = [['Root', ROOT], ['Entity', NODE], ['Value Object', NODE], ['ID', ID]];
  items.forEach(([l, s], i) => e.push(...node(
    (i % 2) * (N.w + 16), LEG_Y + Math.floor(i / 2) * (N.h + 12), l, s, false)));
  return e;
}

const canevas = [...CONSIGNES, ...aGauche(legende()), ...graphe(), ...postits()];

// ------------------------------------------------------------- la solution
// Cinq agrégats : chaque frontière suit un invariant, pas une relation.
const AGG = { bg: 'transparent', stroke: '#e03131' };
const cadre = (x, y, w, h, titre) => [
  rect({ x, y, width: w, height: h, ...AGG, strokeStyle: 'dashed', strokeWidth: 2 }),
  text({ x: x + 12, y: y + 10, text: titre, fontSize: 14, strokeColor: '#e03131' }),
];

const sol = [];
const push = (...e) => sol.push(...e);

// Journey : tout ce que verrouille « on ne modifie plus un voyage commencé »
push(...cadre(0, 0, 620, 300, 'Agrégat Journey'));
push(...node(20, 44, 'Journey', ROOT, false));
push(...node(180, 44, 'Trip', NODE, false));
push(...node(340, 44, 'Roadbook', NODE, false));
push(...node(180, 110, 'Departure', NODE, false));
push(...node(340, 110, 'Segment', NODE, false));
push(...node(180, 176, 'Arrival', NODE, false));
push(...node(340, 176, 'PassengerIds', ID, false));
push(...node(20, 176, 'DriverId', ID, false));
push(...node(20, 242, 'JourneyId', ID, false));

// Note : séparé, parce que plusieurs passagers écrivent en même temps
push(...cadre(660, 0, 340, 180, 'Agrégat Note'));
push(...node(680, 44, 'Note', ROOT, false));
push(...node(840, 44, 'TripId', ID, false));
push(...node(680, 110, 'JourneyId', ID, false));

// Review : sa propre transaction, référence le voyage et l'auteur par id
push(...cadre(1040, 0, 340, 180, 'Agrégat Review'));
push(...node(1060, 44, 'Review', ROOT, false));
push(...node(1220, 44, 'JourneyId', ID, false));
push(...node(1060, 110, 'AuthorId', ID, false));

// User et Settings : deux agrégats, parce que deux use cases distincts
push(...cadre(660, 220, 340, 180, 'Agrégat User'));
push(...node(680, 264, 'User', ROOT, false));
push(...node(840, 264, 'PersonalAddress', NODE, false));

push(...cadre(1040, 220, 340, 250, 'Agrégat Settings'));
push(...node(1060, 264, 'Settings', ROOT, false));
push(...node(1220, 264, 'UserId', ID, false));
push(...node(1060, 330, 'PhoneSettings', NODE, false));
push(...node(1060, 396, 'EmailSettings', NODE, false));

push(...consignes('Ce que dit le découpage', [
  'La frontière suit l’invariant, pas la',
  'relation. Un voyage protège ses trips,',
  'son carnet de route et ses segments :',
  'ils changent ensemble ou pas du tout.',
  '',
  'Note sort de Journey à cause de la',
  'concurrence : plusieurs passagers',
  'écrivent en même temps, verrouiller la',
  'liste des notes serait intenable.',
  '',
  'Review sort parce qu’elle naît après la',
  'fin du voyage — une autre transaction,',
  'et deux simples références par id.',
  '',
  'Settings sort de User parce que les use',
  'cases sont distincts : on change son',
  'adresse, ou ses notifications, jamais',
  'les deux dans le même geste.',
], 360));

// ------------------------------------- le débrief : concurrence vs invariant
// Pourquoi Note sort de Journey. Deux arbitrages, deux codes, à poser côte à
// côte : la frontière d'agrégat est une décision, pas une déduction.
const code = (o) => text({ fontFamily: 3, fontSize: 11, strokeColor: '#1864ab', ...o });
const CC_W = 520, CC_X = [0, 560];

const AVIS = [
  [
    'Invariant > concurrence',
    'Transactional consistency',
    [
      'Il faut impérativement empêcher que des notes soient ajoutées après le voyage',
      'Implique de bloquer la liste des notes',
    ],
    `class AddNoteHandler {
  execute(command) {
    const journey =
      this.journeys.byId(command.journeyId);

    const note = journey.createNote({
      tripId: command.tripId,
      content: command.content,
    });

    this.notes.save(note);
  }
}

class FinishJourneyHandler {
  execute(command) {
    const journey =
      this.journeys.byId(command.journeyId);

    journey.finish();
    this.journeys.save(journey);
  }
}`,
    'La note passe par le voyage : Note rentre dans l’agrégat Journey, et\nla liste se verrouille à chaque ajout.',
  ],
  [
    'Concurrence > invariant',
    'Eventual consistency',
    [
      'Ce n’est pas grave si quelques notes sont ajoutées juste après le voyage',
      'Nécessite de ne pas bloquer la liste des notes',
    ],
    `class AddNoteHandler {
  execute(command) {
    const note = Note.create({
      journeyId: command.journeyId,
      tripId: command.tripId,
      content: command.content,
    });

    this.notes.save(note);
  }
}

class NoteCreatedHandler {
  onNoteCreated(event) {
    const journey =
      this.journeys.byId(event.journeyId);

    if (!journey.canAddNotes(event.createdAt)
     || !journey.hasTrip(event.tripId)) {
      this.notes.remove(event.noteId);
    }
  }
}`,
    'Note devient son propre agrégat : rien ne bloque, et une compensation\nrattrape après coup les notes arrivées trop tard.',
  ],
];

const cc = [];
AVIS.forEach(([titre, consistance, stickies, source, morale], i) => {
  const x = CC_X[i];
  cc.push(...labelled({ x, y: 0, width: CC_W, height: 44, backgroundColor: '#f8f9fa', strokeColor: '#495057', strokeWidth: 2 }, titre, 16, '#495057'));
  cc.push(text({ x, y: 56, text: consistance, fontSize: 14, strokeColor: '#868e96' }));
  let y = 84;
  for (const s of stickies) {
    const h = 16 + Math.ceil(s.length / Math.floor((CC_W - 12) / (12 * 0.7))) * 12 * 1.25 + 10;
    cc.push(...labelled({ x, y, width: CC_W, height: h, backgroundColor: '#ffd8a8', strokeColor: '#e8590c', strokeWidth: 1 }, s, 12, '#495057'));
    y += h + 8;
  }
  const codeY = y + 12;
  cc.push(rect({ x, y: codeY, width: CC_W, height: 340, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }));
  cc.push(code({ x: x + 12, y: codeY + 12, text: source }));
  cc.push(text({ x, y: codeY + 356, text: morale, fontSize: 12, strokeColor: '#495057' }));
});

cc.push(...consignes('Le vrai arbitrage', [
  'La frontière d’agrégat n’est pas déduite',
  'du graphe : elle est décidée.',
  '',
  'À gauche, l’invariant prime : le code est',
  'simple, le verrou coûte cher dès que',
  'plusieurs passagers écrivent.',
  '',
  'À droite, la concurrence prime : on',
  'accepte une fenêtre d’incohérence, et on',
  'la referme par compensation.',
  '',
  'La question à poser au métier n’est pas',
  '« est-ce une règle ? » mais « que se',
  'passe-t-il si elle est violée une',
  'seconde ? ».',
], 360));

const DIR = path.join(__dirname, '..', '10-aggregates');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '10-aggregates-exercice.excalidraw'), canevas);
write(path.join(DIR, '10-aggregates-solution.excalidraw'), sol);
write(path.join(DIR, '10-concurrence-debrief.excalidraw'), cc);
