// „Mehr von WellApps": die anderen Apps desselben Studios.
//
// ⚠ Diese Liste wird in ALLEN sieben Apps identisch gepflegt (gleiche ids,
// gleiche Reihenfolge, gleiche Store-IDs). Kommt eine App dazu: hier eine Zeile,
// ein Symbol `src/assets/wellapps/<id>.webp` (144×144) und die Kurzzeile
// `wellapps.tagline.<id>` in JEDER Sprachdatei — und dasselbe in den anderen Apps.
//
// Die Symbole liegen im Bündel (offline), es wird nichts von fremden Servern
// geladen und kein Klick gezählt.
import { Capacitor } from '@capacitor/core';
import mahjong from '../assets/wellapps/mahjong.webp';
import fixthemix from '../assets/wellapps/fixthemix.webp';
import anigosha from '../assets/wellapps/anigosha.webp';
import swaply from '../assets/wellapps/swaply.webp';
import weltgeschichte from '../assets/wellapps/weltgeschichte.webp';
import watten from '../assets/wellapps/watten.webp';

// Die eigene App steht nicht in ihrer eigenen Liste.
export const EIGENE_APP = 'fullrep';

// `nameKey`: nur Weltgeschichte heißt je Sprache anders; alle anderen Namen
// sind Marken und bleiben unübersetzt.
export const WELLAPPS = [
  { id: 'mahjong', name: 'Mahjong Royale', appStoreId: '6787721454', androidPaket: 'com.mahjongroyale.app', symbol: mahjong },
  { id: 'fixthemix', name: 'FixTheMix', appStoreId: '6818787934', androidPaket: 'at.gallab.fixthemix', symbol: fixthemix },
  { id: 'anigosha', name: 'Anigosha', appStoreId: '6797757350', androidPaket: 'at.gallab.animequiz', symbol: anigosha },
  { id: 'swaply', name: 'Swaply', appStoreId: '6787695557', androidPaket: 'at.gallab.swaply', symbol: swaply },
  { id: 'weltgeschichte', nameKey: 'wellapps.worldHistory', appStoreId: '6811862606', androidPaket: 'de.almaz.weltgeschichte', symbol: weltgeschichte },
  { id: 'watten', name: 'Watten & Schnapsen', appStoreId: '6800774882', androidPaket: 'at.doppeldeutsch.karten', symbol: watten },
  { id: 'fullrep', name: 'FullRep', appStoreId: '6788461300', androidPaket: 'at.gallab.mypeak', symbol: null },
].filter((a) => a.id !== EIGENE_APP);

// iOS = native iOS-App oder ein iPhone/iPad-Browser. iPadOS meldet sich als
// „Macintosh" — erkennbar nur an den Berührungspunkten.
export function istIOS(plattform = Capacitor.getPlatform(), nav = globalThis.navigator) {
  if (plattform === 'ios') return true;
  if (plattform === 'android') return false;
  const ua = nav?.userAgent || '';
  return /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && (nav?.maxTouchPoints || 0) > 1);
}

export function storeLink(app, ios = istIOS()) {
  return ios
    ? `https://apps.apple.com/app/id${app.appStoreId}`
    : `https://play.google.com/store/apps/details?id=${app.androidPaket}`;
}
