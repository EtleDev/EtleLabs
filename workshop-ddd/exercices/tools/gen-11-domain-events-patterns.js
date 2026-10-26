// Exercice 11 — Patterns de domain events (séance 4, chapitre « Domain events »)
// Trois endroits où lever un évènement, trois verdicts. Les post-its de jugement
// sont vides dans le canevas : le verdict se construit en séance.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const code = (o) => text({ fontFamily: 3, fontSize: 11, strokeColor: '#1864ab', ...o });

const COL_W = 470, COL_X = [0, 500, 1000], CODE_Y = 56, CODE_H = 500;

const APPROCHES = [
  ['In the UseCase', `// Application Layer
class ChangeEmailAddress {
  async execute({ userId, emailAddress }) {
    const user = this.users.byId(userId);
    user.changeEmailAddress(emailAddress);

    this.users.save(user);

    this.eventEmitter.raise(
      new EmailAddressChanged(userId, emailAddress)
    );
  }
}`],

  ['Internally with global object', `class ChangeEmailAddress {
  async execute({ userId, emailAddress }) {
    const user = this.users.byId(userId);
    user.changeEmailAddress(emailAddress);

    this.users.save(user);
  }
}

class User {
  changeEmailAddress(emailAddress) {
    this.emailAddress = emailAddress;

    // Accès au scope global (singleton)
    DomainEventDispatcher.raise(
      new EmailAddressChanged(userId, emailAddress)
    );
  }
}

class DomainEventDispatcher {
  static raise() {
    // Code to write
  }
}`],

  ['Internally with infrastructure support', `class ChangeEmailAddress {
  async execute({ userId, emailAddress }) {
    const user = this.users.byId(userId);
    user.changeEmailAddress(emailAddress);

    this.users.save(user);
  }
}

class User extends AggregateRoot {
  changeEmailAddress(emailAddress) {
    this.emailAddress = emailAddress;

    this.raise(
      new EmailAddressChanged(userId, emailAddress)
    );
  }
}

// Infrastructure Layer
class ORMManager {
  beforeFlush(changeSet) {
    for (const entity of changeSet.entities) {
      if (!(entity instanceof AggregateRoot)) continue;

      for (const event of entity.getDomainEvents()) {
        this.eventEmitter.raise(event);
      }
    }
  }
}`],
];

const colonne = (i) => [
  ...labelled({
    x: COL_X[i], y: 0, width: COL_W, height: 44,
    backgroundColor: '#f8f9fa', strokeColor: '#495057', strokeWidth: 2,
  }, APPROCHES[i][0], 15, '#495057'),
  rect({ x: COL_X[i], y: CODE_Y, width: COL_W, height: CODE_H, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }),
  code({ x: COL_X[i] + 12, y: CODE_Y + 12, text: APPROCHES[i][1] }),
];

// ----- post-its de jugement
const S = { w: 150, h: 58 };
const POS = ['#b2f2bb', '#2f9e44'], NEG = ['#ffc9c9', '#e03131'], VERDICT = ['#ffec99', '#f08c00'];
const JUGE_Y = CODE_Y + CODE_H + 24;

const postit = (x, y, label, pal, w = S.w) => labelled({
  x, y, width: w, height: S.h, backgroundColor: pal[0], strokeColor: pal[1], locked: false,
}, label, 12, '#495057');

const CONS_X = COL_X[2] + COL_W + 40;
const CONSIGNES = consignes(CONS_X, 0, 'Consignes', [
  'Trois façons de lever un domain',
  'event :',
  '· depuis le use case,',
  '· depuis le domaine, via un',
  '  objet global,',
  '· depuis le domaine, avec le',
  '  concours de l’infrastructure.',
  '',
  'Pour chacune : points positifs,',
  'points négatifs, puis un verdict.',
  '',
  'Durée : 7 min',
], 340);

const canevas = [...colonne(0), ...colonne(1), ...colonne(2), ...CONSIGNES];
canevas.push(text({ x: COL_X[0], y: JUGE_Y - 24, text: 'Positif / Négatif', fontSize: 13, strokeColor: '#868e96' }));
canevas.push(text({ x: CONS_X, y: JUGE_Y - 24, text: 'Banque', fontSize: 13, strokeColor: '#868e96' }));
canevas.push(...postit(CONS_X, JUGE_Y, 'Positif', POS));
canevas.push(...postit(CONS_X + S.w + 14, JUGE_Y, 'Négatif', NEG));

// ----- solution : les verdicts du master
const VERDICTS = [
  ['Approche possible', [
    ['Simple, rien à installer', POS],
    ['Levé hors du domaine', NEG],
  ]],
  ['Interdit !!!', [
    ['Le domaine garde la main', POS],
    ['Scope global : intestable, couplé', NEG],
  ]],
  ['Approche recommandée', [
    ['Le domaine lève, l’infra publie', POS],
    ['Demande un support ORM', NEG],
  ]],
];

const solution = [...colonne(0), ...colonne(1), ...colonne(2), ...CONSIGNES];
VERDICTS.forEach(([verdict, avis], i) => {
  solution.push(...postit(COL_X[i], JUGE_Y, verdict, VERDICT, COL_W));
  avis.forEach(([l, pal], j) => solution.push(...postit(
    COL_X[i] + j * (S.w + 14), JUGE_Y + S.h + 12, l, pal, 220)));
});
solution.push(...consignes(CONS_X, 300, 'Au débrief', [
  'Le singleton est interdit pour une',
  'raison simple : il rend le domaine',
  'dépendant d’un état global, donc',
  'intestable et non rejouable.',
  '',
  'La troisième garde l’initiative',
  'dans le domaine — l’agrégat dit',
  'ce qui s’est passé — et laisse',
  'l’infra décider quand publier.',
  '',
  'De là, le transactional outbox',
  'pattern : écrire l’évènement dans',
  'la même transaction que l’agrégat,',
  'le publier après. Sinon on perd',
  'des évènements au premier crash.',
], 340));

const DIR = path.join(__dirname, '..', 'seance-4');
write(path.join(DIR, '11-domain-events-patterns-canevas.excalidraw'), canevas);
write(path.join(DIR, '11-domain-events-patterns-solution.excalidraw'), solution);
