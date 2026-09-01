// Bewegungsmuster fuer den 3D-Uebungsrenderer.
//
// Warum Muster statt 162 Einzelanimationen: Die Uebungen fallen in rund drei
// Dutzend Bewegungsfamilien (Druecken, Ziehen, Beugen, Strecken …). Ein Muster
// beschreibt die Familie, die Uebung waehlt Muster + Geraet + Zielmuskel. So
// wird aus 162 Handanimationen eine ueberschaubare Tabelle — und eine
// Verbesserung am Muster verbessert sofort alle Uebungen darin.
//
// GELENKE UND VORZEICHEN (einmal lesen, spart Ratespiele):
//   Die Figur schaut nach +Z, Glieder haengen entlang -Y vom Gelenk.
//   rumpf.x       + = Oberkoerper neigt sich nach VORNE (Hueftscharnier)
//   rumpf.y       + = Oberkoerper dreht sich nach links
//   schulter.x    − = Arm nach VORNE,  + = nach hinten
//   schulter.z    + = Arm zur Seite (LINKS), fuer die RECHTE Seite negativ
//   ellbogen.x    − = beugen (Hand zur Schulter)
//   huefte.x      − = Oberschenkel nach vorne (Hueftbeugung)
//   knie.x        + = beugen (Ferse nach hinten)
//   fussgelenk.x  − = Zehen nach oben
//   kopf.x        + = Kinn zur Brust
//
// Werte in Grad. Was in `ende` fehlt, bleibt auf dem Wert aus `start`.
//
// `bodenHaftung: false` schaltet das automatische Fuesse-auf-den-Boden ab —
// noetig fuer alles Liegende, Haengende, Sitzende und Springende.

// Beine im entspannten Stand — Ausgangspunkt aller Steh-Uebungen.
const STAND = {
  huefteL: [0, 0, 3], huefteR: [0, 0, -3],
  knieL: [2, 0, 0], knieR: [2, 0, 0],
};
// Arme haengen seitlich am Koerper.
const ARME_UNTEN = {
  schulterL: [-4, 0, 7], schulterR: [-4, 0, -7],
  ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0],
};
// Auf einer Bank sitzen, Fuesse am Boden.
const SITZ = {
  huefteL: [-84, 0, 4], huefteR: [-84, 0, -4],
  knieL: [80, 0, 0], knieR: [80, 0, 0],
};

