// Exercice 12 — Identifier les domain events (séance 4, chapitre « Domain events »)
// Deux scénarios : un évènement qui sort du domaine, un évènement qui y entre.
const path = require('path');
const { rect, text, labelled, consignes, write } = require('./excalidraw-kit');

const code = (o) => text({ fontFamily: 3, fontSize: 11, strokeColor: '#1864ab', ...o });

const SQUELETTE = `class Trip extends AggregateRoot {
  join(passengerId: string, tripId: string) { }
  kickPassenger(passengerId: string) { }
}

class JoinTrip {
  async execute({ tripId, passengerId }) { }
}

class NotificationService {
  // Appelée quand un passager rejoint
  notifyDriverForNewPassenger({
    tripId,
    passengerId
  }) {
    this.eventHandler.push(...)
  }
}

class UserBanned {
  public readonly userId: string;
}`;

const SCENARIOS = [
  'Lorsqu’un passager rejoint un Voyage, le Conducteur est notifié. Implémentez le code qui correspond à cette fonctionnalité.',
  'Lorsqu’un passager est banni de l’application, il doit être retiré du voyage. Vous recevez cette notification depuis l’extérieur. Implémentez la solution.',
];

const BRIEF_W = 400;
const brief = [text({ x: 0, y: 0, text: 'Scénarios', fontSize: 16, strokeColor: '#495057' })];
let by = 34;
SCENARIOS.forEach((s, i) => {
  const h = 20 + Math.ceil(s.length / Math.floor((BRIEF_W - 12) / (13 * 0.7))) * 13 * 1.25 + 10;
  brief.push(...labelled({
    x: 0, y: by, width: BRIEF_W, height: h,
    backgroundColor: '#fff9db', strokeColor: '#f08c00', strokeWidth: 1,
  }, `${i + 1}. ${s}`, 13, '#495057'));
  by += h + 12;
});

const CONSIGNES = consignes('Consignes', [
  'Partir du squelette fourni.',
  '',
  'Scénario 1 : le domaine doit dire ce',
  'qui vient d’arriver, sans connaître',
  'qui l’écoute.',
  '',
  'Scénario 2 : l’évènement vient du',
  'dehors — il n’est pas un domain event,',
  'il en déclenche un.',
  '',
  'Durée : 15 min',
], BRIEF_W);

const SQ_X = BRIEF_W + 40, SQ_W = 470;
const squelette = [
  text({ x: SQ_X, y: 0, text: 'Squelette fourni', fontSize: 16, strokeColor: '#495057' }),
  rect({ x: SQ_X, y: 34, width: SQ_W, height: 420, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }),
  code({ x: SQ_X + 12, y: 46, text: SQUELETTE }),
];

// Le canevas empile deux emplacements vides à droite du squelette ;
// la solution, elle, vit dans son propre fichier — deux colonnes de code ne
// tiennent pas à 100 % de zoom sous le squelette.
const SOL_X = SQ_X + SQ_W + 40, SOL_W = 500;
const VIDE_Y = [0, 374], VIDE_H = 300;

const slotVide = (i) => [
  text({ x: SOL_X, y: VIDE_Y[i], text: `Scénario ${i + 1}`, fontSize: 16, strokeColor: '#495057' }),
  rect({
    x: SOL_X, y: VIDE_Y[i] + 34, width: SOL_W, height: VIDE_H,
    backgroundColor: 'transparent', strokeColor: '#ced4da',
    strokeStyle: 'dashed', strokeWidth: 1, locked: false,
  }),
];

const canevas = [...brief, ...CONSIGNES, ...squelette, ...slotVide(0), ...slotVide(1)];

const SOL = [
  `class PassengerJoined {
  constructor(
    readonly tripId: string,
    readonly passengerId: string
  ) {}
}

class Trip extends AggregateRoot {
  join(passengerId: string) {
    this.passengers.push(passengerId);

    // Le domaine dit ce qui s'est passé.
    this.raise(
      new PassengerJoined(this.id, passengerId)
    );
  }
}

class JoinTrip {
  async execute({ tripId, passengerId }) {
    const trip = await this.trips.byId(tripId);
    trip.join(passengerId);
    await this.trips.save(trip);
  }
}

// Application Layer
class NotifyDriverHandler {
  @OnEvent(PassengerJoined)
  on(event: PassengerJoined) {
    this.notifications
      .notifyDriverForNewPassenger(event);
  }
}`,

  `// UserBanned vient de l'extérieur :
// ce n'est pas un domain event, c'est
// un signal qui en déclenche un.

class KickBannedPassenger {
  @OnEvent(UserBanned)
  async on(event: UserBanned) {
    const trips =
      await this.trips.withPassenger(event.userId);

    for (const trip of trips) {
      trip.kickPassenger(event.userId);
      await this.trips.save(trip);
    }
  }
}

class Trip extends AggregateRoot {
  kickPassenger(passengerId: string) {
    this.passengers =
      this.passengers.filter(p => p !== passengerId);

    this.raise(
      new PassengerKicked(this.id, passengerId)
    );
  }
}`,
];

const S_W2 = 520, S_X = [0, 560], S_H = 540;
const solution = [];
SOL.forEach((source, i) => {
  solution.push(text({ x: S_X[i], y: 0, text: `Scénario ${i + 1}`, fontSize: 16, strokeColor: '#495057' }));
  solution.push(rect({ x: S_X[i], y: 34, width: S_W2, height: S_H, backgroundColor: '#f8f9fa', strokeColor: '#adb5bd', strokeWidth: 1 }));
  solution.push(code({ x: S_X[i] + 12, y: 46, text: source }));
});
solution.push(...consignes('Au débrief', [
  'Un domain event se nomme au passé :',
  'PassengerJoined, pas JoinPassenger.',
  'Il constate, il n’ordonne pas.',
  '',
  'Le domaine lève, il ne notifie pas.',
  'Trip ignore qu’un conducteur existe,',
  'et c’est ce qui le garde testable.',
  '',
  'UserBanned n’est pas un domain event :',
  'il vient d’un autre contexte. Un',
  'handler applicatif le traduit en geste',
  'du domaine — kickPassenger — qui lève',
  'à son tour son propre évènement.',
  '',
  'C’est exactement le sujet de la séance',
  'suivante : intégrer les bounded',
  'contexts.',
], 360));

const DIR = path.join(__dirname, '..', '12-domain-events');
require('fs').mkdirSync(DIR, { recursive: true });
write(path.join(DIR, '12-domain-events-exercice.excalidraw'), canevas);
write(path.join(DIR, '12-domain-events-solution.excalidraw'), solution);
