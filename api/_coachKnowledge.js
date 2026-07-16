// Coach-Wissensbasis (kuratiert, mit Quellen). EINZIGE Wissensquelle des
// KI-Coaches zur Laufzeit — kein Live-Web-Zugriff. Kompakte "Briefs" pro Thema,
// aus denen das Retrieval (api/coach.js) die 2–3 passenden in den System-Prompt
// injiziert.
//
// Diese Datei wird monatlich per Cron-Job (docs/coach-knowledge-refresh.md)
// auf aktuellen Studienstand gebracht (PR → Review → Merge). Unterstrich-Prefix
// => keine Vercel-Route, nur importierbar.
//
// Schema pro Eintrag:
//   { id, category, keywords: [de/en Synonyme, lowercase],
//     briefDE, briefEN, sources: ["Autor Jahr, Journal", …] }

const coachKnowledge = [
  // ── Supplemente ────────────────────────────────────────────────
  {
    id: 'creatine',
    category: 'supplement',
    keywords: ['kreatin', 'creatine', 'monohydrat', 'monohydrate', 'creapure', 'kre-alkalyn'],
    briefDE: `Kreatin-Monohydrat ist das am besten belegte Supplement für Kraft und Muskelaufbau. 3–5 g täglich, dauerhaft — Timing egal; eine Ladephase (20 g/Tag über 5–7 Tage) füllt die Speicher schneller, ist aber optional. Wirkung: mehr Kraft und Wiederholungen bei kurzen, intensiven Belastungen, unterstützt Muskelwachstum; zunehmend auch für Kognition untersucht. Sicher und gut verträglich; die Warnungen vor Nieren- oder Haarschäden sind bei gesunden Menschen nicht belegt. Ein leichter Gewichtsanstieg zu Beginn ist Wasser IN der Muskelzelle (voller, nicht aufgeschwemmt). Monohydrat ist die bevorzugte, günstigste Form — teurere Varianten bringen keinen belegten Mehrwert.`,
    briefEN: `Creatine monohydrate is the best-evidenced supplement for strength and muscle. 3–5 g daily, ongoing — timing irrelevant; an optional loading phase (20 g/day for 5–7 days) fills stores faster. Effect: more strength and reps in short, intense efforts, supports growth; increasingly studied for cognition too. Safe and well tolerated; kidney/hair-damage warnings are unsupported in healthy people. A slight early weight gain is water inside the muscle cell (fuller, not bloated). Monohydrate is the preferred, cheapest form — pricier variants add no proven benefit.`,
    sources: ['Kreider et al. 2017, Journal of the International Society of Sports Nutrition'],
  },
  {
    id: 'protein_powder',
    category: 'supplement',
    keywords: ['protein', 'eiweiss', 'eiweiß', 'whey', 'molke', 'casein', 'proteinpulver', 'protein powder', 'isolat', 'isolate'],
    briefDE: `Proteinpulver ist kein Wundermittel, sondern eine bequeme, günstige Proteinquelle, um das Tagesziel zu erreichen (Trainierende ~1,6–2,2 g/kg Körpergewicht/Tag). Whey wird schnell verdaut, ist leucinreich und regt die Muskelproteinsynthese stark an; Casein ist langsamer; pflanzliche Mischungen (Erbse/Reis) sind bei ausreichender Menge ähnlich wirksam und für Veganer geeignet. Es ergänzt normale Lebensmittel, ersetzt sie nicht. Für gesunde Menschen sicher; die Sorge um Nierenschäden gilt nur bei bestehender Nierenerkrankung. Bei Laktoseintoleranz Isolat oder pflanzlich wählen.`,
    briefEN: `Protein powder is not magic but a convenient, cheap protein source to hit the daily target (trainees ~1.6–2.2 g/kg/day). Whey digests fast, is leucine-rich and strongly stimulates muscle protein synthesis; casein is slower; plant blends (pea/rice) are similarly effective at adequate amounts and suit vegans. It complements whole foods, not replaces them. Safe for healthy people; kidney concerns apply only with existing kidney disease. With lactose intolerance choose isolate or plant-based.`,
    sources: ['Morton et al. 2018, British Journal of Sports Medicine', 'Devries et al. 2018, Journal of Nutrition'],
  },
  {
    id: 'caffeine',
    category: 'supplement',
    keywords: ['koffein', 'caffeine', 'kaffee', 'coffee', 'pre-workout', 'preworkout', 'booster'],
    briefDE: `Koffein ist eines der wirksamsten legalen Mittel zur Leistungssteigerung: es senkt das Ermüdungsempfinden und verbessert Fokus, Kraftausdauer und Ausdauerleistung. Übliche Dosis ~3–6 mg/kg Körpergewicht, 30–60 min vor der Belastung (75 kg ≈ 225–450 mg; eine Tasse Filterkaffee ~80–120 mg). Bei Empfindlichkeit niedrig starten. Halbwertszeit ~5–6 h → spätes Koffein stört den Schlaf, in den letzten 6–8 h vor dem Schlafen meiden. Bis ~400 mg/Tag für gesunde Erwachsene sicher; sehr hohe Dosen (v. a. reines Pulver) können gefährlich sein. Bei Herz-Kreislauf-Erkrankungen, Schwangerschaft oder Angststörungen Vorsicht/ärztliche Rücksprache.`,
    briefEN: `Caffeine is one of the most effective legal performance enhancers: it lowers perceived fatigue and improves focus, muscular endurance and endurance performance. Usual dose ~3–6 mg/kg body weight, 30–60 min before effort (75 kg ≈ 225–450 mg; a cup of filter coffee ~80–120 mg). Start low if sensitive. Half-life ~5–6 h → late caffeine disrupts sleep; avoid in the last 6–8 h before bed. Safe up to ~400 mg/day for healthy adults; very high doses (esp. pure powder) can be dangerous. Caution/medical advice with cardiovascular disease, pregnancy or anxiety disorders.`,
    sources: ['Grgic et al. 2020, British Journal of Sports Medicine'],
  },
  {
    id: 'omega3',
    category: 'supplement',
    keywords: ['omega-3', 'omega 3', 'omega3', 'fischöl', 'fischoel', 'fish oil', 'epa', 'dha', 'algenöl', 'algae oil'],
    briefDE: `Omega-3-Fettsäuren (EPA/DHA) sind essenziell und wirken entzündungsregulierend; am besten belegt ist der Nutzen für Herz-Kreislauf-Gesundheit (senken Triglyceride). Beste Quelle: fetter Fisch (Lachs, Makrele, Hering) 2–3×/Woche. Wer wenig Fisch isst, kann ~1–2 g EPA+DHA/Tag supplementieren; Veganer über Algenöl (pflanzliches ALA wird nur begrenzt in EPA/DHA umgewandelt). Auf tatsächlichen EPA-/DHA-Gehalt und Frische achten. In sehr hohen Dosen kann Omega-3 die Blutgerinnung beeinflussen — bei Blutverdünnern oder vor OPs ärztlich abklären.`,
    briefEN: `Omega-3 fatty acids (EPA/DHA) are essential and anti-inflammatory; best-established benefit is cardiovascular health (lower triglycerides). Best source: oily fish (salmon, mackerel, herring) 2–3×/week. Low-fish eaters can supplement ~1–2 g EPA+DHA/day; vegans via algae oil (plant ALA converts only limitedly to EPA/DHA). Check actual EPA/DHA content and freshness. At very high doses omega-3 can affect blood clotting — clarify with a doctor if on blood thinners or before surgery.`,
    sources: ['Understanding fish-oil evidence; ISSN reviews'],
  },
  {
    id: 'vitamin_d',
    category: 'supplement',
    keywords: ['vitamin d', 'vitamin-d', 'vitamind', 'd3', 'cholecalciferol', 'sonnenvitamin', 'vitamin d3'],
    briefDE: `Vitamin D wirkt wie ein Hormon (Kalziumstoffwechsel, Knochen, Muskeln, Immunsystem). Wird v. a. über Sonnenlicht gebildet → Mangel ist besonders im Winter und in nördlichen Breiten häufig und über Nahrung allein schwer auszugleichen. Bei nachgewiesenem Mangel oft ~1000–2000 IE/Tag (Vitamin D3, zu einer fetthaltigen Mahlzeit). Dosis idealerweise über den Blutwert (25-OH-D) steuern: messen, supplementieren, nach einigen Monaten kontrollieren. Weil fettlöslich und speicherbar: „mehr ist besser" gilt NICHT — sehr hohe Dosen über lange Zeit können zu gefährlichem Kalziumüberschuss führen; hohe Dosen ärztlich begleiten. Oft mit Vitamin K2 kombiniert (unterstützt Kalzium-Lenkung; Evidenz vielversprechend, nicht abschließend).`,
    briefEN: `Vitamin D acts like a hormone (calcium metabolism, bones, muscles, immune system). Formed mainly via sunlight → deficiency is common in winter/northern latitudes and hard to fix by food alone. With proven deficiency often ~1000–2000 IU/day (vitamin D3, with a fat-containing meal). Ideally guide the dose by the blood value (25-OH-D): measure, supplement, recheck after a few months. Because it is fat-soluble and stored, "more is better" does NOT apply — very high long-term doses can cause dangerous calcium excess; supervise high doses medically. Often combined with vitamin K2 (supports calcium routing; evidence promising, not conclusive).`,
    sources: ['Endocrine Society / DGE reference ranges'],
  },
  {
    id: 'magnesium',
    category: 'supplement',
    keywords: ['magnesium', 'magnesiumcitrat', 'citrat', 'glycinat', 'glycinate', 'oxid', 'oxide', 'zma'],
    briefDE: `Magnesium ist an über 300 Enzymreaktionen beteiligt (Muskel-/Nervenfunktion, Energiestoffwechsel, Schlaf, Knochen). Bedarf Erwachsene ~300–400 mg/Tag; gut deckbar über Nüsse, Samen, Vollkorn, Hülsenfrüchte, grünes Gemüse. Ein leichter Mangel ist bei einseitiger Ernährung verbreitet und kann sich in Krämpfen, Müdigkeit, schlechterem Schlaf zeigen. Als Supplement gut verträglich sind organische Formen (Citrat, Glycinat, Malat); Oxid ist billig, schlechter aufnehmbar und wirkt eher abführend. Übliche Ergänzung ~200–400 mg elementar/Tag, oft abends (entspannend). Zu hohe Dosen → weicher Stuhl/Durchfall (Menge reduzieren). Bei eingeschränkter Nierenfunktion nur nach ärztlicher Rücksprache.`,
    briefEN: `Magnesium is involved in 300+ enzyme reactions (muscle/nerve function, energy metabolism, sleep, bones). Adult need ~300–400 mg/day; well covered by nuts, seeds, whole grains, legumes, greens. Mild deficiency is common with one-sided diets and can show as cramps, fatigue, poorer sleep. Well-tolerated supplement forms are organic (citrate, glycinate, malate); oxide is cheap, poorly absorbed and laxative. Common dose ~200–400 mg elemental/day, often evenings (relaxing). Too much → soft stools/diarrhea (reduce). With impaired kidney function only after medical advice.`,
    sources: ['DGE / NIH magnesium fact sheet'],
  },

  // ── Wechselwirkungen & Kombinationen ───────────────────────────
  {
    id: 'supplement_combinations',
    category: 'combination',
    keywords: ['kombination', 'kombinieren', 'combination', 'combine', 'stack', 'stacken', 'zusammen', 'together', 'wechselwirkung', 'wechselwirkungen', 'interaction', 'interactions', 'gleichzeitig'],
    briefDE: `Sinnvolle Kombinationen: Koffein + Kreatin ist unproblematisch und für Training beliebt (ältere „Koffein hebt Kreatin auf"-Sorge gilt als überholt); Vitamin D + K2 ergänzen sich; Eisen + Vitamin C verbessert die Aufnahme von pflanzlichem Eisen; Protein rund ums Training + Kreatin ist ein solider Basis-Stack. Ungünstige/konkurrierende Kombis: Kalzium hemmt die Eisenaufnahme (getrennt einnehmen); hohe Zink-Dosen können langfristig die Kupferaufnahme senken (nicht dauerhaft hoch dosieren); Zink und Eisen in hohen Dosen konkurrieren → zeitlich trennen; Kaffee/Tee (Tannine) direkt zur eisenreichen Mahlzeit hemmen die Eisenaufnahme. Faustregeln: fettlösliche Vitamine (A, D, E, K) zu einer fetthaltigen Mahlzeit; konkurrierende Mineralstoffe (Kalzium/Eisen/Zink) über den Tag verteilen statt alle zusammen. Bei Medikamenten oder Erkrankungen Wechselwirkungen ärztlich/apothekerlich abklären.`,
    briefEN: `Sensible combinations: caffeine + creatine is fine and popular for training (the old "caffeine cancels creatine" worry is considered outdated); vitamin D + K2 complement each other; iron + vitamin C improves absorption of plant iron; protein around training + creatine is a solid base stack. Unfavourable/competing combos: calcium inhibits iron absorption (take separately); high zinc long-term can lower copper uptake (don't dose high permanently); zinc and iron in high doses compete → separate in time; coffee/tea (tannins) with an iron-rich meal inhibit iron uptake. Rules of thumb: fat-soluble vitamins (A, D, E, K) with a fatty meal; spread competing minerals (calcium/iron/zinc) across the day rather than all together. With medication or illness, clarify interactions with a doctor/pharmacist.`,
    sources: ['NIH mineral interaction fact sheets', 'Trexler et al. 2015, JISSN (caffeine/creatine)'],
  },

  // ── Blutwerte (grobe Einordnung, immer mit Arzt-Verweis) ───────
  {
    id: 'bw_testosterone',
    category: 'bloodwork',
    keywords: ['testosteron', 'testosterone', 'gesamttestosteron', 'freies testosteron', 'total testosterone'],
    briefDE: `Testosteron ist das wichtigste anabole Hormon (Muskel, Knochen, Libido, Antrieb). Gemessen wird meist Gesamttestosteron (aussagekräftig zusätzlich freies T), am Morgen abgenommen. Referenzbereiche variieren je Labor/Alter; grob liegt Gesamttestosteron bei Männern oft ~300–1000 ng/dl. Ein Einzelwert ist nur eine Momentaufnahme (Schlaf, Stress, Tageszeit beeinflussen ihn). Natürlich günstig: gesundes Körpergewicht, ausreichend Schlaf, Krafttraining, genug Nahrungsfett + Mikronährstoffe (Zink, Vitamin D), Stressmanagement. „Testo-Booster" zeigen bei normalen Werten meist keinen relevanten Effekt. Auffällige Werte/Symptome gehören ärztlich abgeklärt — dies ersetzt keine ärztliche Beurteilung.`,
    briefEN: `Testosterone is the main anabolic hormone (muscle, bone, libido, drive). Usually total testosterone is measured (free T is additionally informative), drawn in the morning. Reference ranges vary by lab/age; roughly, total testosterone in men is often ~300–1000 ng/dl. A single value is only a snapshot (sleep, stress, time of day affect it). Naturally favourable: healthy body weight, enough sleep, strength training, adequate dietary fat + micronutrients (zinc, vitamin D), stress management. "Testo boosters" usually show no relevant effect at normal levels. Abnormal values/symptoms belong with a doctor — this does not replace a medical assessment.`,
    sources: ['Leproult & Van Cauter 2011, JAMA (sleep & testosterone)'],
  },
  {
    id: 'bw_vitamin_d',
    category: 'bloodwork',
    keywords: ['25-oh', '25 oh', 'vitamin d wert', 'vitamin-d-spiegel', 'vitamin d blood', 'calcidiol'],
    briefDE: `Der Vitamin-D-Status wird über 25-OH-Vitamin-D im Blut bestimmt (Speicherform, robust über Wochen). Grobe Orientierung vieler Labore: unter ~20 ng/ml (50 nmol/l) gilt als Mangel, darüber als ausreichend — die genauen Grenzen werden fachlich diskutiert. Ein sehr niedriger Wert kann unspezifische Beschwerden (Müdigkeit, Muskelschwäche, häufige Infekte) mit erklären. Verbessern: Sonnenlicht, fetter Fisch/Eigelb/angereicherte Produkte, bei Mangel Vitamin D3 — Dosis über Kontroll-Blutwert steuern. Weil speicherbar: keine unkontrollierte Hochdosierung. Bewertung und Zielwert legt der Arzt fest.`,
    briefEN: `Vitamin D status is measured via 25-OH vitamin D in blood (storage form, robust over weeks). Rough guide many labs use: below ~20 ng/ml (50 nmol/l) is deficiency, above is adequate — exact limits are debated. A very low value can partly explain non-specific complaints (fatigue, muscle weakness, frequent infections). Improve: sunlight, oily fish/egg yolk/fortified foods, vitamin D3 if deficient — guide the dose by a follow-up blood value. Because it is storable, avoid uncontrolled high dosing. The doctor sets the assessment and target.`,
    sources: ['Endocrine Society vitamin D guideline'],
  },
  {
    id: 'bw_iron_ferritin',
    category: 'bloodwork',
    keywords: ['eisen', 'iron', 'ferritin', 'transferrin', 'hämoglobin', 'haemoglobin', 'anämie', 'anemia'],
    briefDE: `Eisen ist zentral für den Sauerstofftransport (Hämoglobin); Mangel macht müde, blass, kurzatmig und senkt die Leistung. Wichtigster Frühmarker ist Ferritin (Speichereisen) — sinkt oft, bevor das Hämoglobin auffällt; ergänzend Transferrin/Transferrinsättigung. Achtung: Ferritin steigt bei Entzündungen und kann dann einen Mangel maskieren → immer im Gesamtbild ärztlich deuten. Risikogruppen: menstruierende Frauen, Ausdauersportler, vegetarisch/vegan. Ernährung: rotes Fleisch liefert gut verwertbares Häm-Eisen; pflanzliches Eisen + Vitamin C verbessert die Aufnahme, Kaffee/Tee/Kalzium zur Mahlzeit hemmen sie. Eisenpräparate NUR bei nachgewiesenem Mangel (Überschuss ist schädlich) — Diagnose, Dosis und Ursachensuche gehören zum Arzt.`,
    briefEN: `Iron is central to oxygen transport (haemoglobin); deficiency causes fatigue, pallor, breathlessness and lowers performance. The key early marker is ferritin (stored iron) — often drops before haemoglobin does; add transferrin/transferrin saturation. Note: ferritin rises with inflammation and can mask a deficiency → always interpret medically in the overall picture. Risk groups: menstruating women, endurance athletes, vegetarian/vegan. Diet: red meat provides well-usable haem iron; plant iron + vitamin C improves uptake, coffee/tea/calcium with the meal inhibit it. Iron supplements ONLY with proven deficiency (excess is harmful) — diagnosis, dose and cause belong with a doctor.`,
    sources: ['WHO iron deficiency guidance'],
  },
  {
    id: 'bw_cholesterol',
    category: 'bloodwork',
    keywords: ['cholesterin', 'cholesterol', 'ldl', 'hdl', 'triglyceride', 'triglycerides', 'blutfette', 'lipide', 'lipid'],
    briefDE: `Das Lipidprofil (Gesamtcholesterin, LDL, HDL, Triglyceride) ist ein zentraler Marker für die Herz-Kreislauf-Gesundheit. Dauerhaft erhöhtes LDL ist mit mehr Gefäßablagerungen verbunden („ungünstig"), HDL gilt als eher „günstig"; erhöhte Triglyceride hängen oft mit Übergewicht, viel Zucker und Bewegungsmangel zusammen. Bewertung immer im Gesamtrisiko (Blutdruck, Rauchen, Zucker, Familie), nicht an einer Einzelzahl. Lebensstil-Hebel: ballaststoffreiche Kost, ungesättigte statt gesättigte Fette, Bewegung, gesundes Gewicht, Transfette meiden. Ein Teil ist genetisch und trotz gesundem Lebensstil erhöht — ob/wie behandelt wird (z. B. Statine), entscheidet der Arzt.`,
    briefEN: `The lipid profile (total cholesterol, LDL, HDL, triglycerides) is a central marker of cardiovascular health. Persistently high LDL is linked to more vascular deposits ("unfavourable"); HDL is considered rather "favourable"; high triglycerides often relate to excess weight, high sugar and inactivity. Always assess within overall risk (blood pressure, smoking, sugar, family), not a single number. Lifestyle levers: fibre-rich diet, unsaturated over saturated fats, exercise, healthy weight, avoid trans fats. Some is genetic and elevated despite a healthy lifestyle — whether/how to treat (e.g. statins) is the doctor's decision.`,
    sources: ['ESC/EAS dyslipidaemia guidelines'],
  },
  {
    id: 'bw_blood_sugar',
    category: 'bloodwork',
    keywords: ['blutzucker', 'blood sugar', 'glukose', 'glucose', 'hba1c', 'nüchternzucker', 'insulin', 'prädiabetes', 'prediabetes', 'diabetes'],
    briefDE: `Blutzucker (Glukose) und der Langzeitwert HbA1c zeigen, wie gut der Körper Zucker verarbeitet. Nüchternblutzucker ist eine Momentaufnahme; HbA1c spiegelt den Durchschnitt der letzten ~2–3 Monate und ist robuster. Erhöhte Werte können auf Prädiabetes oder Diabetes hinweisen (genaue Grenzwerte legt der Arzt fest). Stark beeinflussbar durch Lebensstil: ballaststoffreiche Kost, weniger Zucker/zuckergesüßte Getränke/Weißmehl, Bewegung (Kraft- UND Ausdauertraining verbessern die Insulinempfindlichkeit — Muskeln nehmen Glukose auf), gesundes Gewicht, ein Spaziergang nach dem Essen dämpft den Anstieg. Ein gestörter Zuckerstoffwechsel macht lange keine Symptome — Früherkennung ist wertvoll. Auffällige Werte ärztlich abklären.`,
    briefEN: `Blood sugar (glucose) and the long-term value HbA1c show how well the body processes sugar. Fasting glucose is a snapshot; HbA1c reflects the average of the last ~2–3 months and is more robust. Elevated values can indicate prediabetes or diabetes (exact cutoffs are set by the doctor). Strongly lifestyle-influenced: fibre-rich diet, less sugar/sugary drinks/white flour, exercise (strength AND endurance improve insulin sensitivity — muscles take up glucose), healthy weight, a walk after eating dampens the rise. Disturbed sugar metabolism causes no symptoms for a long time — early detection is valuable. Clarify abnormal values medically.`,
    sources: ['ADA Standards of Care'],
  },
  {
    id: 'bw_thyroid',
    category: 'bloodwork',
    keywords: ['schilddrüse', 'schilddruese', 'thyroid', 'tsh', 'ft3', 'ft4', 'hashimoto', 'unterfunktion', 'überfunktion', 'hypothyreose'],
    briefDE: `Die Schilddrüse steuert über ihre Hormone (T3/T4) Stoffwechsel, Energie, Körpertemperatur und mehr. Wichtigster Suchtest ist TSH: ein hoher TSH deutet oft auf eine Unterfunktion, ein niedriger auf eine Überfunktion (Regelkreis mit dem Gehirn). Bei auffälligem TSH folgen fT3/fT4 und ggf. Antikörper (z. B. Hashimoto). Symptome sind unspezifisch — Unterfunktion: Müdigkeit, Gewichtszunahme, Kälteempfinden; Überfunktion: Nervosität, Herzrasen, Gewichtsverlust. Eine ausreichende Jodversorgung unterstützt die normale Funktion, aber eine echte Funktionsstörung braucht eine gezielte medizinische Behandlung (oft Hormonpräparate) — nicht „wegtrainierbar". Auffällige Werte/Symptome immer ärztlich abklären.`,
    briefEN: `The thyroid controls metabolism, energy, body temperature and more via its hormones (T3/T4). The key screening test is TSH: high TSH often indicates underactivity, low TSH overactivity (feedback loop with the brain). If TSH is abnormal, fT3/fT4 and possibly antibodies (e.g. Hashimoto's) follow. Symptoms are non-specific — underactivity: fatigue, weight gain, cold sensitivity; overactivity: nervousness, palpitations, weight loss. Adequate iodine supports normal function, but a true disorder needs targeted medical treatment (often hormone medication) — not "trainable away". Always clarify abnormal values/symptoms with a doctor.`,
    sources: ['ATA thyroid function guidelines'],
  },
];

export default coachKnowledge;