export const muster = {
  // ═══════════ ARME: BEUGEN ═══════════
  curl: {
    geraet: 'langhantel',
    start: { ...STAND, schulterL: [-14, 0, 6], schulterR: [-14, 0, -6], ellbogenL: [-10, 0, 0], ellbogenR: [-10, 0, 0] },
    ende: { schulterL: [-20, 0, 6], schulterR: [-20, 0, -6], ellbogenL: [-138, 0, 0], ellbogenR: [-138, 0, 0] },
    kamera: { winkel: -38, schwung: 16 },
  },
  curl_kurzhantel: {
    geraet: 'kurzhantel',
    start: { ...STAND, schulterL: [-12, 0, 8], schulterR: [-12, 0, -8], ellbogenL: [-10, 0, 0], ellbogenR: [-10, 0, 0] },
    ende: { schulterL: [-18, 0, 8], schulterR: [-18, 0, -8], ellbogenL: [-134, 0, 0], ellbogenR: [-134, 0, 0] },
    kamera: { winkel: -38, schwung: 16 },
  },
  // Scott-Bank / Maschine: Oberarme liegen auf, nur der Unterarm bewegt sich.
  curl_sitzend: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.50, 0.18],
    start: { ...SITZ, rumpf: [8, 0, 0], schulterL: [-46, 0, 8], schulterR: [-46, 0, -8], ellbogenL: [-14, 0, 0], ellbogenR: [-14, 0, 0] },
    ende: { ellbogenL: [-128, 0, 0], ellbogenR: [-128, 0, 0] },
    kamera: { winkel: -40, schwung: 14 },
  },
  handgelenk_curl: {
    geraet: 'kurzhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.50, 0.18],
    start: {
      ...SITZ, rumpf: [24, 0, 0], schulterL: [-38, 0, 8], schulterR: [-38, 0, -8],
      ellbogenL: [-72, 0, 0], ellbogenR: [-72, 0, 0], handgelenkL: [24, 0, 0], handgelenkR: [24, 0, 0],
    },
    ende: { handgelenkL: [-38, 0, 0], handgelenkR: [-38, 0, 0] },
    kamera: { winkel: -46, schwung: 12 },
  },

  // ═══════════ ARME: STRECKEN ═══════════
  trizeps_druecken: {
    geraet: 'kabel',
    start: { ...STAND, rumpf: [10, 0, 0], schulterL: [-16, 0, 7], schulterR: [-16, 0, -7], ellbogenL: [-96, 0, 0], ellbogenR: [-96, 0, 0] },
    ende: { ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0] },
    kamera: { schwung: 14 },
  },
  trizeps_ueberkopf: {
    geraet: 'kurzhantel',
    start: { ...STAND, schulterL: [8, 0, 158], schulterR: [8, 0, -158], ellbogenL: [-4, 0, 0], ellbogenR: [-4, 0, 0] },
    ende: { ellbogenL: [-128, 0, 0], ellbogenR: [-128, 0, 0] },
    kamera: { schwung: 16 },
  },
  // Liegend, Oberarme senkrecht — Skullcrusher und French Press.
  trizeps_liegend: {
    geraet: 'bank_langhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.63, 0.95],
    wurzelRot: [-90, 0, 0],
    start: {
      huefteL: [26, 0, 4], huefteR: [26, 0, -4], knieL: [64, 0, 0], knieR: [64, 0, 0],
      schulterL: [-92, 0, 6], schulterR: [-92, 0, -6], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0],
    },
    ende: { ellbogenL: [-118, 0, 0], ellbogenR: [-118, 0, 0] },
    kamera: { winkel: -58, schwung: 14 },
  },
  trizeps_kickback: {
    geraet: 'kurzhantel',
    start: {
      rumpf: [62, 0, 0], huefteL: [-18, 0, 3], huefteR: [-18, 0, -3], knieL: [24, 0, 0], knieR: [24, 0, 0],
      schulterL: [24, 0, 10], schulterR: [24, 0, -10], ellbogenL: [-92, 0, 0], ellbogenR: [-92, 0, 0],
    },
    ende: { ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0] },
    kamera: { schwung: 14 },
  },
  dips: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.62, 0],
    wurzelPosEnde: [0, 0.30, 0],
    start: {
      schulterL: [4, 0, 6], schulterR: [4, 0, -6], ellbogenL: [-4, 0, 0], ellbogenR: [-4, 0, 0],
      huefteL: [-26, 0, 4], huefteR: [-26, 0, -4], knieL: [58, 0, 0], knieR: [58, 0, 0], rumpf: [10, 0, 0],
    },
    ende: {
      schulterL: [26, 0, 12], schulterR: [26, 0, -12], ellbogenL: [-96, 0, 0], ellbogenR: [-96, 0, 0],
      rumpf: [18, 0, 0],
    },
    kamera: { winkel: -42, schwung: 16 },
  },

  // ═══════════ SCHULTERN ═══════════
  seitheben: {
    geraet: 'kurzhantel',
    start: { ...STAND, schulterL: [-6, 0, 9], schulterR: [-6, 0, -9], ellbogenL: [-12, 0, 0], ellbogenR: [-12, 0, 0] },
    ende: { schulterL: [-6, 0, 88], schulterR: [-6, 0, -88], ellbogenL: [-16, 0, 0], ellbogenR: [-16, 0, 0] },
    kamera: { winkel: -18, schwung: 20 },
  },
  frontheben: {
    geraet: 'kurzhantel',
    start: { ...STAND, ...ARME_UNTEN },
    ende: { schulterL: [-92, 0, 7], schulterR: [-92, 0, -7], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0] },
    kamera: { winkel: -34, schwung: 18 },
  },
  schulterdruecken: {
    geraet: 'langhantel',
    start: { ...STAND, schulterL: [-16, 0, 66], schulterR: [-16, 0, -66], ellbogenL: [-104, 0, 0], ellbogenR: [-104, 0, 0] },
    ende: { schulterL: [-6, 0, 162], schulterR: [-6, 0, -162], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0] },
    kamera: { winkel: -32, schwung: 16 },
  },
  schulterdruecken_kurzhantel: {
    geraet: 'kurzhantel',
    start: { ...STAND, schulterL: [-14, 0, 68], schulterR: [-14, 0, -68], ellbogenL: [-102, 0, 0], ellbogenR: [-102, 0, 0] },
    ende: { schulterL: [-6, 0, 164], schulterR: [-6, 0, -164], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0] },
    kamera: { winkel: -32, schwung: 16 },
  },
  reverse_fly: {
    geraet: 'kurzhantel',
    start: {
      rumpf: [58, 0, 0], huefteL: [-16, 0, 3], huefteR: [-16, 0, -3], knieL: [22, 0, 0], knieR: [22, 0, 0],
      schulterL: [-56, 0, 6], schulterR: [-56, 0, -6], ellbogenL: [-24, 0, 0], ellbogenR: [-24, 0, 0],
    },
    ende: { schulterL: [-52, 0, 84], schulterR: [-52, 0, -84], ellbogenL: [-26, 0, 0], ellbogenR: [-26, 0, 0] },
    kamera: { winkel: -30, schwung: 18 },
  },
  aufrechtes_rudern: {
    geraet: 'langhantel',
    start: { ...STAND, schulterL: [-16, 0, 6], schulterR: [-16, 0, -6], ellbogenL: [-10, 0, 0], ellbogenR: [-10, 0, 0] },
    ende: { schulterL: [-24, 0, 74], schulterR: [-24, 0, -74], ellbogenL: [-104, 0, 0], ellbogenR: [-104, 0, 0] },
    kamera: { winkel: -30, schwung: 16 },
  },
  shrugs: {
    geraet: 'kurzhantel',
    bodenHaftung: false,
    wurzelPosEnde: [0, 0.05, 0],
    start: { ...STAND, ...ARME_UNTEN, rumpf: [0, 0, 0] },
    ende: { schulterL: [-4, 0, 13], schulterR: [-4, 0, -13], rumpf: [-3, 0, 0] },
    kamera: { winkel: -34, schwung: 14 },
  },

  // ═══════════ BRUST ═══════════
  bankdruecken: {
    geraet: 'bank_langhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.63, 0.95],
    wurzelRot: [-90, 0, 0],
    start: {
      huefteL: [26, 0, 4], huefteR: [26, 0, -4], knieL: [64, 0, 0], knieR: [64, 0, 0],
      schulterL: [-92, 0, 52], schulterR: [-92, 0, -52], ellbogenL: [-88, 0, 0], ellbogenR: [-88, 0, 0],
    },
    ende: { schulterL: [-96, 0, 16], schulterR: [-96, 0, -16], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0] },
    kamera: { winkel: -56, schwung: 16 },
  },
  bankdruecken_kurzhantel: {
    geraet: 'bank_kurzhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.63, 0.95],
    wurzelRot: [-90, 0, 0],
    start: {
      huefteL: [26, 0, 4], huefteR: [26, 0, -4], knieL: [64, 0, 0], knieR: [64, 0, 0],
      schulterL: [-90, 0, 58], schulterR: [-90, 0, -58], ellbogenL: [-86, 0, 0], ellbogenR: [-86, 0, 0],
    },
    ende: { schulterL: [-96, 0, 14], schulterR: [-96, 0, -14], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0] },
    kamera: { winkel: -56, schwung: 16 },
  },
  schraegbankdruecken: {
    geraet: 'schraegbank_kurzhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.70, 0.72],
    wurzelRot: [-62, 0, 0],
    start: {
      huefteL: [-32, 0, 4], huefteR: [-32, 0, -4], knieL: [72, 0, 0], knieR: [72, 0, 0],
      schulterL: [-88, 0, 58], schulterR: [-88, 0, -58], ellbogenL: [-86, 0, 0], ellbogenR: [-86, 0, 0],
    },
    ende: { schulterL: [-94, 0, 14], schulterR: [-94, 0, -14], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0] },
    kamera: { winkel: -56, schwung: 16 },
  },
  fliegende: {
    geraet: 'bank_kurzhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.63, 0.95],
    wurzelRot: [-90, 0, 0],
    start: {
      huefteL: [26, 0, 4], huefteR: [26, 0, -4], knieL: [64, 0, 0], knieR: [64, 0, 0],
      schulterL: [-90, 0, 86], schulterR: [-90, 0, -86], ellbogenL: [-24, 0, 0], ellbogenR: [-24, 0, 0],
    },
    ende: { schulterL: [-94, 0, 12], schulterR: [-94, 0, -12], ellbogenL: [-22, 0, 0], ellbogenR: [-22, 0, 0] },
    kamera: { winkel: -56, schwung: 16 },
  },
  kabelzug_brust: {
    geraet: 'kabel',
    start: {
      ...STAND, rumpf: [12, 0, 0],
      schulterL: [-58, 0, 78], schulterR: [-58, 0, -78], ellbogenL: [-26, 0, 0], ellbogenR: [-26, 0, 0],
    },
    ende: { schulterL: [-76, 0, 12], schulterR: [-76, 0, -12], ellbogenL: [-32, 0, 0], ellbogenR: [-32, 0, 0] },
    kamera: { winkel: -34, schwung: 16 },
  },
  liegestuetz: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.44, 0.62],
    wurzelPosEnde: [0, 0.28, 0.62],
    wurzelRot: [76, 0, 0],
    start: {
      huefteL: [6, 0, 4], huefteR: [6, 0, -4], knieL: [3, 0, 0], knieR: [3, 0, 0],
      fussgelenkL: [58, 0, 0], fussgelenkR: [58, 0, 0],
      schulterL: [-88, 0, 12], schulterR: [-88, 0, -12], ellbogenL: [-4, 0, 0], ellbogenR: [-4, 0, 0],
    },
    ende: { schulterL: [-74, 0, 48], schulterR: [-74, 0, -48], ellbogenL: [-88, 0, 0], ellbogenR: [-88, 0, 0] },
    kamera: { winkel: -44, schwung: 16 },
  },

  // ═══════════ RUECKEN ═══════════
  rudern_vorgebeugt: {
    geraet: 'langhantel',
    start: {
      rumpf: [58, 0, 0], huefteL: [-16, 0, 3], huefteR: [-16, 0, -3], knieL: [22, 0, 0], knieR: [22, 0, 0],
      schulterL: [-52, 0, 6], schulterR: [-52, 0, -6], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0],
    },
    ende: { schulterL: [-6, 0, 10], schulterR: [-6, 0, -10], ellbogenL: [-96, 0, 0], ellbogenR: [-96, 0, 0] },
    kamera: { schwung: 14 },
  },
  rudern_sitzend: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.50, 0.20],
    start: {
      huefteL: [-82, 0, 4], huefteR: [-82, 0, -4], knieL: [58, 0, 0], knieR: [58, 0, 0],
      rumpf: [26, 0, 0], schulterL: [-72, 0, 8], schulterR: [-72, 0, -8],
      ellbogenL: [-14, 0, 0], ellbogenR: [-14, 0, 0],
    },
    ende: {
      rumpf: [-6, 0, 0], schulterL: [-10, 0, 10], schulterR: [-10, 0, -10],
      ellbogenL: [-102, 0, 0], ellbogenR: [-102, 0, 0],
    },
    kamera: { schwung: 14 },
  },
  latzug: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.50, 0.20],
    start: {
      ...SITZ, rumpf: [-6, 0, 0], schulterL: [-14, 0, 156], schulterR: [-14, 0, -156],
      ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0],
    },
    ende: {
      rumpf: [-12, 0, 0], schulterL: [-14, 0, 92], schulterR: [-14, 0, -92],
      ellbogenL: [-96, 0, 0], ellbogenR: [-96, 0, 0],
    },
    kamera: { schwung: 14 },
  },
  klimmzug: {
    geraet: 'klimmzug',
    bodenHaftung: false,
    wurzelPos: [0, 0.28, 0],
    wurzelPosEnde: [0, 0.72, 0],
    start: {
      schulterL: [-8, 0, 168], schulterR: [-8, 0, -168], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0],
      huefteL: [-12, 0, 4], huefteR: [-12, 0, -4], knieL: [42, 0, 0], knieR: [42, 0, 0],
    },
    ende: { schulterL: [-8, 0, 118], schulterR: [-8, 0, -118], ellbogenL: [-124, 0, 0], ellbogenR: [-124, 0, 0] },
    kamera: { schwung: 14 },
  },
  kreuzheben: {
    geraet: 'langhantel',
    start: {
      rumpf: [66, 0, 0], huefteL: [-30, 0, 4], huefteR: [-30, 0, -4], knieL: [46, 0, 0], knieR: [46, 0, 0],
      schulterL: [-40, 0, 7], schulterR: [-40, 0, -7], ellbogenL: [-5, 0, 0], ellbogenR: [-5, 0, 0],
    },
    ende: {
      rumpf: [-2, 0, 0], huefteL: [0, 0, 3], huefteR: [0, 0, -3], knieL: [2, 0, 0], knieR: [2, 0, 0],
      schulterL: [-4, 0, 7], schulterR: [-4, 0, -7],
    },
    kamera: { schwung: 14 },
  },
  hyperextension: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.62, 0.30],
    start: {
      rumpf: [72, 0, 0], huefteL: [4, 0, 4], huefteR: [4, 0, -4],
      schulterL: [-140, 0, 14], schulterR: [-140, 0, -14], ellbogenL: [-118, 0, 0], ellbogenR: [-118, 0, 0],
    },
    ende: { rumpf: [-4, 0, 0] },
    kamera: { schwung: 14 },
  },

  // ═══════════ BEINE ═══════════
  kniebeuge: {
    geraet: 'keins',
    start: { ...STAND, rumpf: [6, 0, 0], schulterL: [-72, 0, 8], schulterR: [-72, 0, -8], ellbogenL: [-14, 0, 0], ellbogenR: [-14, 0, 0] },
    ende: {
      huefteL: [-88, 0, 6], huefteR: [-88, 0, -6], knieL: [96, 0, 0], knieR: [96, 0, 0],
      fussgelenkL: [-8, 0, 0], fussgelenkR: [-8, 0, 0],
      schulterL: [-84, 0, 8], schulterR: [-84, 0, -8], rumpf: [26, 0, 0],
    },
    kamera: { winkel: -44, schwung: 18 },
  },
  kniebeuge_langhantel: {
    geraet: 'langhantel',
    start: {
      ...STAND, rumpf: [6, 0, 0],
      schulterL: [10, 0, 118], schulterR: [10, 0, -118], ellbogenL: [-128, 0, 0], ellbogenR: [-128, 0, 0],
    },
    ende: {
      huefteL: [-88, 0, 6], huefteR: [-88, 0, -6], knieL: [96, 0, 0], knieR: [96, 0, 0],
      fussgelenkL: [-8, 0, 0], fussgelenkR: [-8, 0, 0], rumpf: [28, 0, 0],
    },
    kamera: { winkel: -44, schwung: 18 },
  },
  ausfallschritt: {
    geraet: 'kurzhantel',
    start: { ...STAND, ...ARME_UNTEN },
    ende: {
      huefteL: [-62, 0, 4], knieL: [76, 0, 0], fussgelenkL: [-10, 0, 0],
      huefteR: [34, 0, -4], knieR: [94, 0, 0], fussgelenkR: [24, 0, 0], rumpf: [10, 0, 0],
    },
    kamera: { winkel: -50, schwung: 16 },
  },
  beinpresse: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.56, 0.10],
    wurzelRot: [-38, 0, 0],
    start: {
      huefteL: [-96, 0, 6], huefteR: [-96, 0, -6], knieL: [98, 0, 0], knieR: [98, 0, 0],
      schulterL: [-12, 0, 22], schulterR: [-12, 0, -22], ellbogenL: [-42, 0, 0], ellbogenR: [-42, 0, 0],
    },
    ende: { huefteL: [-46, 0, 6], huefteR: [-46, 0, -6], knieL: [14, 0, 0], knieR: [14, 0, 0] },
    kamera: { winkel: -58, schwung: 14 },
  },
  beinstrecker: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.50, 0.18],
    start: {
      huefteL: [-84, 0, 4], huefteR: [-84, 0, -4], knieL: [86, 0, 0], knieR: [86, 0, 0],
      rumpf: [-4, 0, 0], schulterL: [-14, 0, 24], schulterR: [-14, 0, -24],
      ellbogenL: [-38, 0, 0], ellbogenR: [-38, 0, 0],
    },
    ende: { knieL: [2, 0, 0], knieR: [2, 0, 0] },
    kamera: { winkel: -48, schwung: 14 },
  },
  beinbeuger: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.60, 0.55],
    wurzelRot: [86, 0, 0],
    start: {
      huefteL: [4, 0, 4], huefteR: [4, 0, -4], knieL: [4, 0, 0], knieR: [4, 0, 0],
      schulterL: [-118, 0, 16], schulterR: [-118, 0, -16], ellbogenL: [-28, 0, 0], ellbogenR: [-28, 0, 0],
    },
    ende: { knieL: [104, 0, 0], knieR: [104, 0, 0] },
    kamera: { winkel: -52, schwung: 14 },
  },
  wadenheben: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPosEnde: [0, 0.11, 0],
    start: { ...STAND, ...ARME_UNTEN, fussgelenkL: [0, 0, 0], fussgelenkR: [0, 0, 0] },
    ende: { fussgelenkL: [34, 0, 0], fussgelenkR: [34, 0, 0] },
    kamera: { schwung: 16 },
  },
  hueftheben: {
    geraet: 'langhantel',
    bodenHaftung: false,
    wurzelPos: [0, 0.34, 0.42],
    wurzelPosEnde: [0, 0.50, 0.42],
    wurzelRot: [-58, 0, 0],
    start: {
      huefteL: [-42, 0, 5], huefteR: [-42, 0, -5], knieL: [82, 0, 0], knieR: [82, 0, 0],
      rumpf: [-16, 0, 0], schulterL: [-64, 0, 10], schulterR: [-64, 0, -10],
      ellbogenL: [-16, 0, 0], ellbogenR: [-16, 0, 0],
    },
    ende: { huefteL: [-4, 0, 5], huefteR: [-4, 0, -5], rumpf: [-2, 0, 0] },
    kamera: { winkel: -56, schwung: 14 },
  },
  kickback: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.56, 0.30],
    wurzelRot: [84, 0, 0],
    start: {
      huefteL: [-6, 0, 6], huefteR: [-84, 0, -6], knieL: [88, 0, 0], knieR: [88, 0, 0],
      schulterL: [-88, 0, 12], schulterR: [-88, 0, -12], ellbogenL: [-4, 0, 0], ellbogenR: [-4, 0, 0],
    },
    ende: { huefteR: [-4, 0, -6], knieR: [72, 0, 0] },
    kamera: { schwung: 14 },
  },
  abduktion: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.50, 0.18],
    start: {
      ...SITZ, rumpf: [-4, 0, 0], schulterL: [-14, 0, 26], schulterR: [-14, 0, -26],
      ellbogenL: [-44, 0, 0], ellbogenR: [-44, 0, 0],
    },
    ende: { huefteL: [-84, 0, 34], huefteR: [-84, 0, -34] },
    kamera: { winkel: -12, schwung: 16 },
  },

  // ═══════════ RUMPF ═══════════
  crunch: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.14, 0.85],
    wurzelRot: [-90, 0, 0],
    start: {
      huefteL: [-52, 0, 5], huefteR: [-52, 0, -5], knieL: [86, 0, 0], knieR: [86, 0, 0],
      schulterL: [-146, 0, 26], schulterR: [-146, 0, -26], ellbogenL: [-112, 0, 0], ellbogenR: [-112, 0, 0],
      rumpf: [0, 0, 0],
    },
    ende: { rumpf: [34, 0, 0], kopf: [16, 0, 0] },
    kamera: { winkel: -52, schwung: 14 },
  },
  beinheben: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.14, 0.85],
    wurzelRot: [-90, 0, 0],
    start: {
      huefteL: [-6, 0, 4], huefteR: [-6, 0, -4], knieL: [6, 0, 0], knieR: [6, 0, 0],
      schulterL: [16, 0, 12], schulterR: [16, 0, -12], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0],
    },
    ende: { huefteL: [-88, 0, 4], huefteR: [-88, 0, -4], knieL: [12, 0, 0], knieR: [12, 0, 0] },
    kamera: { winkel: -52, schwung: 14 },
  },
  beinheben_haengend: {
    geraet: 'klimmzug',
    bodenHaftung: false,
    wurzelPos: [0, 0.30, 0],
    start: {
      schulterL: [-6, 0, 170], schulterR: [-6, 0, -170], ellbogenL: [-4, 0, 0], ellbogenR: [-4, 0, 0],
      huefteL: [-4, 0, 4], huefteR: [-4, 0, -4], knieL: [6, 0, 0], knieR: [6, 0, 0],
    },
    ende: { huefteL: [-88, 0, 4], huefteR: [-88, 0, -4], knieL: [16, 0, 0], knieR: [16, 0, 0] },
    kamera: { winkel: -40, schwung: 14 },
  },
  plank: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.40, 0.60],
    wurzelPosEnde: [0, 0.43, 0.60],
    wurzelRot: [78, 0, 0],
    start: {
      huefteL: [6, 0, 4], huefteR: [6, 0, -4], knieL: [3, 0, 0], knieR: [3, 0, 0],
      fussgelenkL: [56, 0, 0], fussgelenkR: [56, 0, 0],
      schulterL: [-88, 0, 26], schulterR: [-88, 0, -26], ellbogenL: [-88, 0, 0], ellbogenR: [-88, 0, 0],
    },
    ende: { huefteL: [-2, 0, 4], huefteR: [-2, 0, -4] },
    kamera: { winkel: -46, schwung: 18 },
  },
  bergsteiger: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.44, 0.62],
    wurzelRot: [78, 0, 0],
    start: {
      huefteL: [6, 0, 4], huefteR: [6, 0, -4], knieL: [3, 0, 0], knieR: [3, 0, 0],
      fussgelenkL: [56, 0, 0], fussgelenkR: [56, 0, 0],
      schulterL: [-88, 0, 24], schulterR: [-88, 0, -24], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0],
    },
    ende: { huefteL: [-84, 0, 6], knieL: [96, 0, 0] },
    kamera: { winkel: -46, schwung: 16 },
  },
  holzhacker: {
    geraet: 'kabel',
    start: {
      ...STAND, rumpf: [14, -34, 0],
      schulterL: [-124, 0, 34], schulterR: [-118, 0, -18], ellbogenL: [-14, 0, 0], ellbogenR: [-16, 0, 0],
    },
    ende: {
      rumpf: [26, 34, 0], huefteL: [-14, 0, 3], huefteR: [-14, 0, -3], knieL: [26, 0, 0], knieR: [26, 0, 0],
      schulterL: [-26, 0, 18], schulterR: [-30, 0, -34],
    },
    kamera: { winkel: -26, schwung: 18 },
  },
  drehung_sitzend: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.16, 0.30],
    start: {
      huefteL: [-72, 0, 6], huefteR: [-72, 0, -6], knieL: [78, 0, 0], knieR: [78, 0, 0],
      rumpf: [34, -32, 0], schulterL: [-72, 0, 22], schulterR: [-64, 0, -8],
      ellbogenL: [-58, 0, 0], ellbogenR: [-58, 0, 0],
    },
    ende: { rumpf: [34, 32, 0], schulterL: [-64, 0, 8], schulterR: [-72, 0, -22] },
    kamera: { winkel: -34, schwung: 16 },
  },
  ab_rad: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPos: [0, 0.44, 0.34],
    wurzelPosEnde: [0, 0.30, 0.34],
    wurzelRot: [58, 0, 0],
    start: {
      huefteL: [-58, 0, 5], huefteR: [-58, 0, -5], knieL: [92, 0, 0], knieR: [92, 0, 0],
      schulterL: [-98, 0, 16], schulterR: [-98, 0, -16], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0],
      rumpf: [22, 0, 0],
    },
    ende: {
      huefteL: [-14, 0, 5], huefteR: [-14, 0, -5], rumpf: [2, 0, 0],
      schulterL: [-150, 0, 14], schulterR: [-150, 0, -14],
    },
    kamera: { winkel: -48, schwung: 14 },
  },

  // ═══════════ GANZKOERPER / AUSDAUER ═══════════
  sprung: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPosEnde: [0, 0.34, 0],
    start: {
      huefteL: [-56, 0, 6], huefteR: [-56, 0, -6], knieL: [70, 0, 0], knieR: [70, 0, 0],
      rumpf: [22, 0, 0], schulterL: [30, 0, 10], schulterR: [30, 0, -10],
      ellbogenL: [-24, 0, 0], ellbogenR: [-24, 0, 0],
    },
    ende: {
      huefteL: [4, 0, 4], huefteR: [4, 0, -4], knieL: [4, 0, 0], knieR: [4, 0, 0],
      fussgelenkL: [32, 0, 0], fussgelenkR: [32, 0, 0], rumpf: [-2, 0, 0],
      schulterL: [-32, 0, 26], schulterR: [-32, 0, -26], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0],
    },
    kamera: { winkel: -36, schwung: 16 },
  },
  hampelmann: {
    geraet: 'keins',
    bodenHaftung: false,
    wurzelPosEnde: [0, 0.06, 0],
    start: { ...STAND, ...ARME_UNTEN },
    ende: {
      schulterL: [-6, 0, 164], schulterR: [-6, 0, -164], ellbogenL: [-6, 0, 0], ellbogenR: [-6, 0, 0],
      huefteL: [0, 0, 24], huefteR: [0, 0, -24],
    },
    kamera: { winkel: -20, schwung: 14 },
  },
  laufen: {
    geraet: 'keins',
    bodenHaftung: false,
    start: {
      huefteL: [-46, 0, 4], huefteR: [22, 0, -4], knieL: [72, 0, 0], knieR: [30, 0, 0],
      fussgelenkL: [-14, 0, 0], fussgelenkR: [26, 0, 0], rumpf: [12, 0, 0],
      schulterL: [34, 0, 10], schulterR: [-38, 0, -10], ellbogenL: [-82, 0, 0], ellbogenR: [-82, 0, 0],
    },
    ende: {
      huefteL: [22, 0, 4], huefteR: [-46, 0, -4], knieL: [30, 0, 0], knieR: [72, 0, 0],
      fussgelenkL: [26, 0, 0], fussgelenkR: [-14, 0, 0],
      schulterL: [-38, 0, 10], schulterR: [34, 0, -10],
    },
    kamera: { winkel: -40, schwung: 16 },
  },
  rudern_geraet: {
    geraet: 'maschine',
    bodenHaftung: false,
    wurzelPos: [0, 0.36, 0.20],
    start: {
      huefteL: [-104, 0, 5], huefteR: [-104, 0, -5], knieL: [112, 0, 0], knieR: [112, 0, 0],
      rumpf: [28, 0, 0], schulterL: [-76, 0, 8], schulterR: [-76, 0, -8],
      ellbogenL: [-10, 0, 0], ellbogenR: [-10, 0, 0],
    },
    ende: {
      huefteL: [-18, 0, 5], huefteR: [-18, 0, -5], knieL: [16, 0, 0], knieR: [16, 0, 0],
      rumpf: [-14, 0, 0], schulterL: [-8, 0, 12], schulterR: [-8, 0, -12],
      ellbogenL: [-104, 0, 0], ellbogenR: [-104, 0, 0],
    },
    kamera: { winkel: -62, schwung: 14 },
  },
  schwung: {
    geraet: 'kurzhantel',
    start: {
      rumpf: [58, 0, 0], huefteL: [-34, 0, 4], huefteR: [-34, 0, -4], knieL: [42, 0, 0], knieR: [42, 0, 0],
      schulterL: [-38, 0, 6], schulterR: [-38, 0, -6], ellbogenL: [-8, 0, 0], ellbogenR: [-8, 0, 0],
    },
    ende: {
      rumpf: [-4, 0, 0], huefteL: [0, 0, 3], huefteR: [0, 0, -3], knieL: [4, 0, 0], knieR: [4, 0, 0],
      schulterL: [-88, 0, 8], schulterR: [-88, 0, -8],
    },
    kamera: { winkel: -46, schwung: 16 },
  },
  // Statische Uebungen (Farmer's Walk, Plate Pinch): minimale Bewegung, damit
  // das Standbild nicht wie ein Fehler aussieht.
  halten: {
    geraet: 'kurzhantel',
    start: { ...STAND, ...ARME_UNTEN, rumpf: [1, 0, 0] },
    ende: { rumpf: [-1, 0, 0], schulterL: [-4, 0, 9], schulterR: [-4, 0, -9] },
    kamera: { winkel: -36, schwung: 20 },
  },
};
