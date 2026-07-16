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
  {
    id: 'beta_alanine',
    category: 'supplement',
    keywords: ['beta-alanin', 'beta alanin', 'beta-alanine', 'beta alanine', 'carnosin', 'carnosine', 'kribbeln', 'tingling'],
    briefDE: `Beta-Alanin erhöht über den Muskel-Speicherstoff Carnosin die Pufferkapazität gegen Übersäuerung. Nutzen vor allem bei hochintensiven Belastungen von ~1–4 Minuten (intensive Sätze, 400–1500 m, HIIT) — klein, aber real. Es wirkt NICHT akut, sondern durch Aufsättigung über Wochen: ~3–5 g täglich über mindestens 4 Wochen, Timing egal, dauerhaft. Ein harmloses Hautkribbeln (Parästhesie) ist normal und lässt sich durch Aufteilen in kleinere Dosen oder Retard-Formen mindern. Kombiniert gut mit Kreatin. Bei reiner Maximalkraft (wenige Wiederholungen) oder langer Ausdauer ist der Effekt gering.`,
    briefEN: `Beta-alanine raises the muscle buffer carnosine and thus the capacity against acidosis. Benefit mainly in high-intensity efforts of ~1–4 minutes (hard sets, 400–1500 m, HIIT) — small but real. It does NOT work acutely but by saturating over weeks: ~3–5 g daily for at least 4 weeks, timing irrelevant, ongoing. A harmless skin tingling (paraesthesia) is normal and can be reduced by splitting into smaller doses or sustained-release forms. Combines well with creatine. For pure maximal strength (few reps) or long endurance the effect is small.`,
    sources: ['Trexler et al. 2015, Journal of the International Society of Sports Nutrition (ISSN position stand)'],
  },
  {
    id: 'citrulline',
    category: 'supplement',
    keywords: ['citrullin', 'citrulline', 'l-citrullin', 'citrullin-malat', 'citrulline malate', 'pump', 'stickstoffmonoxid', 'nitric oxide', 'no-booster'],
    briefDE: `L-Citrullin erhöht die Stickstoffmonoxid-Bildung und damit die Durchblutung („Pump"); es wird effektiver zu Arginin umgewandelt als Arginin selbst. Mögliche Effekte: etwas mehr Wiederholungen, geringeres Muskelkatern, subjektiv besserer Pump — die Datenlage ist gemischt und der Effekt moderat. Übliche Dosis ~6–8 g L-Citrullin (oder ~8 g Citrullin-Malat) etwa 30–60 min vor dem Training. Gut verträglich. Häufiger Bestandteil von Pre-Workouts und unproblematisch mit Koffein/Beta-Alanin kombinierbar — sinnvoll ergänzend, aber kein Muss.`,
    briefEN: `L-citrulline raises nitric-oxide production and thus blood flow ("pump"); it converts to arginine more effectively than arginine itself. Possible effects: a few more reps, less soreness, a subjectively better pump — evidence is mixed and the effect moderate. Usual dose ~6–8 g L-citrulline (or ~8 g citrulline malate) about 30–60 min before training. Well tolerated. A common pre-workout ingredient, fine to stack with caffeine/beta-alanine — a useful add-on, not a must.`,
    sources: ['Gonzalez & Trexler 2020, Strength and Conditioning Journal (citrulline review)'],
  },
  {
    id: 'ashwagandha',
    category: 'supplement',
    keywords: ['ashwagandha', 'withania', 'adaptogen', 'ksm-66', 'ksm66'],
    briefDE: `Ashwagandha ist ein pflanzliches Adaptogen. Studien deuten darauf hin, dass es Stress- und Cortisolempfinden senken und den Schlaf verbessern kann; einzelne Untersuchungen zeigen kleine Zuwächse bei Kraft und Erholung. Übliche Studiendosis ~300–600 mg standardisierter Wurzelextrakt (z. B. KSM-66) täglich. Meist gut verträglich, kann müde machen. Vorsicht bei Schilddrüsenerkrankungen, Autoimmunerkrankungen, Schwangerschaft/Stillzeit sowie zusammen mit Beruhigungs-/Schilddrüsenmedikamenten — dann ärztlich abklären. Qualität und Standardisierung schwanken stark zwischen Produkten.`,
    briefEN: `Ashwagandha is a plant adaptogen. Studies suggest it can lower perceived stress and cortisol and improve sleep; some show small gains in strength and recovery. Typical study dose ~300–600 mg standardized root extract (e.g. KSM-66) daily. Usually well tolerated, can cause drowsiness. Caution with thyroid disease, autoimmune conditions, pregnancy/breastfeeding, and alongside sedative/thyroid medication — clarify medically. Quality and standardization vary widely between products.`,
    sources: ['Wankhede et al. 2015, Journal of the International Society of Sports Nutrition'],
  },
  {
    id: 'zinc',
    category: 'supplement',
    keywords: ['zink', 'zinc', 'spurenelement', 'trace mineral'],
    briefDE: `Zink ist ein essenzielles Spurenelement für Immunfunktion, Wundheilung, Hormonhaushalt (u. a. Testosteronstoffwechsel) und zahlreiche Enzyme. Bedarf Erwachsene ~10–15 mg/Tag; gute Quellen: Fleisch, Schalentiere, Kerne, Hülsenfrüchte, Käse. Ein Mangel (z. B. rein pflanzliche Ernährung, starkes Schwitzen) kann Immunschwäche und Müdigkeit begünstigen. Nur bei Bedarf und moderat supplementieren: dauerhaft hohe Dosen (>40 mg/Tag) senken die Kupferaufnahme und können schaden. Nicht zeitgleich mit hohen Eisen- oder Kalzium-Dosen einnehmen (Konkurrenz). Bei bereits normaler Versorgung hebt extra Zink das Testosteron nicht an.`,
    briefEN: `Zinc is an essential trace mineral for immune function, wound healing, hormone metabolism (incl. testosterone) and many enzymes. Adult need ~10–15 mg/day; good sources: meat, shellfish, seeds, legumes, cheese. Deficiency (e.g. fully plant-based diet, heavy sweating) can promote weakened immunity and fatigue. Supplement only if needed and moderately: chronic high doses (>40 mg/day) lower copper uptake and can harm. Don't take together with high iron or calcium doses (competition). At already-normal status, extra zinc does not raise testosterone.`,
    sources: ['NIH zinc fact sheet'],
  },
  {
    id: 'eaa_bcaa',
    category: 'supplement',
    keywords: ['bcaa', 'eaa', 'aminosäuren', 'aminosaeuren', 'amino acids', 'essenzielle aminosäuren', 'essential amino acids', 'leucin', 'leucine'],
    briefDE: `Für den Muskelaufbau zählt die gesamte Proteinzufuhr mit allen neun essenziellen Aminosäuren (EAA). EAA-Präparate liefern alle Bausteine und können die Muskelproteinsynthese anregen — sinnvoll aber fast nur, wenn die Proteinzufuhr sonst zu niedrig ist. BCAA (nur Leucin, Isoleucin, Valin) sind der schwächere Sonderfall: allein reichen sie NICHT für maximalen Muskelaufbau, weil die übrigen EAA fehlen; wer genug Protein bzw. Whey isst, braucht sie nicht. Kurz: zuerst das Gesamtprotein decken (~1,6–2,2 g/kg/Tag); EAA höchstens ergänzend (z. B. langes Nüchterntraining), BCAA meist überflüssig.`,
    briefEN: `For building muscle, total protein intake with all nine essential amino acids (EAA) is what counts. EAA products supply every building block and can stimulate muscle protein synthesis — but are really only useful when protein intake is otherwise too low. BCAAs (only leucine, isoleucine, valine) are the weaker special case: alone they do NOT suffice for maximal muscle growth because the other EAAs are missing; anyone eating enough protein/whey doesn't need them. In short: cover total protein first (~1.6–2.2 g/kg/day); EAAs at most as an add-on (e.g. long fasted training), BCAAs usually redundant.`,
    sources: ['Jäger et al. 2017, JISSN (ISSN protein position stand)', 'Wolfe 2017, JISSN (BCAA: myth or reality)'],
  },
  {
    id: 'beetroot_nitrate',
    category: 'supplement',
    keywords: ['nitrat', 'nitrate', 'rote bete', 'rote beete', 'beetroot', 'randensaft', 'red beet', 'beet'],
    briefDE: `Nahrungsnitrat (v. a. aus Rote-Bete-Saft und grünem Blattgemüse) wird im Körper zu Stickstoffmonoxid und kann die Effizienz der Muskelarbeit und die Ausdauerleistung leicht verbessern — am ehesten bei submaximaler Ausdauer und bei weniger Trainierten. Übliche Anwendung: ~300–600 mg Nitrat (ein Konzentrat-„Shot" Rote Bete) etwa 2–3 h vor der Belastung. Gut verträglich; eine harmlose Rotfärbung von Urin/Stuhl ist möglich. Für reines Krafttraining ist der Nutzen gering. Antibakterielle Mundspülungen können den Effekt abschwächen, da sie die Nitrat-Umwandlung im Mund stören.`,
    briefEN: `Dietary nitrate (mainly from beetroot juice and leafy greens) converts to nitric oxide and can slightly improve muscle-work efficiency and endurance — most in submaximal endurance and in less-trained people. Typical use: ~300–600 mg nitrate (one concentrated beetroot "shot") about 2–3 h before effort. Well tolerated; harmless red discoloration of urine/stool is possible. For pure strength training the benefit is small. Antibacterial mouthwash can blunt the effect by disrupting nitrate conversion in the mouth.`,
    sources: ['Domínguez et al. 2017, Nutrients (beetroot juice & endurance, systematic review)'],
  },
  {
    id: 'collagen',
    category: 'supplement',
    keywords: ['kollagen', 'collagen', 'gelatine', 'kollagenpeptide', 'collagen peptides', 'gelenke', 'joints', 'sehnen', 'tendons', 'bänder', 'baender', 'ligaments'],
    briefDE: `Kollagenpeptide (bzw. Gelatine) liefern Bausteine für Bindegewebe — Sehnen, Bänder, Knorpel, Haut. Studien deuten an, dass ~10–15 g Kollagen zusammen mit Vitamin C, etwa 30–60 min vor gezielter Belastung eingenommen, die Anpassung von Sehnen/Bindegewebe unterstützen und Gelenkbeschwerden lindern können — die Evidenz ist vielversprechend, aber noch nicht abschließend. Für den reinen Muskelaufbau ist Kollagen KEIN gutes Protein (unvollständiges Aminosäureprofil, wenig Leucin) — dafür besser Whey/EAA. Sinnvoll eher gezielt für Gelenke/Sehnen, nicht als Haupt-Proteinquelle.`,
    briefEN: `Collagen peptides (or gelatin) provide building blocks for connective tissue — tendons, ligaments, cartilage, skin. Studies suggest ~10–15 g collagen with vitamin C, taken about 30–60 min before targeted loading, may support tendon/connective-tissue adaptation and ease joint complaints — evidence is promising but not conclusive. For pure muscle building collagen is NOT a good protein (incomplete amino-acid profile, low leucine) — use whey/EAA instead. Better used specifically for joints/tendons, not as a main protein source.`,
    sources: ['Reviews on collagen peptides & connective-tissue adaptation (e.g. Amino Acids / Sports Medicine)'],
  },
  {
    id: 'electrolytes',
    category: 'supplement',
    keywords: ['elektrolyte', 'electrolytes', 'natrium', 'sodium', 'salz', 'salt', 'kalium', 'potassium', 'hydration', 'hydratation', 'flüssigkeit', 'krämpfe', 'cramps'],
    briefDE: `Elektrolyte (vor allem Natrium, dazu Kalium, Magnesium, Chlorid) steuern Flüssigkeitshaushalt, Nerven- und Muskelfunktion. Beim Schwitzen gehen vor allem Natrium und Wasser verloren. Für normale Einheiten reicht meist Wasser plus normal gesalzenes Essen; erst bei langem/intensivem Schwitzen (>~1 h, Hitze, „Salty Sweater") lohnen elektrolythaltige Getränke, um Leistung und Konzentration zu halten. Muskelkrämpfe sind nur teils elektrolytbedingt (auch Ermüdung und Kondition spielen mit) — Elektrolyte sind kein sicheres Krampf-Heilmittel. Sehr hohe Natriumzufuhr ist bei Bluthochdruck ungünstig; im Alltag zählt Balance statt Extreme.`,
    briefEN: `Electrolytes (mainly sodium, plus potassium, magnesium, chloride) govern fluid balance and nerve/muscle function. Sweating mainly loses sodium and water. For normal sessions, water plus normally salted food usually suffices; only with long/intense sweating (>~1 h, heat, "salty sweater") do electrolyte drinks pay off to maintain performance and focus. Muscle cramps are only partly electrolyte-driven (fatigue and conditioning also matter) — electrolytes are not a reliable cramp cure. Very high sodium is unfavourable with high blood pressure; day to day, balance beats extremes.`,
    sources: ['ACSM position stand: Exercise and Fluid Replacement'],
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
  {
    id: 'bw_crp',
    category: 'bloodwork',
    keywords: ['crp', 'hs-crp', 'hscrp', 'c-reaktives protein', 'c reactive protein', 'entzündung', 'entzuendung', 'inflammation', 'entzündungswert'],
    briefDE: `CRP (C-reaktives Protein) ist ein unspezifischer Entzündungsmarker. Ein akut stark erhöhter Wert spricht für eine Entzündung oder Infektion; das hochsensitive hs-CRP wird zusätzlich als Marker für ein niedriggradiges Entzündungsniveau und kardiovaskuläres Risiko genutzt. Wichtig: CRP ist unspezifisch — ein kürzlich absolviertes hartes Training, ein Infekt oder eine Verletzung heben es vorübergehend an, deshalb nicht direkt nach intensiver Belastung interpretieren. Günstig beeinflussbar durch gesundes Gewicht, regelmäßige Bewegung, Nichtrauchen, gute Ernährung und ausreichend Schlaf. Ursache und Verlauf gehören ärztlich eingeordnet — dies ersetzt keine ärztliche Beurteilung.`,
    briefEN: `CRP (C-reactive protein) is a non-specific inflammation marker. An acutely high value points to inflammation or infection; high-sensitivity hs-CRP is additionally used as a marker of low-grade inflammation and cardiovascular risk. Important: CRP is non-specific — recent hard training, an infection or an injury raise it temporarily, so don't interpret it right after intense exercise. Favourably influenced by healthy weight, regular exercise, not smoking, good diet and enough sleep. Cause and course belong with a doctor — this does not replace a medical assessment.`,
    sources: ['AHA/CDC statement on hs-CRP and cardiovascular risk'],
  },
  {
    id: 'bw_liver',
    category: 'bloodwork',
    keywords: ['leberwerte', 'leber', 'liver', 'alt', 'ast', 'gpt', 'got', 'gamma-gt', 'ggt', 'transaminasen', 'transaminases'],
    briefDE: `Die Leberwerte (vor allem ALT/GPT, AST/GOT, GGT) zeigen, ob Leberzellen belastet oder geschädigt sind. Leicht erhöhte Werte sind häufig und oft harmlos-vorübergehend: intensives Training (besonders schweres Krafttraining) kann AST/ALT für einige Tage anheben, ebenso Alkohol, manche Medikamente/Supplemente oder eine Fettleber. Deshalb Werte möglichst nicht direkt nach hartem Training abnehmen. Deutlich oder dauerhaft erhöhte Werte gehören abgeklärt (mögliche Ursachen: Alkohol, Fettleber, Medikamente, Virushepatitis u. a.). Günstig: gesundes Gewicht, wenig Alkohol, wenig Zucker, Bewegung. Bewertung und Ursachensuche macht der Arzt.`,
    briefEN: `Liver values (mainly ALT/GPT, AST/GOT, GGT) show whether liver cells are stressed or damaged. Mildly elevated values are common and often harmless-transient: intense training (especially heavy lifting) can raise AST/ALT for a few days, as can alcohol, some medications/supplements or a fatty liver. So avoid drawing them right after hard training. Markedly or persistently high values need work-up (possible causes: alcohol, fatty liver, medication, viral hepatitis, etc.). Favourable: healthy weight, little alcohol, little sugar, exercise. The doctor does the assessment and cause-finding.`,
    sources: ['Clinical guidance on liver enzyme interpretation'],
  },
  {
    id: 'bw_kidney',
    category: 'bloodwork',
    keywords: ['nierenwerte', 'niere', 'kidney', 'kreatinin', 'creatinine', 'egfr', 'gfr', 'harnstoff', 'urea', 'cystatin'],
    briefDE: `Nierenwerte (Kreatinin, daraus die geschätzte Filtrationsrate eGFR, dazu Harnstoff und ggf. Cystatin C) zeigen, wie gut die Nieren filtern. Wichtig für Sportler: Kreatinin ist ein Abbauprodukt aus dem Muskel — viel Muskelmasse, eine fleischreiche Mahlzeit oder eine Kreatin-Einnahme können Kreatinin leicht anheben, OHNE dass die Niere geschädigt ist (die eGFR unterschätzt dann die echte Funktion). Kreatin-Supplemente schädigen gesunde Nieren nach aktueller Evidenz nicht. Dauerhaft auffällige Werte, besonders mit Bluthochdruck oder Diabetes, gehören ärztlich abgeklärt. Nierenfreundlich: Blutdruck und Blutzucker im Griff, ausreichend trinken. Die Deutung übernimmt der Arzt.`,
    briefEN: `Kidney values (creatinine, the derived estimated filtration rate eGFR, plus urea and possibly cystatin C) show how well the kidneys filter. Important for athletes: creatinine is a muscle breakdown product — high muscle mass, a meat-rich meal or creatine intake can raise creatinine slightly WITHOUT kidney damage (eGFR then underestimates true function). Per current evidence, creatine supplements do not harm healthy kidneys. Persistently abnormal values, especially with high blood pressure or diabetes, need medical work-up. Kidney-friendly: control blood pressure and blood sugar, drink enough. Interpretation is the doctor's job.`,
    sources: ['KDIGO guidance on kidney function assessment'],
  },
  {
    id: 'bw_uric_acid',
    category: 'bloodwork',
    keywords: ['harnsäure', 'harnsaeure', 'uric acid', 'gicht', 'gout', 'urat', 'purine', 'purin'],
    briefDE: `Harnsäure entsteht beim Abbau von Purinen. Dauerhaft hohe Werte können Gichtanfälle (schmerzhafte Gelenkentzündung, oft am Großzeh) und Nierensteine begünstigen. Erhöhend wirken viel Fleisch und Innereien, Meeresfrüchte, Alkohol (v. a. Bier), fruktosereiche Getränke sowie Übergewicht und schnelles Abnehmen/Fasten. Günstig: gesundes Gewicht, Alkohol und zuckergesüßte Getränke reduzieren, ausreichend trinken, mehr Milchprodukte/Gemüse. Nicht jeder hohe Wert macht Beschwerden — ob und wie behandelt wird, entscheidet der Arzt (bei Gicht ggf. Medikamente). Auffällige Werte oder akute Gelenkschmerzen ärztlich abklären.`,
    briefEN: `Uric acid comes from breaking down purines. Persistently high levels can promote gout attacks (painful joint inflammation, often the big toe) and kidney stones. Raised by lots of meat and organ meats, seafood, alcohol (especially beer), fructose-rich drinks, plus excess weight and rapid weight loss/fasting. Favourable: healthy weight, less alcohol and sugary drinks, drink enough, more dairy/vegetables. Not every high value causes symptoms — whether and how to treat is the doctor's call (gout may need medication). Clarify abnormal values or acute joint pain medically.`,
    sources: ['EULAR recommendations for the management of gout'],
  },
  {
    id: 'bw_b12_folate',
    category: 'bloodwork',
    keywords: ['b12', 'vitamin b12', 'cobalamin', 'folsäure', 'folsaeure', 'folat', 'folate', 'holo-tc', 'holotc', 'homocystein', 'homocysteine'],
    briefDE: `Vitamin B12 und Folsäure (Folat) sind zentral für Blutbildung und Nervensystem. Ein Mangel kann Müdigkeit, Blässe, Konzentrations- und Nervenprobleme sowie eine bestimmte Blutarmut verursachen. Besonderes Risiko für B12-Mangel: rein pflanzliche Ernährung (B12 stammt fast nur aus tierischen Lebensmitteln) — Veganer sollten B12 supplementieren und den Status kontrollieren lassen (aussagekräftig ist z. B. Holo-Transcobalamin, ergänzend Homocystein/MMA). Folat steckt in grünem Gemüse, Hülsenfrüchten, Vollkorn. Ein Überschuss an Folsäure kann einen B12-Mangel maskieren, deshalb beide zusammen betrachten. Diagnose, Ursache und Dosis über den Arzt.`,
    briefEN: `Vitamin B12 and folate are central to blood formation and the nervous system. Deficiency can cause fatigue, pallor, concentration and nerve problems and a specific anaemia. Special risk for B12 deficiency: a fully plant-based diet (B12 comes almost only from animal foods) — vegans should supplement B12 and have their status checked (e.g. holo-transcobalamin, plus homocysteine/MMA). Folate is in leafy greens, legumes, whole grains. Excess folic acid can mask a B12 deficiency, so consider both together. Diagnosis, cause and dose via the doctor.`,
    sources: ['Clinical reference ranges for B12 and folate'],
  },
  {
    id: 'bw_cortisol',
    category: 'bloodwork',
    keywords: ['cortisol', 'kortisol', 'stresshormon', 'stress hormone', 'nebenniere', 'adrenal'],
    briefDE: `Cortisol ist ein lebenswichtiges Stresshormon der Nebenniere; es folgt einem Tagesrhythmus (morgens hoch, abends niedrig), deshalb ist die Abnahmezeit entscheidend. Kurzfristig ist Cortisol normal und nützlich (auch Training hebt es akut) — problematisch ist chronisch hoher Stress mit dauerhaft schlechtem Schlaf. Ein einzelner Blutwert sagt wenig; auffällige Muster klärt der Arzt gezielt ab (z. B. mit speziellen Tests). Sehr hohe oder sehr niedrige Werte können auf seltene Erkrankungen hinweisen und gehören immer ärztlich untersucht. Alltags-Hebel für ein gesundes Stresslevel: Schlaf, Regeneration (nicht dauernd übertrainieren), Bewegung, Entspannung. Keine Selbstdiagnose.`,
    briefEN: `Cortisol is a vital adrenal stress hormone; it follows a daily rhythm (high in the morning, low in the evening), so the draw time is decisive. Short-term cortisol is normal and useful (training also raises it acutely) — the problem is chronic high stress with persistently poor sleep. A single blood value says little; abnormal patterns are worked up specifically by a doctor (e.g. with special tests). Very high or very low values can indicate rare diseases and always need medical investigation. Everyday levers for a healthy stress level: sleep, recovery (don't chronically overtrain), exercise, relaxation. No self-diagnosis.`,
    sources: ['Endocrine Society guidance on adrenal/cortisol assessment'],
  },
];

export default coachKnowledge;
