# KI-Coach Wissens-Update — Monatliches Playbook

**Zweck:** Die Wissensbasis des KI-Coaches (`api/_coachKnowledge.js`) einmal pro Monat auf den
aktuellen Studienstand bringen. Diese Session läuft unter dem Claude-Abo (keine metered-API-Kosten).
Der Coach greift **ausschließlich** auf diese Datei zu (kein Live-Web zur Laufzeit), deshalb ist die
Qualität dieser Datei entscheidend.

**Wichtig:** Am Ende einen **PR gegen `main` öffnen — NICHT mergen**. Der Mensch reviewt den Diff und
merged selbst. So gelangt kein automatisch generierter Inhalt ungeprüft in die Produktion.

---

## Ablauf

### 1. Branch anlegen
```
git fetch origin main
git checkout -B coach-knowledge-refresh-<JJJJ-MM> origin/main
```
(`<JJJJ-MM>` = aktuelles Jahr-Monat, z. B. `2026-08`.)

### 2. Bestandsaufnahme
- Lies `api/_coachKnowledge.js` vollständig. Verschaffe dir einen Überblick über die vorhandenen
  Einträge, ihre `briefDE`/`briefEN` und die `sources`.
- Struktur pro Eintrag (nicht verändern):
  ```
  { id, category, keywords: [de/en Synonyme, lowercase], briefDE, briefEN, sources: ["Autor Jahr, Journal", …] }
  ```

### 3. Recherche (WebSearch / WebFetch)
Recherchiere für **jeden** Themenblock aktuelle, seriöse Evidenz. **Bevorzuge**:
- Meta-Analysen und systematische Reviews (höchste Evidenzstufe),
- Positionspapiere anerkannter Fachgesellschaften (ISSN, ACSM, DGE, EFSA),
- Publikationen in etablierten, peer-reviewten Journals (z. B. *J Int Soc Sports Nutr*,
  *Med Sci Sports Exerc*, *Am J Clin Nutr*, *Nutrients*, *Sports Medicine*).

**Meide**: Blogs, Hersteller-Seiten, Foren, Vorab-Drucke ohne Peer-Review, Boulevard-Gesundheitsseiten.

Themenblöcke (mindestens diese abdecken — bestehende Einträge in `_coachKnowledge.js` sind die Referenz):
- **Supplemente:** Kreatin, Whey/Protein, Koffein, Omega-3, Vitamin D, Magnesium.
- **Supplement-Wechselwirkungen/Kombinationen:** z. B. Koffein+Kreatin, Vitamin D+K2, Eisen+Vitamin C,
  Kalzium↔Eisen, Zink↔Kupfer, Zink↔Eisen, Tannine/Kaffee↔Eisen.
- **Blutwerte (grobe Einordnung):** Testosteron, Vitamin D (25-OH), Eisen/Ferritin, Cholesterin,
  Blutzucker/HbA1c, Schilddrüse (TSH).

### 4. `api/_coachKnowledge.js` aktualisieren
- **Briefs auffrischen:** Wo neue Evidenz die Aussage präzisiert/ändert, `briefDE` **und** `briefEN`
  anpassen (inhaltlich synchron halten). Länge pro Brief ~150–300 Wörter, coach-fertig: Wirkung,
  praktische Anwendung, Wechselwirkungen/Kombinationen, wichtige Caveats.
- **Quellen aktualisieren:** `sources` auf die zitierten aktuellen Arbeiten bringen. Format:
  `"Autor et al. Jahr, Journal"`. **Niemals Quellen erfinden** — nur real gefundene, verifizierte
  Arbeiten eintragen.
- **Neue relevante Supplemente/Marker** ergänzen, wenn sich starke, breit belegte Evidenz zeigt
  (neuer Eintrag mit vollständigem Schema, `keywords` in DE+EN lowercase).
- **Keine** medizinischen Diagnosen, **keine** Dosierungen für verschreibungspflichtige/verbotene
  Substanzen. Blutwert-Einträge bleiben grobe Einordnung + Arzt-Verweis.
- Umlaute korrekt (ä/ö/ü, nicht ae/oe/ue). Nur ASCII-Buchstaben + echte Umlaute, keine kyrillischen
  Homoglyphen.

### 5. Verifizieren
```
npx eslint api/_coachKnowledge.js api/coach.js
npm run build
```
Optional Retrieval-Check (muss die passenden Einträge liefern):
```
node --input-type=module -e "
import kb from './api/_coachKnowledge.js';
console.log('entries:', kb.length);
"
```
Beides muss grün sein.

### 6. PR öffnen (NICHT mergen)
```
git add api/_coachKnowledge.js
git commit -m 'Coach-Wissensbasis: Studien-Update <JJJJ-MM>'
git push -u origin coach-knowledge-refresh-<JJJJ-MM>
```
Dann PR gegen `main` erstellen. PR-Body: knappe Zusammenfassung, **was** sich geändert hat und
**welche neuen Studien** die Änderungen tragen (pro Themenblock 1–2 Sätze). **Nicht mergen** — der
Mensch reviewt und merged.

---

## Leitplanken
- Reine Datei-Pflege — **keine** Änderung an `api/coach.js`-Logik, Retrieval oder Prompt, außer der
  Mensch verlangt es ausdrücklich.
- Im Zweifel konservativ: lieber eine Aussage weglassen als schwach belegt aufnehmen.
- Wenn ein Thema keine belastbare neue Evidenz hat: Eintrag unverändert lassen (kein „Update um des
  Updates willen").
