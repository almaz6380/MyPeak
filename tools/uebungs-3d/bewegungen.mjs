// Bewegungsmuster fuer den 3D-Uebungsrenderer — ZWEITER ANLAUF.
//
// ⚠ Der erste Anlauf beschrieb jede Uebung durch GELENKWINKEL („Schulter -92,
// Ellbogen -88"). Das war blind geraten und liess sich nicht nachpruefen;
// Josefs Urteil zum Ergebnis: „die Bewegung ist falsch". Zu Recht.
//
// Jetzt wird beschrieben, WO Haende und Fuesse hingehen. Die Gelenkwinkel
// rechnet die IK in szene.js aus. Beim Bankdruecken steht hier: Haende von
// 78 cm auf 108 cm — das kann man gegen die Wirklichkeit halten, Winkel nie.
//
// KOORDINATEN (Weltmass in Metern, Figur schaut nach +Z):
//   Boden y=0. Figur 1,85 m.
//   Schultergelenke stehen aufrecht bei (±0.175, 1.46, 0), Armlaenge 0.55 —
//     haengende Haende erreichen also y = 0.91.
//   Hueftgelenke bei (±0.095, 0.93, 0), Beinlaenge 0.88 — Fuesse bei y = 0.05.
//   Ist ein Ziel ausser Reichweite, streckt die IK das Glied nur; es bricht
//   nichts, aber die Pose stimmt dann nicht. Reichweite mitrechnen.
//
// Felder:
//   huefte   {start,ende}  Lage des Beckens
//   neigung  {start,ende}  Drehung des ganzen Koerpers in Grad (x: −90 = auf
//                          dem Ruecken, +90 = auf dem Bauch)
//   rumpf/brust/kopf       Winkel der Wirbelsaeule (dort gibt es kein Ziel
//                          im Raum, das man vorgeben koennte)
//   hand/fuss {start,ende} je [links, rechts] als Weltpunkte
//   polArm/polBein         wohin Ellbogen bzw. Knie zeigen sollen; entweder
//                          ein Vektor fuer beide oder [links, rechts]

export const muster = {
  // Langhantel-Curl: Haende von vor den Oberschenkeln bis zu den Schultern.
  curl: {
    geraet: 'langhantel',
    huefte: { start: [0, 0.99, 0] },
    fuss: { start: [[0.13, 0.04, 0.01], [-0.13, 0.04, 0.01]] },
    hand: {
      start: [[0.30, 0.94, 0.10], [-0.30, 0.94, 0.10]],
      ende: [[0.26, 1.31, 0.22], [-0.26, 1.31, 0.22]],
    },
    polArm: [0, -0.6, -1],
    polBein: [0, 0, 1],
    rumpf: { start: [2, 0, 0] },
    kamera: { winkel: -52, schwung: 14 },
  },

  // Kniebeuge: Becken sinkt und wandert zurueck, Fuesse bleiben stehen.
  kniebeuge: {
    geraet: 'keins',
    huefte: { start: [0, 0.99, 0], ende: [0, 0.63, -0.13] },
    fuss: { start: [[0.155, 0.04, 0.02], [-0.155, 0.04, 0.02]] },
    hand: {
      start: [[0.24, 0.95, 0.14], [-0.24, 0.95, 0.14]],
      ende: [[0.25, 0.98, 0.44], [-0.25, 0.98, 0.44]],
    },
    polArm: [0, -0.5, 1],
    polBein: [0, 0.1, 1],
    rumpf: { start: [3, 0, 0], ende: [22, 0, 0] },
    kamera: { winkel: -42, schwung: 16 },
  },

  // Bankdruecken: auf dem Ruecken, Haende von der Brust senkrecht nach oben.
  bankdruecken: {
    geraet: 'bank_langhantel',
    huefte: { start: [0, 0.60, 0.30] },
    neigung: { start: [-90, 0, 0] },
    fuss: { start: [[0.20, 0.04, 0.62], [-0.20, 0.04, 0.62]] },
    hand: {
      start: [[0.29, 0.78, -0.10], [-0.29, 0.78, -0.10]],
      ende: [[0.24, 1.08, -0.12], [-0.24, 1.08, -0.12]],
    },
    // Ellbogen zeigen nach aussen und unten — sonst klappen sie durch den
    // Koerper. Je Seite eigener Pol, weil „aussen" spiegelverkehrt ist.
    polArm: [[1, -0.5, 0], [-1, -0.5, 0]],
    polBein: [0, 1, 0],
    kamera: { winkel: -54, schwung: 14 },
  },
};
