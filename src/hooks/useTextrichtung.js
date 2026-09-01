import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { appSprache, textrichtung } from '../lib/sprache';

// Setzt `lang` und `dir` am <html>-Element.
//
// **Warum am <html> und nicht an einem Container?** Tailwinds `rtl:`-Varianten
// und die logischen Eigenschaften (`ms-`, `pe-`, `start-`) richten sich nach
// der Textrichtung des nächsten Vorfahren, der eine hat. Steht `dir` nur an
// einem <div> weiter innen, bleiben alle Elemente darüber — Overlays, Modals
// und `position: fixed`-Leisten, die im Portal am <body> hängen — auf LTR.
// Genau die fallen dann als einzige aus der Spiegelung heraus.
//
// `lang` ist kein Beiwerk: Danach richten sich Silbentrennung, die Auswahl der
// Systemschrift (arabische Glyphen) und Screenreader-Aussprache.
export function useTextrichtung() {
  const { i18n } = useTranslation();
  const sprache = appSprache(i18n.language);

  useEffect(() => {
    const wurzel = document.documentElement;
    wurzel.lang = sprache;
    wurzel.dir = textrichtung(sprache);
  }, [sprache]);

  return sprache;
}

export default useTextrichtung;
