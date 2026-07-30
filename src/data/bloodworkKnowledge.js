// Blutwerte-Wissen — Wissensbibliothek-Block "Blutwerte"
// Jedes Thema ist ein E-Book mit mehreren Kapiteln (DE + EN). Erklärt
// wichtige Blutwerte, Normbereiche und Einflussmöglichkeiten.
// Disclaimer: medical — ersetzt keine ärztliche Diagnose.

export const bloodworkCategories = [
  { id: 'hormone', nameDE: 'Hormone', nameEN: 'Hormones' },
  { id: 'stoffwechsel', nameDE: 'Stoffwechsel', nameEN: 'Metabolism' },
  { id: 'vitamine', nameDE: 'Vitamine & Mineralstoffe', nameEN: 'Vitamins & Minerals' },
  { id: 'herz', nameDE: 'Herz-Kreislauf', nameEN: 'Cardiovascular' },
];

export const bloodworkTopics = [
  // ─────────────────────────────────────────────
  // 1. TESTOSTERON
  // ─────────────────────────────────────────────
  {
    id: 'testosterone',
    category: 'hormone',
    nameDE: 'Testosteron',
    nameEN: 'Testosterone',
    summaryDE: 'Testosteron ist das wichtigste anabole Hormon und beeinflusst Muskelaufbau, Knochendichte, Libido, Stimmung und Energie. Der Wert lässt sich durch Lebensstil positiv beeinflussen — extreme Versprechen sind aber mit Vorsicht zu genießen.',
    summaryEN: 'Testosterone is the most important anabolic hormone and influences muscle building, bone density, libido, mood and energy. The value can be positively influenced by lifestyle — but extreme promises should be treated with caution.',
    quickDE: [
      { label: 'Bedeutung', text: 'Muskelaufbau, Knochendichte, Libido, Antrieb, Stimmung.' },
      { label: 'Natürlich fördern', text: 'Krafttraining, guter Schlaf, gesundes Körpergewicht, ausreichend Fett & Mikronährstoffe.' },
    ],
    quickEN: [
      { label: 'Significance', text: 'Muscle building, bone density, libido, drive, mood.' },
      { label: 'Support naturally', text: 'Strength training, good sleep, healthy body weight, enough fat & micronutrients.' },
    ],
    references: [
      { authors: 'Bhasin, S. et al.', year: 2018, title: 'Testosterone Therapy in Men With Hypogonadism: An Endocrine Society Clinical Practice Guideline',
        source: 'Journal of Clinical Endocrinology & Metabolism 103(5):1715–1744', url: 'https://pubmed.ncbi.nlm.nih.gov/29562364/' },
      { authors: 'Endocrine Society', title: 'Testosterone Therapy for Hypogonadism — Guideline Resources',
        source: 'Endocrine Society', url: 'https://www.endocrine.org/clinical-practice-guidelines/testosterone-therapy' },
    ],
    sections: [
      {
        titleDE: 'Was Testosteron im Körper bewirkt',
        titleEN: 'What testosterone does in the body',
        contentDE: `Testosteron ist das wichtigste männliche Sexualhormon, kommt aber auch bei Frauen in kleineren Mengen vor und ist dort ebenfalls bedeutsam. Es gehört zu den anabolen (aufbauenden) Hormonen und spielt eine zentrale Rolle für Muskelaufbau, Kraft, Knochendichte, Fettverteilung, Libido, Stimmung und Energie.

Bei Männern wird Testosteron überwiegend in den Hoden gebildet, gesteuert durch ein Zusammenspiel von Gehirn (Hypothalamus, Hypophyse) und Hoden. Die Produktion unterliegt einem Tagesrhythmus mit höheren Werten am Morgen — weshalb Blutabnahmen zur Testosteronbestimmung meist vormittags erfolgen.

Ein gesunder Testosteronspiegel unterstützt die Anpassung an Krafttraining und das allgemeine Wohlbefinden. Sowohl zu niedrige als auch künstlich stark erhöhte Werte (etwa durch Anabolika) haben jedoch gesundheitliche Konsequenzen.`,
        contentEN: `Testosterone is the most important male sex hormone but also occurs in women in smaller amounts, where it is likewise significant. It belongs to the anabolic (building) hormones and plays a central role in muscle building, strength, bone density, fat distribution, libido, mood and energy.

In men, testosterone is produced mainly in the testes, controlled by an interplay of brain (hypothalamus, pituitary) and testes. Production follows a daily rhythm with higher values in the morning — which is why blood draws for testosterone determination usually take place in the morning.

A healthy testosterone level supports adaptation to strength training and general well-being. Both too-low and artificially strongly elevated values (e.g. through anabolic steroids), however, have health consequences.`,
      },
      {
        titleDE: 'Normbereiche und Messung',
        titleEN: 'Reference ranges and measurement',
        contentDE: `Testosteron wird im Blut gemessen, meist als Gesamttestosteron; aussagekräftig ist zusätzlich das freie (biologisch aktive) Testosteron. Die Referenzbereiche variieren je nach Labor, Alter und Messmethode, weshalb Werte immer im Kontext des jeweiligen Labors und der Symptome zu deuten sind.

Für erwachsene Männer liegt der Referenzbereich für Gesamttestosteron häufig etwa zwischen 300 und 1000 ng/dl, doch die Grenzen sind fließend. Ein einzelner Wert ist zudem nur eine Momentaufnahme — Tageszeit, Schlaf, Stress und akute Erkrankungen können ihn beeinflussen. Bei auffälligen Werten wird meist eine erneute Messung veranlasst.

Wichtig ist, dass ein Laborwert allein keine Diagnose ist. Erst das Zusammenspiel aus Symptomen (z. B. Antriebslosigkeit, Libidoverlust, Muskelabbau) und wiederholt gemessenen Werten erlaubt eine sinnvolle ärztliche Einordnung.`,
        contentEN: `Testosterone is measured in the blood, usually as total testosterone; free (biologically active) testosterone is additionally informative. Reference ranges vary by laboratory, age and measurement method, which is why values must always be interpreted in the context of the specific lab and the symptoms.

For adult men the reference range for total testosterone is often roughly between 300 and 1000 ng/dl, but the limits are fluid. A single value is also only a snapshot — time of day, sleep, stress and acute illness can influence it. With abnormal values, a repeat measurement is usually arranged.

It is important that a lab value alone is not a diagnosis. Only the interplay of symptoms (e.g. lack of drive, loss of libido, muscle loss) and repeatedly measured values allows a sensible medical assessment.`,
      },
      {
        titleDE: 'Was den Testosteronspiegel beeinflusst',
        titleEN: 'What influences testosterone levels',
        contentDE: `Zahlreiche Lebensstilfaktoren wirken auf den Testosteronspiegel. Übergewicht, besonders viel Bauchfett, ist mit niedrigeren Werten verbunden; Gewichtsabnahme kann sie verbessern. Chronischer Schlafmangel senkt Testosteron messbar — schon eine Woche mit nur fünf Stunden Schlaf kann die Werte deutlich reduzieren (Leproult & Van Cauter, 2011, JAMA).

Krafttraining und ausreichende Bewegung wirken sich langfristig günstig aus, während extremes Übertraining oder sehr starke Kaloriendefizite Testosteron senken können. Auch eine ausreichende Zufuhr von Nahrungsfett und Mikronährstoffen wie Zink und Vitamin D ist für die Hormonproduktion wichtig — sehr fettarme Ernährung kann die Werte drücken.

Chronischer Stress erhöht das Hormon Cortisol, das gegenläufig zu Testosteron wirkt. Ein gesunder Lebensstil mit gutem Schlaf, ausgewogener Ernährung, regelmäßigem Training und Stressmanagement ist daher die wirksamste natürliche Grundlage für einen gesunden Testosteronspiegel.`,
        contentEN: `Numerous lifestyle factors affect testosterone levels. Excess weight, especially a lot of belly fat, is associated with lower values; weight loss can improve them. Chronic sleep deprivation measurably lowers testosterone — even one week of only five hours of sleep can significantly reduce the values (Leproult & Van Cauter, 2011, JAMA).

Strength training and adequate exercise have a favourable long-term effect, while extreme overtraining or very strong calorie deficits can lower testosterone. Adequate intake of dietary fat and micronutrients such as zinc and vitamin D is also important for hormone production — a very low-fat diet can depress the values.

Chronic stress raises the hormone cortisol, which acts counter to testosterone. A healthy lifestyle with good sleep, balanced nutrition, regular training and stress management is therefore the most effective natural basis for a healthy testosterone level.`,
      },
      {
        titleDE: 'Realistische Erwartungen und ärztlicher Rat',
        titleEN: 'Realistic expectations and medical advice',
        contentDE: `Der Markt ist voll von "Testosteron-Boostern", die dramatische Steigerungen versprechen. Die meisten dieser Präparate haben in Studien keine oder nur minimale Effekte bei Menschen mit normalen Werten. Ein gesunder Lebensstil hebt einen niedrigen Wert wirksamer als jedes frei verkäufliche Mittel — und bei normalen Werten lässt sich Testosteron kaum sinnvoll "pushen".

Ein tatsächlich zu niedriger Testosteronspiegel (Hypogonadismus) mit entsprechenden Symptomen ist eine medizinische Diagnose, die ärztlich abgeklärt und gegebenenfalls behandelt werden sollte. Eine Testosterontherapie gehört ausschließlich in ärztliche Hände, da sie Nutzen und Risiken sorgfältig abwägen muss.

Von der eigenmächtigen Anwendung anaboler Steroide zur Leistungssteigerung ist dringend abzuraten: Sie können die körpereigene Produktion unterdrücken und ernsthafte gesundheitliche Schäden verursachen. Bei Verdacht auf hormonelle Probleme ist der richtige Weg immer der Gang zum Arzt.`,
        contentEN: `The market is full of "testosterone boosters" promising dramatic increases. Most of these products have no or only minimal effects in studies in people with normal values. A healthy lifestyle raises a low value more effectively than any over-the-counter product — and with normal values, testosterone can hardly be sensibly "pushed".

An actually too-low testosterone level (hypogonadism) with corresponding symptoms is a medical diagnosis that should be clarified by a doctor and treated if necessary. Testosterone therapy belongs exclusively in medical hands, as it must carefully weigh benefits and risks.

Self-directed use of anabolic steroids for performance enhancement is strongly discouraged: they can suppress the body's own production and cause serious health damage. If hormonal problems are suspected, the right path is always to see a doctor.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 2. VITAMIN D (BLUTWERT)
  // ─────────────────────────────────────────────
  {
    id: 'vitamin_d_blood',
    category: 'vitamine',
    nameDE: 'Vitamin D (25-OH)',
    nameEN: 'Vitamin D (25-OH)',
    summaryDE: 'Der Vitamin-D-Blutwert (25-OH-Vitamin-D) zeigt die Versorgung mit dem "Sonnenvitamin". Ein Mangel ist besonders im Winter häufig und kann Knochen, Muskeln und Immunsystem betreffen. Der Wert lässt sich gezielt verbessern.',
    summaryEN: 'The vitamin D blood value (25-OH vitamin D) shows the supply of the "sunshine vitamin". A deficiency is common especially in winter and can affect bones, muscles and the immune system. The value can be improved specifically.',
    quickDE: [
      { label: 'Was gemessen wird', text: '25-OH-Vitamin-D im Blut — der Standardwert für den Vitamin-D-Status.' },
      { label: 'Verbessern', text: 'Sonnenlicht, fetter Fisch, bei Mangel Supplement — Dosis per Bluttest steuern.' },
    ],
    quickEN: [
      { label: 'What is measured', text: '25-OH vitamin D in the blood — the standard value for vitamin D status.' },
      { label: 'Improve', text: 'Sunlight, oily fish, supplement if deficient — guide dose via blood test.' },
    ],
    references: [
      { authors: 'Ross, A.C. et al.', year: 2011, title: 'The 2011 Report on Dietary Reference Intakes for Calcium and Vitamin D from the Institute of Medicine: What Clinicians Need to Know',
        source: 'Journal of Clinical Endocrinology & Metabolism 96(1):53–58', url: 'https://academic.oup.com/jcem/article-abstract/96/1/53/2833225' },
    ],
    sections: [
      {
        titleDE: 'Warum der Vitamin-D-Wert wichtig ist',
        titleEN: 'Why the vitamin D value matters',
        contentDE: `Vitamin D wirkt im Körper wie ein Hormon und ist zentral für den Kalziumstoffwechsel, gesunde Knochen, die Muskelfunktion und das Immunsystem. Da der Körper es unter Sonneneinwirkung selbst bildet, hängt die Versorgung stark von Jahreszeit, Wohnort und Lebensstil ab.

Der beste Marker für die Versorgung ist das 25-Hydroxy-Vitamin-D (25-OH-D) im Blut. Es spiegelt die Speicherform wider und gibt einen zuverlässigen Überblick über den Status der letzten Wochen. Genau dieser Wert wird bei einer Blutuntersuchung bestimmt.

Weil Vitamin-D-Mangel weit verbreitet und über die Nahrung allein schwer auszugleichen ist, gehört dieser Wert zu den sinnvollsten Routine-Blutwerten — besonders für Menschen in nördlichen Regionen und in den sonnenarmen Monaten.`,
        contentEN: `Vitamin D acts like a hormone in the body and is central to calcium metabolism, healthy bones, muscle function and the immune system. Since the body produces it itself under sun exposure, supply depends heavily on season, location and lifestyle.

The best marker of supply is 25-hydroxy vitamin D (25-OH-D) in the blood. It reflects the storage form and gives a reliable overview of status over recent weeks. It is precisely this value that is determined in a blood test.

Because vitamin D deficiency is widespread and hard to compensate through food alone, this value is one of the most sensible routine blood values — especially for people in northern regions and in the low-sun months.`,
      },
      {
        titleDE: 'Normbereiche verstehen',
        titleEN: 'Understanding reference ranges',
        contentDE: `Der Vitamin-D-Status wird üblicherweise in Nanogramm pro Milliliter (ng/ml) oder Nanomol pro Liter (nmol/l) angegeben. Grob orientieren sich viele Labore an folgender Einteilung: Werte unter etwa 20 ng/ml (50 nmol/l) gelten als Mangel, der Bereich darüber als ausreichend, wobei die genauen Grenzen je nach Fachgesellschaft variieren.

Diese Grenzen werden fachlich diskutiert und sind nicht in Stein gemeißelt. Manche Experten halten etwas höhere Zielwerte für sinnvoll, andere warnen vor Übertherapie. Entscheidend ist, den eigenen Wert im Verlauf und in Absprache mit einem Arzt zu interpretieren.

Ein sehr niedriger Wert erklärt manchmal unspezifische Beschwerden wie Müdigkeit, Muskelschwäche oder häufige Infekte. Ein einzelner Laborwert ist jedoch immer im Gesamtbild zu sehen — er ist ein Baustein, keine vollständige Diagnose.`,
        contentEN: `Vitamin D status is usually given in nanograms per millilitre (ng/ml) or nanomoles per litre (nmol/l). As a rough guide, many labs use the following classification: values below about 20 ng/ml (50 nmol/l) are considered deficient, the range above as adequate, though the exact limits vary by professional body.

These limits are professionally debated and not set in stone. Some experts consider somewhat higher target values sensible, others warn against over-treatment. What matters is interpreting your own value over time and in consultation with a doctor.

A very low value sometimes explains non-specific complaints such as fatigue, muscle weakness or frequent infections. A single lab value must, however, always be seen in the overall picture — it is one building block, not a complete diagnosis.`,
      },
      {
        titleDE: 'Wie man den Wert verbessert',
        titleEN: 'How to improve the value',
        contentDE: `Die natürlichste Quelle ist Sonnenlicht: Regelmäßige, maßvolle Sonnenexposition der Haut regt die körpereigene Bildung an. In den Sommermonaten reichen oft schon kurze Aufenthalte im Freien, während im Winter in nördlichen Breiten die UV-B-Strahlung nicht ausreicht.

Über die Nahrung liefern vor allem fetter Fisch (Lachs, Makrele, Hering), Eigelb und angereicherte Produkte Vitamin D — allerdings meist in Mengen, die einen Mangel nicht allein ausgleichen. Deshalb ist bei nachgewiesenem Mangel oft ein Supplement (Vitamin D3) die zuverlässigste Lösung.

Der klügste Weg ist, die Supplement-Dosis über den Blutwert zu steuern: Ausgangswert messen, supplementieren, nach einigen Monaten kontrollieren und anpassen. So bleibt man im wirksamen und sicheren Bereich. Da Vitamin D fettlöslich ist und sich anreichern kann, sollten hohe Dosen ärztlich begleitet werden.`,
        contentEN: `The most natural source is sunlight: regular, moderate sun exposure of the skin stimulates the body's own production. In the summer months, short periods outdoors are often enough, while in winter at northern latitudes the UV-B radiation is insufficient.

Through food, mainly oily fish (salmon, mackerel, herring), egg yolk and fortified products provide vitamin D — usually in amounts that do not compensate for a deficiency alone, however. Therefore, with a proven deficiency, a supplement (vitamin D3) is often the most reliable solution.

The wisest approach is to guide the supplement dose via the blood value: measure the baseline, supplement, check after a few months and adjust. This keeps you in the effective and safe range. Since vitamin D is fat-soluble and can accumulate, high doses should be medically supervised.`,
      },
      {
        titleDE: 'Einordnung und ärztlicher Rat',
        titleEN: 'Perspective and medical advice',
        contentDE: `Vitamin D ist eines der wenigen Supplemente mit breiter, realer Relevanz — gleichzeitig sollte man weder einen Mangel dramatisieren noch Vitamin D als Allheilmittel überschätzen. Es löst nicht jedes Gesundheitsproblem, ist aber ein wichtiger Baustein.

Da fettlösliche Vitamine sich anreichern können, ist eine unkontrollierte Hochdosierung nicht harmlos. Extrem hohe Dosen über lange Zeit können zu einem gefährlichen Kalziumüberschuss führen. Deshalb gilt: den Wert messen, gezielt supplementieren und bei Unsicherheit ärztlichen Rat einholen.

Der Vitamin-D-Wert ist ein gutes Beispiel dafür, wie sinnvoll ein datenbasiertes Vorgehen ist: Statt zu raten, gibt der Bluttest Klarheit und ermöglicht eine gezielte, sichere Korrektur. Diese Inhalte ersetzen jedoch keine ärztliche Beratung.`,
        contentEN: `Vitamin D is one of the few supplements with broad, real relevance — at the same time, one should neither dramatise a deficiency nor overestimate vitamin D as a cure-all. It does not solve every health problem but is an important building block.

Since fat-soluble vitamins can accumulate, uncontrolled high dosing is not harmless. Extremely high doses over a long time can lead to a dangerous excess of calcium. Therefore: measure the value, supplement specifically and seek medical advice when uncertain.

The vitamin D value is a good example of how useful a data-based approach is: instead of guessing, the blood test provides clarity and enables a targeted, safe correction. This content does not, however, replace medical advice.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 3. EISEN & FERRITIN
  // ─────────────────────────────────────────────
  {
    id: 'iron_ferritin',
    category: 'vitamine',
    nameDE: 'Eisen & Ferritin',
    nameEN: 'Iron & Ferritin',
    summaryDE: 'Eisen ist für den Sauerstofftransport im Blut unverzichtbar. Ferritin zeigt die Eisenspeicher an. Ein Mangel — besonders bei menstruierenden Frauen und Ausdauersportlern häufig — führt zu Müdigkeit und Leistungsabfall.',
    summaryEN: 'Iron is indispensable for oxygen transport in the blood. Ferritin indicates the iron stores. A deficiency — common especially in menstruating women and endurance athletes — leads to fatigue and performance decline.',
    quickDE: [
      { label: 'Was gemessen wird', text: 'Ferritin (Speicher), oft mit Hämoglobin, Transferrin & Transferrinsättigung.' },
      { label: 'Risikogruppen', text: 'Menstruierende Frauen, Ausdauersportler, vegetarische/vegane Ernährung.' },
    ],
    quickEN: [
      { label: 'What is measured', text: 'Ferritin (stores), often with haemoglobin, transferrin & transferrin saturation.' },
      { label: 'Risk groups', text: 'Menstruating women, endurance athletes, vegetarian/vegan diets.' },
    ],
    references: [
      { authors: 'World Health Organization', year: 2020, title: 'WHO guideline on use of ferritin concentrations to assess iron status in individuals and populations',
        source: 'WHO, Geneva', url: 'https://www.who.int/publications/i/item/9789240000124' },
      { authors: 'World Health Organization', year: 2020, title: 'WHO guideline on use of ferritin concentrations to assess iron status (NCBI-Eintrag)',
        source: 'PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/33909381/' },
    ],
    sections: [
      {
        titleDE: 'Die Rolle von Eisen',
        titleEN: 'The role of iron',
        contentDE: `Eisen ist ein essenzieller Mineralstoff und Kernbestandteil des Hämoglobins, des roten Blutfarbstoffs, der Sauerstoff von der Lunge zu allen Geweben transportiert. Ohne ausreichend Eisen kann der Körper nicht genug funktionsfähiges Hämoglobin bilden, was die Sauerstoffversorgung beeinträchtigt.

Auch im Muskel spielt Eisen über das Myoglobin eine Rolle bei der Sauerstoffspeicherung, und es ist an der Energiegewinnung in den Zellen beteiligt. Ein Eisenmangel wirkt sich daher direkt auf Ausdauer, Kraft und allgemeine Leistungsfähigkeit aus.

Typische Symptome eines Mangels sind Müdigkeit, Blässe, Kurzatmigkeit bei Belastung, Konzentrationsschwäche und ein spürbarer Leistungsabfall im Training. Da diese Symptome unspezifisch sind, bleibt ein Eisenmangel oft eine Weile unerkannt, bis er über das Blut nachgewiesen wird.`,
        contentEN: `Iron is an essential mineral and a core component of haemoglobin, the red blood pigment that transports oxygen from the lungs to all tissues. Without enough iron, the body cannot form sufficient functional haemoglobin, which impairs oxygen supply.

In the muscle too, iron plays a role in oxygen storage via myoglobin, and it is involved in energy production in the cells. An iron deficiency therefore directly affects endurance, strength and general performance.

Typical symptoms of a deficiency are fatigue, pallor, shortness of breath on exertion, poor concentration and a noticeable drop in training performance. Since these symptoms are non-specific, an iron deficiency often remains undetected for a while until it is shown via the blood.`,
      },
      {
        titleDE: 'Ferritin und die wichtigsten Werte',
        titleEN: 'Ferritin and the key values',
        contentDE: `Zur Beurteilung des Eisenstatus werden mehrere Werte herangezogen. Am wichtigsten ist das Ferritin, die Speicherform des Eisens: Es zeigt, wie gut die Eisenreserven gefüllt sind, und sinkt oft schon, bevor ein manifester Mangel im Blutbild sichtbar wird. Ein niedriges Ferritin ist daher ein frühes Warnsignal.

Ergänzend werden Hämoglobin (der eigentliche rote Blutfarbstoff), Transferrin (das Transportprotein) und die Transferrinsättigung betrachtet. Erst das Gesamtbild erlaubt eine gute Einordnung: Ein niedriges Ferritin bei noch normalem Hämoglobin deutet auf leere Speicher hin, bevor eine echte Anämie entsteht.

Wichtig ist, dass Ferritin auch bei Entzündungen ansteigen kann und dann einen Mangel maskieren kann. Deshalb sollten Eisenwerte immer ärztlich im Zusammenhang mit anderen Markern und dem klinischen Bild interpretiert werden.`,
        contentEN: `Several values are used to assess iron status. The most important is ferritin, the storage form of iron: it shows how well the iron reserves are filled and often drops before a manifest deficiency is visible in the blood count. A low ferritin is therefore an early warning sign.

In addition, haemoglobin (the actual red blood pigment), transferrin (the transport protein) and transferrin saturation are considered. Only the overall picture allows a good assessment: a low ferritin with still-normal haemoglobin indicates empty stores before true anaemia develops.

It is important that ferritin can also rise with inflammation and then mask a deficiency. Therefore iron values should always be interpreted by a doctor in connection with other markers and the clinical picture.`,
      },
      {
        titleDE: 'Risikogruppen und Ursachen',
        titleEN: 'Risk groups and causes',
        contentDE: `Bestimmte Gruppen haben ein deutlich erhöhtes Risiko für Eisenmangel. Menstruierende Frauen verlieren regelmäßig Blut und damit Eisen — Eisenmangel ist bei ihnen die häufigste Mangelerscheinung überhaupt. Auch Schwangere haben einen stark erhöhten Bedarf.

Ausdauersportler sind ebenfalls gefährdet, unter anderem durch erhöhten Bedarf, Verluste über Schweiß und Magen-Darm-Trakt sowie den sogenannten Fußschlag-Effekt beim Laufen. Menschen mit vegetarischer oder veganer Ernährung nehmen Eisen in einer schlechter verwertbaren Form auf und sollten ihren Status im Blick behalten.

Weitere Ursachen können eine unzureichende Zufuhr, Verdauungserkrankungen mit gestörter Aufnahme oder versteckte Blutverluste sein. Gerade weil die Ursachen vielfältig sind, gehört ein unklarer oder anhaltender Eisenmangel immer ärztlich abgeklärt.`,
        contentEN: `Certain groups have a significantly increased risk of iron deficiency. Menstruating women regularly lose blood and thus iron — iron deficiency is the most common deficiency of all in them. Pregnant women also have a strongly increased requirement.

Endurance athletes are likewise at risk, among other things through increased need, losses via sweat and the gastrointestinal tract, and the so-called foot-strike effect when running. People with a vegetarian or vegan diet absorb iron in a less usable form and should keep an eye on their status.

Other causes can be insufficient intake, digestive diseases with impaired absorption or hidden blood loss. Precisely because the causes are varied, an unclear or persistent iron deficiency should always be clarified by a doctor.`,
      },
      {
        titleDE: 'Verbessern — aber richtig',
        titleEN: 'Improving — but correctly',
        contentDE: `Über die Ernährung liefert vor allem rotes Fleisch gut verwertbares Häm-Eisen; pflanzliche Quellen wie Hülsenfrüchte, Vollkorn und grünes Gemüse enthalten Nicht-Häm-Eisen, das schlechter aufgenommen wird. Vitamin C (z. B. aus Obst oder Gemüse zur Mahlzeit) verbessert die Aufnahme von pflanzlichem Eisen deutlich, während Kaffee und Tee sie hemmen.

Bei nachgewiesenem Mangel reicht die Ernährung oft nicht aus, um die Speicher zügig zu füllen — dann können Eisenpräparate nötig sein. Diese sollten jedoch nicht auf gut Glück eingenommen werden: Eine Eisensupplementierung ohne Mangel ist nicht harmlos, da überschüssiges Eisen sich im Körper anreichern und schaden kann.

Deshalb gilt bei Eisen besonders: erst messen, dann gezielt handeln. Dosierung und Dauer einer Eisentherapie gehören in ärztliche Hände, ebenso die Suche nach der Ursache. Diese Inhalte dienen der Information und ersetzen keine ärztliche Diagnose.`,
        contentEN: `Through diet, red meat in particular provides well-usable haem iron; plant sources such as legumes, whole grains and green vegetables contain non-haem iron, which is less well absorbed. Vitamin C (e.g. from fruit or vegetables with the meal) significantly improves the absorption of plant iron, while coffee and tea inhibit it.

With a proven deficiency, diet is often not enough to fill the stores quickly — then iron preparations may be necessary. However, these should not be taken on a whim: iron supplementation without a deficiency is not harmless, as excess iron can accumulate in the body and cause harm.

Therefore, with iron especially: measure first, then act specifically. The dosage and duration of iron therapy belong in medical hands, as does the search for the cause. This content is for information and does not replace a medical diagnosis.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 4. CHOLESTERIN & BLUTFETTE
  // ─────────────────────────────────────────────
  {
    id: 'cholesterol',
    category: 'herz',
    nameDE: 'Cholesterin & Blutfette',
    nameEN: 'Cholesterol & Blood Lipids',
    summaryDE: 'Cholesterin und Triglyceride sind wichtige Blutfette. Ihr Profil (LDL, HDL, Triglyceride) ist ein zentraler Marker für die Herz-Kreislauf-Gesundheit. Lebensstil hat großen Einfluss — die Bewertung gehört aber in ärztliche Hände.',
    summaryEN: 'Cholesterol and triglycerides are important blood lipids. Their profile (LDL, HDL, triglycerides) is a central marker of cardiovascular health. Lifestyle has a great influence — but the assessment belongs in medical hands.',
    quickDE: [
      { label: 'Wichtige Werte', text: 'Gesamtcholesterin, LDL, HDL, Triglyceride — zusammen als Lipidprofil.' },
      { label: 'Günstig beeinflussen', text: 'Ballaststoffe, ungesättigte Fette, Bewegung, gesundes Gewicht, wenig Transfette.' },
    ],
    quickEN: [
      { label: 'Key values', text: 'Total cholesterol, LDL, HDL, triglycerides — together as the lipid profile.' },
      { label: 'Influence favourably', text: 'Fibre, unsaturated fats, exercise, healthy weight, few trans fats.' },
    ],
    references: [
      { authors: 'Mach, F. et al.', year: 2020, title: '2019 ESC/EAS Guidelines for the management of dyslipidaemias: lipid modification to reduce cardiovascular risk',
        source: 'European Heart Journal 41(1):111–188', url: 'https://academic.oup.com/eurheartj/article/41/1/111/5556353' },
      { authors: 'Mach, F. et al.', year: 2025, title: '2025 Focused Update of the 2019 ESC/EAS Guidelines for the management of dyslipidaemias',
        source: 'European Heart Journal 46(42):4359', url: 'https://academic.oup.com/eurheartj/article/46/42/4359/8234482' },
    ],
    sections: [
      {
        titleDE: 'Was Cholesterin ist',
        titleEN: 'What cholesterol is',
        contentDE: `Cholesterin ist eine fettähnliche Substanz, die der Körper für den Aufbau von Zellmembranen, Hormonen und Gallensäuren benötigt. Es ist also lebensnotwendig und nichts grundsätzlich "Schlechtes". Der Körper stellt Cholesterin größtenteils selbst her; ein Teil kommt über die Nahrung.

Da Cholesterin fettlöslich ist, wird es im Blut an Transportproteine gebunden — die Lipoproteine. Die bekanntesten sind LDL ("Low Density Lipoprotein") und HDL ("High Density Lipoprotein"). Vereinfacht transportiert LDL Cholesterin zu den Geweben, während HDL überschüssiges Cholesterin zurück zur Leber bringt.

Ein weiterer wichtiger Blutfettwert sind die Triglyceride, die Hauptform gespeicherten Fetts. Zusammen ergeben Gesamtcholesterin, LDL, HDL und Triglyceride das Lipidprofil, das bei einer Blutuntersuchung bestimmt wird.`,
        contentEN: `Cholesterol is a fat-like substance the body needs to build cell membranes, hormones and bile acids. It is therefore vital and nothing fundamentally "bad". The body produces most cholesterol itself; some comes from food.

Since cholesterol is fat-soluble, it is bound to transport proteins in the blood — the lipoproteins. The best known are LDL ("low density lipoprotein") and HDL ("high density lipoprotein"). Simplified, LDL transports cholesterol to the tissues, while HDL brings excess cholesterol back to the liver.

Another important blood lipid value is triglycerides, the main form of stored fat. Together, total cholesterol, LDL, HDL and triglycerides form the lipid profile determined in a blood test.`,
      },
      {
        titleDE: 'LDL, HDL und die Bewertung',
        titleEN: 'LDL, HDL and the assessment',
        contentDE: `Das Verhältnis und die Höhe der einzelnen Werte sind für die Herz-Kreislauf-Gesundheit bedeutsam. Ein dauerhaft erhöhtes LDL-Cholesterin ist mit einem höheren Risiko für Ablagerungen in den Gefäßen (Arteriosklerose) verbunden, weshalb LDL oft als "ungünstiges" Cholesterin bezeichnet wird. HDL gilt umgekehrt als eher "günstig", da es am Rücktransport beteiligt ist.

Auch erhöhte Triglyceride sind ein Risikofaktor, oft in Verbindung mit Übergewicht, hohem Zuckerkonsum und Bewegungsmangel. Für die Risikobewertung zählt jedoch nicht ein einzelner Wert isoliert, sondern das Gesamtprofil zusammen mit weiteren Faktoren wie Blutdruck, Rauchen, Familienanamnese und Blutzucker.

Die genauen Zielbereiche hängen stark vom individuellen Gesamtrisiko ab und werden von der Ärztin oder dem Arzt festgelegt. Ein "hoher" Wert bedeutet nicht automatisch Handlungsbedarf, und ein "normaler" schließt Risiko nicht völlig aus — deshalb ist die ärztliche Einordnung entscheidend.`,
        contentEN: `The ratio and level of the individual values are significant for cardiovascular health. A persistently elevated LDL cholesterol is associated with a higher risk of deposits in the vessels (atherosclerosis), which is why LDL is often called "unfavourable" cholesterol. HDL, conversely, is considered rather "favourable" as it is involved in return transport.

Elevated triglycerides are also a risk factor, often in connection with excess weight, high sugar consumption and lack of exercise. For risk assessment, however, it is not a single value in isolation that counts, but the overall profile together with other factors such as blood pressure, smoking, family history and blood sugar.

The exact target ranges depend heavily on individual overall risk and are set by the doctor. A "high" value does not automatically mean action is needed, and a "normal" one does not completely exclude risk — which is why medical assessment is decisive.`,
      },
      {
        titleDE: 'Was den Lebensstil betrifft',
        titleEN: 'Where lifestyle comes in',
        contentDE: `Der Lebensstil hat einen erheblichen Einfluss auf die Blutfette. Eine ballaststoffreiche Ernährung mit viel Gemüse, Obst, Hülsenfrüchten und Vollkorn kann das LDL-Cholesterin senken. Der Austausch gesättigter Fette durch ungesättigte (Olivenöl, Nüsse, fetter Fisch) wirkt sich günstig aus, während künstliche Transfette klar ungünstig sind und gemieden werden sollten.

Regelmäßige körperliche Aktivität verbessert das Lipidprofil, insbesondere Triglyceride und HDL. Auch ein gesundes Körpergewicht, der Verzicht auf Rauchen und ein maßvoller Alkoholkonsum tragen zur Herz-Kreislauf-Gesundheit bei. Diese Maßnahmen wirken zusammen und sind die Grundlage jeder Verbesserung.

Wichtig ist die realistische Einordnung: Ein Teil der Cholesterinwerte ist genetisch bedingt und lässt sich durch Lebensstil nur begrenzt beeinflussen. Manche Menschen haben trotz gesunder Lebensweise erhöhte Werte — hier kann eine medikamentöse Behandlung nötig sein, die ausschließlich ärztlich entschieden wird.`,
        contentEN: `Lifestyle has a considerable influence on blood lipids. A fibre-rich diet with plenty of vegetables, fruit, legumes and whole grains can lower LDL cholesterol. Replacing saturated fats with unsaturated ones (olive oil, nuts, oily fish) has a favourable effect, while artificial trans fats are clearly unfavourable and should be avoided.

Regular physical activity improves the lipid profile, especially triglycerides and HDL. A healthy body weight, not smoking and moderate alcohol consumption also contribute to cardiovascular health. These measures work together and are the basis of any improvement.

Realistic perspective is important: some cholesterol values are genetically determined and can only be influenced to a limited extent by lifestyle. Some people have elevated values despite a healthy lifestyle — here medication may be necessary, which is decided exclusively by a doctor.`,
      },
      {
        titleDE: 'Einordnung und ärztlicher Rat',
        titleEN: 'Perspective and medical advice',
        contentDE: `Das Lipidprofil ist einer der wichtigsten Routine-Blutwerte zur Einschätzung des Herz-Kreislauf-Risikos. Gerade weil Ablagerungen in den Gefäßen lange keine Symptome verursachen, ist die regelmäßige Kontrolle sinnvoll — besonders mit zunehmendem Alter oder bei familiärer Vorbelastung.

Die Interpretation ist komplex und gehört in ärztliche Hände. Ob und wie ein Wert behandelt wird, hängt vom individuellen Gesamtrisiko ab, nicht von einer einzelnen Zahl. Lebensstiländerungen sind fast immer der erste Schritt; Medikamente wie Statine kommen bei entsprechendem Risiko hinzu und sind gut untersucht.

Nutze dieses Wissen, um das eigene Lipidprofil besser zu verstehen und Lebensstilfaktoren gezielt anzugehen. Die konkrete Bewertung und Behandlung deiner Werte sollte aber immer mit einem Arzt erfolgen — diese Inhalte ersetzen keine medizinische Beratung.`,
        contentEN: `The lipid profile is one of the most important routine blood values for assessing cardiovascular risk. Precisely because deposits in the vessels cause no symptoms for a long time, regular monitoring is sensible — especially with increasing age or family history.

Interpretation is complex and belongs in medical hands. Whether and how a value is treated depends on individual overall risk, not on a single number. Lifestyle changes are almost always the first step; medications such as statins are added with corresponding risk and are well studied.

Use this knowledge to better understand your own lipid profile and to address lifestyle factors specifically. The concrete assessment and treatment of your values should, however, always be done with a doctor — this content does not replace medical advice.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 5. BLUTZUCKER & HbA1c
  // ─────────────────────────────────────────────
  {
    id: 'blood_sugar',
    category: 'stoffwechsel',
    nameDE: 'Blutzucker & HbA1c',
    nameEN: 'Blood Sugar & HbA1c',
    summaryDE: 'Der Blutzucker (Glukose) und der Langzeitwert HbA1c zeigen, wie gut der Körper Zucker verarbeitet. Sie sind zentrale Marker für den Stoffwechsel und das Diabetesrisiko. Ernährung und Bewegung haben großen Einfluss.',
    summaryEN: 'Blood sugar (glucose) and the long-term value HbA1c show how well the body processes sugar. They are central markers of metabolism and diabetes risk. Nutrition and exercise have a great influence.',
    quickDE: [
      { label: 'Was gemessen wird', text: 'Nüchternblutzucker (Momentwert) und HbA1c (Durchschnitt der letzten ~3 Monate).' },
      { label: 'Günstig beeinflussen', text: 'Bewegung, gesundes Gewicht, ballaststoffreiche Kost, wenig Zucker; Muskeltraining hilft.' },
    ],
    quickEN: [
      { label: 'What is measured', text: 'Fasting blood sugar (snapshot) and HbA1c (average of the last ~3 months).' },
      { label: 'Influence favourably', text: 'Exercise, healthy weight, fibre-rich diet, less sugar; muscle training helps.' },
    ],
    references: [
      { authors: 'American Diabetes Association', year: 2025, title: 'Diagnosis and Classification of Diabetes: Standards of Care in Diabetes—2025',
        source: 'Diabetes Care 48(Suppl. 1):S27–S49', url: 'https://diabetesjournals.org/care/article/48/Supplement_1/S27/157566/2-Diagnosis-and-Classification-of-Diabetes' },
    ],
    sections: [
      {
        titleDE: 'Blutzucker und Insulin',
        titleEN: 'Blood sugar and insulin',
        contentDE: `Glukose (Blutzucker) ist ein zentraler Energieträger des Körpers. Nach dem Essen steigt der Blutzucker an, woraufhin die Bauchspeicheldrüse das Hormon Insulin ausschüttet. Insulin schleust die Glukose in die Zellen und senkt so den Blutzucker wieder auf ein normales Niveau.

Dieses fein abgestimmte System hält den Blutzucker in einem engen Bereich. Funktioniert es gut, wird Zucker effizient verarbeitet. Ist die Insulinwirkung gestört (Insulinresistenz), muss der Körper immer mehr Insulin produzieren, und der Blutzucker bleibt zu hoch — eine Vorstufe von Typ-2-Diabetes.

Muskulatur spielt hier eine wichtige Rolle: Aktive Muskeln nehmen Glukose auf und verbessern die Insulinempfindlichkeit. Regelmäßiges Training, besonders Krafttraining, ist daher einer der wirksamsten Faktoren für einen gesunden Zuckerstoffwechsel.`,
        contentEN: `Glucose (blood sugar) is a central energy carrier of the body. After eating, blood sugar rises, whereupon the pancreas releases the hormone insulin. Insulin channels glucose into the cells and thereby lowers blood sugar back to a normal level.

This finely tuned system keeps blood sugar in a narrow range. When it works well, sugar is processed efficiently. If insulin action is impaired (insulin resistance), the body has to produce more and more insulin, and blood sugar stays too high — a precursor of type 2 diabetes.

Muscle plays an important role here: active muscles take up glucose and improve insulin sensitivity. Regular training, especially strength training, is therefore one of the most effective factors for a healthy sugar metabolism.`,
      },
      {
        titleDE: 'Nüchternblutzucker und HbA1c',
        titleEN: 'Fasting blood sugar and HbA1c',
        contentDE: `Zwei Werte sind besonders aussagekräftig. Der Nüchternblutzucker wird nach mehreren Stunden ohne Nahrung gemessen und zeigt den aktuellen Zuckerspiegel. Er ist eine Momentaufnahme und kann durch Ernährung, Stress und Tageszeit schwanken.

Der HbA1c-Wert ("Langzeitzucker") spiegelt den durchschnittlichen Blutzucker der letzten etwa zwei bis drei Monate wider. Er misst den Anteil des Blutfarbstoffs Hämoglobin, an den sich Zucker angelagert hat. Weil er einen längeren Zeitraum abbildet, ist er robuster gegenüber kurzfristigen Schwankungen und wird zur Diagnose und Verlaufskontrolle genutzt.

Beide Werte zusammen geben ein gutes Bild des Zuckerstoffwechsels. Erhöhte Werte können auf eine Vorstufe von Diabetes (Prädiabetes) oder einen bestehenden Diabetes hinweisen. Die genauen Grenzwerte und ihre Deutung legt die Ärztin oder der Arzt fest.`,
        contentEN: `Two values are particularly informative. Fasting blood sugar is measured after several hours without food and shows the current sugar level. It is a snapshot and can fluctuate with diet, stress and time of day.

The HbA1c value ("long-term sugar") reflects the average blood sugar of the last roughly two to three months. It measures the proportion of the blood pigment haemoglobin to which sugar has attached. Because it reflects a longer period, it is more robust against short-term fluctuations and is used for diagnosis and monitoring.

Both values together give a good picture of sugar metabolism. Elevated values can indicate a precursor of diabetes (prediabetes) or existing diabetes. The exact limits and their interpretation are determined by the doctor.`,
      },
      {
        titleDE: 'Einfluss von Ernährung und Bewegung',
        titleEN: 'Influence of nutrition and exercise',
        contentDE: `Der Zuckerstoffwechsel lässt sich durch den Lebensstil stark beeinflussen. Eine ballaststoffreiche Ernährung mit Gemüse, Hülsenfrüchten und Vollkorn führt zu einem langsameren, gleichmäßigeren Blutzuckeranstieg als stark verarbeitete, zuckerreiche Lebensmittel. Die Reduktion von zuckergesüßten Getränken und Weißmehlprodukten ist besonders wirkungsvoll.

Bewegung ist ein Schlüsselfaktor. Sowohl Ausdauer- als auch Krafttraining verbessern die Insulinempfindlichkeit und helfen den Muskeln, Glukose aufzunehmen. Schon ein Spaziergang nach dem Essen kann den Blutzuckeranstieg dämpfen. Der Aufbau von Muskelmasse vergrößert zudem das "Zuckerlager" des Körpers.

Ein gesundes Körpergewicht, insbesondere die Reduktion von Bauchfett, verbessert die Blutzuckerwerte deutlich. Diese Lebensstilmaßnahmen sind die wirksamste und erste Strategie, um Prädiabetes entgegenzuwirken und das Diabetesrisiko zu senken.`,
        contentEN: `Sugar metabolism can be strongly influenced by lifestyle. A fibre-rich diet with vegetables, legumes and whole grains leads to a slower, more even rise in blood sugar than heavily processed, sugar-rich foods. Reducing sugar-sweetened drinks and white flour products is particularly effective.

Exercise is a key factor. Both endurance and strength training improve insulin sensitivity and help the muscles take up glucose. Even a walk after eating can dampen the rise in blood sugar. Building muscle mass also enlarges the body's "sugar store".

A healthy body weight, especially reducing belly fat, significantly improves blood sugar values. These lifestyle measures are the most effective and first strategy to counteract prediabetes and lower diabetes risk.`,
      },
      {
        titleDE: 'Einordnung und ärztlicher Rat',
        titleEN: 'Perspective and medical advice',
        contentDE: `Blutzucker und HbA1c gehören zu den wichtigsten Vorsorge-Blutwerten, weil ein gestörter Zuckerstoffwechsel lange keine Symptome verursacht, aber ernste Folgen haben kann. Eine frühzeitige Erkennung von Prädiabetes eröffnet die Chance, mit Lebensstiländerungen gegenzusteuern, bevor ein Diabetes entsteht.

Erhöhte Werte sind ein wichtiges Warnsignal, aber keine Selbstdiagnose. Die Interpretation, weitere Abklärung und eine mögliche Behandlung gehören in ärztliche Hände. Bei bestehendem Diabetes ist eine strukturierte medizinische Begleitung unerlässlich.

Nutze dieses Wissen, um die Bedeutung deiner Werte zu verstehen und Ernährung sowie Bewegung gezielt einzusetzen. Krafttraining und eine ausgewogene, ballaststoffreiche Ernährung sind dabei starke Verbündete für einen gesunden Zuckerstoffwechsel. Diese Inhalte ersetzen jedoch keine ärztliche Beratung oder Diagnose.`,
        contentEN: `Blood sugar and HbA1c are among the most important preventive blood values, because a disturbed sugar metabolism causes no symptoms for a long time but can have serious consequences. Early detection of prediabetes opens the chance to counteract with lifestyle changes before diabetes develops.

Elevated values are an important warning sign but not a self-diagnosis. Interpretation, further clarification and possible treatment belong in medical hands. With existing diabetes, structured medical support is essential.

Use this knowledge to understand the significance of your values and to use nutrition and exercise specifically. Strength training and a balanced, fibre-rich diet are strong allies for a healthy sugar metabolism. This content does not, however, replace medical advice or diagnosis.`,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 6. SCHILDDRÜSE (TSH)
  // ─────────────────────────────────────────────
  {
    id: 'thyroid',
    category: 'hormone',
    nameDE: 'Schilddrüse (TSH)',
    nameEN: 'Thyroid (TSH)',
    summaryDE: 'Die Schilddrüse steuert über ihre Hormone den Stoffwechsel, die Energie und die Körpertemperatur. Der TSH-Wert ist der wichtigste Suchtest für Über- oder Unterfunktion. Auffälligkeiten gehören immer ärztlich abgeklärt.',
    summaryEN: 'The thyroid controls metabolism, energy and body temperature via its hormones. The TSH value is the most important screening test for over- or underactivity. Abnormalities should always be clarified by a doctor.',
    quickDE: [
      { label: 'Was gemessen wird', text: 'TSH als Suchtest; bei Auffälligkeit zusätzlich fT3/fT4 und ggf. Antikörper.' },
      { label: 'Symptome', text: 'Müdigkeit, Gewichtsänderung, Kälte-/Wärmeempfinden, Stimmung — unspezifisch, ärztlich abklären.' },
    ],
    quickEN: [
      { label: 'What is measured', text: 'TSH as a screening test; if abnormal, additionally fT3/fT4 and possibly antibodies.' },
      { label: 'Symptoms', text: 'Fatigue, weight change, cold/heat sensitivity, mood — non-specific, clarify medically.' },
    ],
    references: [
      { authors: 'Pearce, S.H.S. et al.', year: 2013, title: '2013 ETA Guideline: Management of Subclinical Hypothyroidism',
        source: 'European Thyroid Journal 2(4):215–228', url: 'https://etj.bioscientifica.com/view/journals/etj/2/4/ETJ356507.xml' },
    ],
    sections: [
      {
        titleDE: 'Die Schilddrüse und ihre Hormone',
        titleEN: 'The thyroid and its hormones',
        contentDE: `Die Schilddrüse ist eine kleine, schmetterlingsförmige Drüse am Hals, die eine große Wirkung hat. Sie produziert die Schilddrüsenhormone T3 (Trijodthyronin) und T4 (Thyroxin), die den Grundumsatz, den Energiestoffwechsel, die Körpertemperatur, den Herzschlag und viele weitere Funktionen regulieren.

Gesteuert wird die Schilddrüse über einen Regelkreis mit dem Gehirn. Die Hirnanhangsdrüse (Hypophyse) schüttet das Hormon TSH (Thyreoidea-stimulierendes Hormon) aus, das die Schilddrüse zur Hormonproduktion anregt. Dieser Regelkreis passt die Hormonmenge fein an den Bedarf des Körpers an.

Ist die Schilddrüsenfunktion gestört, wirkt sich das auf den ganzen Körper aus. Eine Unterfunktion (Hypothyreose) verlangsamt den Stoffwechsel, eine Überfunktion (Hyperthyreose) beschleunigt ihn — beide äußern sich in einer Vielzahl unspezifischer Symptome.`,
        contentEN: `The thyroid is a small, butterfly-shaped gland in the neck that has a large effect. It produces the thyroid hormones T3 (triiodothyronine) and T4 (thyroxine), which regulate the basal metabolic rate, energy metabolism, body temperature, heartbeat and many other functions.

The thyroid is controlled via a feedback loop with the brain. The pituitary gland releases the hormone TSH (thyroid-stimulating hormone), which stimulates the thyroid to produce hormones. This feedback loop finely adjusts the amount of hormone to the body's needs.

If thyroid function is disturbed, it affects the whole body. An underactivity (hypothyroidism) slows the metabolism, an overactivity (hyperthyroidism) speeds it up — both manifest in a variety of non-specific symptoms.`,
      },
      {
        titleDE: 'Warum TSH der wichtigste Wert ist',
        titleEN: 'Why TSH is the most important value',
        contentDE: `Der TSH-Wert ist der empfindlichste Suchtest für die Schilddrüsenfunktion. Der Grund liegt im Regelkreis: Produziert die Schilddrüse zu wenig Hormone, versucht der Körper gegenzusteuern und schüttet mehr TSH aus — ein hoher TSH-Wert deutet daher oft auf eine Unterfunktion hin. Produziert sie zu viel, sinkt TSH, was auf eine Überfunktion hinweisen kann.

Weil TSH schon auf kleine Abweichungen reagiert, wird es als erster Wert bestimmt. Ist der TSH auffällig, folgen weitere Untersuchungen: die freien Schilddrüsenhormone fT3 und fT4 sowie gegebenenfalls Antikörper, um Ursachen wie die Autoimmunerkrankung Hashimoto zu erkennen.

Die Referenzbereiche für TSH variieren je nach Labor, und die Deutung hängt vom Einzelfall ab — etwa vom Alter, einer Schwangerschaft oder bestehenden Symptomen. Ein einzelner grenzwertiger Wert bedeutet nicht automatisch eine Erkrankung.`,
        contentEN: `The TSH value is the most sensitive screening test for thyroid function. The reason lies in the feedback loop: if the thyroid produces too few hormones, the body tries to counteract this and releases more TSH — a high TSH value therefore often indicates underactivity. If it produces too much, TSH drops, which can indicate overactivity.

Because TSH reacts even to small deviations, it is determined as the first value. If the TSH is abnormal, further tests follow: the free thyroid hormones fT3 and fT4 and, if necessary, antibodies to detect causes such as the autoimmune disease Hashimoto's.

The reference ranges for TSH vary by laboratory, and interpretation depends on the individual case — such as age, pregnancy or existing symptoms. A single borderline value does not automatically mean disease.`,
      },
      {
        titleDE: 'Symptome und häufige Störungen',
        titleEN: 'Symptoms and common disorders',
        contentDE: `Eine Schilddrüsenunterfunktion äußert sich häufig durch Müdigkeit, Antriebslosigkeit, Gewichtszunahme, Kälteempfindlichkeit, trockene Haut und gedrückte Stimmung. Eine Überfunktion zeigt sich dagegen oft durch Nervosität, Herzrasen, Gewichtsverlust trotz Appetit, Wärmeempfindlichkeit und Schlafstörungen.

Diese Symptome sind unspezifisch und können viele andere Ursachen haben — genau deshalb ist die Blutuntersuchung so wertvoll, um die Schilddrüse gezielt als Ursache zu prüfen oder auszuschließen. Für sportlich aktive Menschen ist eine gut funktionierende Schilddrüse wichtig, da sie Energie, Regeneration und Stoffwechsel beeinflusst.

Häufige Störungen sind die Autoimmunerkrankung Hashimoto (führt meist zur Unterfunktion) und die Basedow-Krankheit (führt zur Überfunktion). Auch Jodmangel kann die Schilddrüse beeinträchtigen. Die genaue Diagnose erfordert immer eine ärztliche Untersuchung.`,
        contentEN: `An underactive thyroid often manifests through fatigue, lack of drive, weight gain, sensitivity to cold, dry skin and low mood. An overactive thyroid, by contrast, often shows through nervousness, palpitations, weight loss despite appetite, heat sensitivity and sleep disturbances.

These symptoms are non-specific and can have many other causes — which is precisely why the blood test is so valuable to specifically check or exclude the thyroid as the cause. For physically active people, a well-functioning thyroid is important, as it influences energy, recovery and metabolism.

Common disorders are the autoimmune disease Hashimoto's (usually leads to underactivity) and Graves' disease (leads to overactivity). Iodine deficiency can also impair the thyroid. An exact diagnosis always requires a medical examination.`,
      },
      {
        titleDE: 'Einordnung und ärztlicher Rat',
        titleEN: 'Perspective and medical advice',
        contentDE: `Die Schilddrüse ist ein Beispiel dafür, wie ein kleines Organ den ganzen Körper beeinflusst. Der TSH-Wert ist ein einfacher, aussagekräftiger Suchtest, der bei unklaren Symptomen wie anhaltender Müdigkeit, unerklärlichen Gewichtsveränderungen oder Stimmungsschwankungen sinnvoll sein kann.

Anders als bei manchen anderen Werten lässt sich eine echte Schilddrüsenfunktionsstörung nicht einfach durch Lebensstil "wegtrainieren". Eine ausreichende Jodversorgung (über jodiertes Salz und Lebensmittel) unterstützt die normale Funktion, aber eine bestehende Störung braucht eine gezielte medizinische Behandlung, oft mit Hormonpräparaten.

Deshalb gilt hier besonders: Auffällige Schilddrüsenwerte oder entsprechende Symptome gehören immer in ärztliche Hände. Dieses Wissen hilft dir, die Bedeutung des TSH-Werts zu verstehen und Symptome ernst zu nehmen — die Diagnose und Behandlung ersetzt es ausdrücklich nicht.`,
        contentEN: `The thyroid is an example of how a small organ influences the whole body. The TSH value is a simple, informative screening test that can be useful with unclear symptoms such as persistent fatigue, unexplained weight changes or mood swings.

Unlike some other values, a true thyroid function disorder cannot simply be "trained away" through lifestyle. Adequate iodine supply (via iodised salt and food) supports normal function, but an existing disorder needs targeted medical treatment, often with hormone preparations.

Therefore, here especially: abnormal thyroid values or corresponding symptoms always belong in medical hands. This knowledge helps you understand the significance of the TSH value and take symptoms seriously — it expressly does not replace diagnosis and treatment.`,
      },
    ],
  },
];

export default bloodworkTopics;
