import WidgetKit
import SwiftUI
import HealthKit

// Zwei Widgets (seit 1.6.1, vorher Streak/Woche/Level):
//   Makros   — kcal uebrig + Protein/Kohlenhydrate/Fett gegen das Ziel
//   Schritte — Schritte heute
// Homescreen klein/mittel im FullRep-Look (Schwarz + Amber), ab iOS 16 auch
// Sperrbildschirm (rund, rechteckig, Zeile; dort zeichnet iOS einfarbig).
//
// Datenweg: WebView schreibt per @capacitor/preferences in
// UserDefaults.standard (Key "FullRepWidget.widget.daten"); der AppDelegate
// kopiert den Wert beim Verlassen der App in die App-Group-Suite
// group.at.gallab.mypeak und stoesst WidgetCenter an (src/lib/widgetDaten.js).
// Schritte liest das Widget zusaetzlich selbst aus HealthKit, damit sie auch
// ohne App-Start mitlaufen; geht das nicht (Geraet gesperrt, keine Freigabe),
// gilt der Wert aus der App.
//
// Der Makro-Widget behaelt die alte kind "FullRepWidget": Wer das alte
// Streak-Widget platziert hat, sieht damit ab dem Update die Makros statt
// eines verschwundenen Widgets.

private let SUITE = "group.at.gallab.mypeak"
private let KEY = "widget.daten"
private let SCHRITTZIEL = 10_000.0

private let amber = Color(red: 0.984, green: 0.749, blue: 0.141)   // #FBBF24
private let creme = Color(red: 1.0, green: 0.973, blue: 0.906)     // #FFF8E7
private let grau = Color(red: 0.659, green: 0.635, blue: 0.62)     // #A8A29E
private let blau = Color(red: 0.231, green: 0.510, blue: 0.965)    // Protein, wie MAKROS in der App
private let gruen = Color(red: 0.063, green: 0.725, blue: 0.506)   // Kohlenhydrate
private let rot = Color(red: 0.957, green: 0.247, blue: 0.369)     // Fett

// MARK: - Daten

struct Daten: Decodable {
    let datum: String?
    let kcal: Int?
    let kcalZiel: Int?
    let protein: Int?
    let proteinZiel: Int?
    let carbs: Int?
    let carbsZiel: Int?
    let fat: Int?
    let fatZiel: Int?
    let schritte: Int?
}

private func heuteString() -> String {
    let f = DateFormatter()
    f.calendar = Calendar(identifier: .gregorian)
    f.locale = Locale(identifier: "en_US_POSIX")
    f.dateFormat = "yyyy-MM-dd"
    return f.string(from: Date())
}

private func lesen() -> Daten? {
    guard let roh = UserDefaults(suiteName: SUITE)?.string(forKey: KEY),
          let d = roh.data(using: .utf8) else { return nil }
    return try? JSONDecoder().decode(Daten.self, from: d)
}

struct Makros {
    var kcal = 0, kcalZiel = 0, protein = 0, proteinZiel = 0
    var carbs = 0, carbsZiel = 0, fat = 0, fatZiel = 0
    var uebrig: Int { max(0, kcalZiel - kcal) }
    var anteil: Double { kcalZiel > 0 ? min(1, Double(kcal) / Double(kcalZiel)) : 0 }

    static let beispiel = Makros(kcal: 1350, kcalZiel: 2200, protein: 110, proteinZiel: 160,
                                 carbs: 140, carbsZiel: 240, fat: 45, fatZiel: 70)

    // Eintraege von gestern gelten nach Mitternacht nicht mehr: dann 0 gegessen,
    // die Ziele bleiben. Ohne Daten ueberhaupt: nil (Widget zeigt Striche).
    static func ausDaten(_ d: Daten?) -> Makros? {
        guard let d = d, d.kcalZiel != nil else { return nil }
        let heute = d.datum == heuteString()
        return Makros(kcal: heute ? d.kcal ?? 0 : 0, kcalZiel: d.kcalZiel ?? 0,
                      protein: heute ? d.protein ?? 0 : 0, proteinZiel: d.proteinZiel ?? 0,
                      carbs: heute ? d.carbs ?? 0 : 0, carbsZiel: d.carbsZiel ?? 0,
                      fat: heute ? d.fat ?? 0 : 0, fatZiel: d.fatZiel ?? 0)
    }
}

// MARK: - Woerter
// Die Extension hat keine Strings-Dateien; die paar Woerter stehen hier je
// Sprache der App. Rueckfall Englisch, wie in der App.

private struct Woerter {
    let uebrig: String, schritte: String, p: String, k: String, f: String
    let makroName: String, makroText: String, schritteName: String, schritteText: String
    let ohneHealth: String
}

private let WOERTER: [String: Woerter] = [
    "de": Woerter(uebrig: "übrig", schritte: "Schritte", p: "P", k: "KH", f: "F",
                  makroName: "FullRep Makros", makroText: "Kalorien und Makros von heute.",
                  schritteName: "FullRep Schritte", schritteText: "Deine Schritte heute.",
                  ohneHealth: "Health verbinden"),
    "en": Woerter(uebrig: "left", schritte: "steps", p: "P", k: "C", f: "F",
                  makroName: "FullRep Macros", makroText: "Today's calories and macros.",
                  schritteName: "FullRep Steps", schritteText: "Your steps today.",
                  ohneHealth: "Connect Health"),
    "es": Woerter(uebrig: "restantes", schritte: "pasos", p: "P", k: "C", f: "G",
                  makroName: "FullRep Macros", makroText: "Calorías y macros de hoy.",
                  schritteName: "FullRep Pasos", schritteText: "Tus pasos de hoy.",
                  ohneHealth: "Conectar Salud"),
    "fr": Woerter(uebrig: "restantes", schritte: "pas", p: "P", k: "G", f: "L",
                  makroName: "FullRep Macros", makroText: "Calories et macros du jour.",
                  schritteName: "FullRep Pas", schritteText: "Tes pas aujourd’hui.",
                  ohneHealth: "Connecter Santé"),
    "pt": Woerter(uebrig: "restantes", schritte: "passos", p: "P", k: "C", f: "G",
                  makroName: "FullRep Macros", makroText: "Calorias e macros de hoje.",
                  schritteName: "FullRep Passos", schritteText: "Seus passos hoje.",
                  ohneHealth: "Conectar Saúde"),
    "ar": Woerter(uebrig: "متبقية", schritte: "خطوة", p: "ب", k: "ك", f: "د",
                  makroName: "FullRep المغذيات", makroText: "سعرات ومغذيات اليوم.",
                  schritteName: "FullRep الخطوات", schritteText: "خطواتك اليوم.",
                  ohneHealth: "اربط Health"),
    "it": Woerter(uebrig: "rimaste", schritte: "passi", p: "P", k: "C", f: "G",
                  makroName: "FullRep Macro", makroText: "Calorie e macro di oggi.",
                  schritteName: "FullRep Passi", schritteText: "I tuoi passi di oggi.",
                  ohneHealth: "Collega Salute"),
    "nl": Woerter(uebrig: "over", schritte: "stappen", p: "E", k: "K", f: "V",
                  makroName: "FullRep Macro's", makroText: "Calorieën en macro's van vandaag.",
                  schritteName: "FullRep Stappen", schritteText: "Je stappen vandaag.",
                  ohneHealth: "Koppel Gezondheid"),
    "pl": Woerter(uebrig: "zostało", schritte: "kroków", p: "B", k: "W", f: "T",
                  makroName: "FullRep Makro", makroText: "Kalorie i makro z dziś.",
                  schritteName: "FullRep Kroki", schritteText: "Twoje kroki dziś.",
                  ohneHealth: "Połącz Zdrowie"),
    "tr": Woerter(uebrig: "kaldı", schritte: "adım", p: "P", k: "K", f: "Y",
                  makroName: "FullRep Makrolar", makroText: "Bugünkü kalori ve makrolar.",
                  schritteName: "FullRep Adımlar", schritteText: "Bugünkü adımların.",
                  ohneHealth: "Sağlık’ı bağla"),
    "ja": Woerter(uebrig: "残り", schritte: "歩", p: "P", k: "C", f: "F",
                  makroName: "FullRep マクロ", makroText: "今日のカロリーとマクロ。",
                  schritteName: "FullRep 歩数", schritteText: "今日の歩数。",
                  ohneHealth: "ヘルスケアを接続"),
    "ko": Woerter(uebrig: "남음", schritte: "걸음", p: "단", k: "탄", f: "지",
                  makroName: "FullRep 매크로", makroText: "오늘의 칼로리와 매크로.",
                  schritteName: "FullRep 걸음 수", schritteText: "오늘의 걸음 수.",
                  ohneHealth: "건강 앱 연결"),
    "zh": Woerter(uebrig: "剩余", schritte: "步", p: "蛋", k: "碳", f: "脂",
                  makroName: "FullRep 宏量", makroText: "今日热量与宏量营养素。",
                  schritteName: "FullRep 步数", schritteText: "今日步数。",
                  ohneHealth: "连接健康"),
]

private var w: Woerter {
    let code = Locale.preferredLanguages.first.map { String($0.prefix(2)) } ?? "en"
    return WOERTER[code] ?? WOERTER["en"]!
}

private func zahl(_ n: Int) -> String {
    let f = NumberFormatter()
    f.numberStyle = .decimal
    return f.string(from: NSNumber(value: n)) ?? "\(n)"
}

// MARK: - Hintergrund

struct Grund: ViewModifier {
    private var schwarz: Color { Color(red: 0.039, green: 0.039, blue: 0.039) } // #0A0A0A

    func body(content: Content) -> some View {
        if #available(iOS 17.0, *) {
            content.containerBackground(schwarz, for: .widget)
        } else {
            content.background(schwarz)
        }
    }
}

// Sperrbildschirm: kein eigener Hintergrund, aber ab iOS 17 trotzdem
// containerBackground, sonst zeigt iOS „Please adopt containerBackground“.
struct KlarerGrund: ViewModifier {
    func body(content: Content) -> some View {
        if #available(iOS 17.0, *) {
            content.containerBackground(.clear, for: .widget)
        } else {
            content
        }
    }
}

// MARK: - Makros

struct MakroEintrag: TimelineEntry {
    let date: Date
    let makros: Makros?
}

struct MakroVersorger: TimelineProvider {
    func placeholder(in context: Context) -> MakroEintrag {
        MakroEintrag(date: Date(), makros: .beispiel)
    }

    func getSnapshot(in context: Context, completion: @escaping (MakroEintrag) -> Void) {
        completion(MakroEintrag(date: Date(), makros: Makros.ausDaten(lesen()) ?? .beispiel))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<MakroEintrag>) -> Void) {
        // Frische kommt vom reloadAllTimelines des AppDelegate; .after(30 min)
        // faengt nur den Tageswechsel ab, falls die App lange zu bleibt.
        let eintrag = MakroEintrag(date: Date(), makros: Makros.ausDaten(lesen()))
        let naechste = Calendar.current.date(byAdding: .minute, value: 30, to: Date()) ?? Date().addingTimeInterval(1800)
        completion(Timeline(entries: [eintrag], policy: .after(naechste)))
    }
}

struct MakroBalken: View {
    let name: String
    let wert: Int
    let ziel: Int
    let farbe: Color

    var body: some View {
        VStack(alignment: .leading, spacing: 3) {
            HStack(spacing: 2) {
                Text(name).foregroundColor(farbe)
                Text("\(wert)").foregroundColor(creme)
                Text("/\(ziel)g").foregroundColor(grau)
            }
            .font(.system(size: 11, weight: .semibold, design: .rounded))
            .lineLimit(1)
            .minimumScaleFactor(0.7)
            GeometryReader { geo in
                ZStack(alignment: .leading) {
                    Capsule().fill(Color.white.opacity(0.12))
                    Capsule().fill(farbe)
                        .frame(width: geo.size.width * (ziel > 0 ? min(1, CGFloat(wert) / CGFloat(ziel)) : 0))
                }
            }
            .frame(height: 4)
        }
    }
}

struct KcalRing: View {
    let m: Makros?
    var groesse: CGFloat = 76

    var body: some View {
        ZStack {
            Circle().stroke(Color.white.opacity(0.12), lineWidth: 7)
            Circle()
                .trim(from: 0, to: m?.anteil ?? 0)
                .stroke(amber, style: StrokeStyle(lineWidth: 7, lineCap: .round))
                .rotationEffect(.degrees(-90))
            VStack(spacing: 0) {
                Text(m.map { zahl($0.uebrig) } ?? "–")
                    .font(.system(size: groesse * 0.26, weight: .bold, design: .rounded))
                    .foregroundColor(creme)
                    .minimumScaleFactor(0.6)
                Text("kcal \(w.uebrig)")
                    .font(.system(size: 9, weight: .medium))
                    .foregroundColor(grau)
                    .lineLimit(1)
                    .minimumScaleFactor(0.7)
            }
            .padding(.horizontal, 6)
        }
        .frame(width: groesse, height: groesse)
    }
}

struct MakroAnsicht: View {
    let eintrag: MakroEintrag
    @Environment(\.widgetFamily) private var familie

    private var m: Makros? { eintrag.makros }

    var body: some View {
        if #available(iOSApplicationExtension 16.0, *) {
            switch familie {
            case .accessoryCircular: kreis
            case .accessoryRectangular: rechteck
            case .accessoryInline: zeile
            case .systemSmall: klein
            default: mittel
            }
        } else {
            mittel
        }
    }

    private var balken: some View {
        VStack(alignment: .leading, spacing: 7) {
            MakroBalken(name: w.p, wert: m?.protein ?? 0, ziel: m?.proteinZiel ?? 0, farbe: blau)
            MakroBalken(name: w.k, wert: m?.carbs ?? 0, ziel: m?.carbsZiel ?? 0, farbe: gruen)
            MakroBalken(name: w.f, wert: m?.fat ?? 0, ziel: m?.fatZiel ?? 0, farbe: rot)
        }
    }

    private var mittel: some View {
        HStack(spacing: 16) {
            KcalRing(m: m, groesse: 96)
            balken
        }
        .padding()
        .modifier(Grund())
    }

    private var klein: some View {
        VStack(spacing: 8) {
            KcalRing(m: m, groesse: 70)
            HStack(spacing: 6) {
                kurz(w.p, m?.protein, blau)
                kurz(w.k, m?.carbs, gruen)
                kurz(w.f, m?.fat, rot)
            }
        }
        .modifier(Grund())
    }

    private func kurz(_ name: String, _ wert: Int?, _ farbe: Color) -> some View {
        HStack(spacing: 1) {
            Text(name).foregroundColor(farbe)
            Text(wert.map { "\($0)" } ?? "–").foregroundColor(creme)
        }
        .font(.system(size: 11, weight: .semibold, design: .rounded))
        .lineLimit(1)
        .minimumScaleFactor(0.7)
    }

    @available(iOSApplicationExtension 16.0, *)
    private var kreis: some View {
        Gauge(value: m?.anteil ?? 0) {
            Image(systemName: "flame.fill")
        } currentValueLabel: {
            Text(m.map { "\($0.uebrig)" } ?? "–")
                .minimumScaleFactor(0.5)
                .widgetAccentable()
        }
        .gaugeStyle(.accessoryCircular)
        .modifier(KlarerGrund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var rechteck: some View {
        VStack(alignment: .leading, spacing: 1) {
            HStack(spacing: 4) {
                Image(systemName: "flame.fill")
                Text(m.map { "\(zahl($0.uebrig)) kcal \(w.uebrig)" } ?? "–")
                    .widgetAccentable()
            }
            .font(.system(size: 14, weight: .bold, design: .rounded))
            Text(m.map { "\(w.p) \($0.protein)/\($0.proteinZiel)" } ?? "\(w.p) –")
            Text(m.map { "\(w.k) \($0.carbs)/\($0.carbsZiel) · \(w.f) \($0.fat)/\($0.fatZiel)" } ?? "\(w.k) – · \(w.f) –")
        }
        .font(.system(size: 12, weight: .medium, design: .rounded))
        .lineLimit(1)
        .minimumScaleFactor(0.7)
        .frame(maxWidth: .infinity, alignment: .leading)
        .modifier(KlarerGrund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var zeile: some View {
        Label(m.map { "\(zahl($0.uebrig)) kcal · \(w.p) \($0.protein)g" } ?? "–", systemImage: "flame.fill")
            .modifier(KlarerGrund())
    }
}

struct FullRepMakros: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "FullRepWidget", provider: MakroVersorger()) { eintrag in
            MakroAnsicht(eintrag: eintrag)
        }
        .configurationDisplayName(w.makroName)
        .description(w.makroText)
        .supportedFamilies(familien)
    }
}

// MARK: - Schritte

struct SchrittEintrag: TimelineEntry {
    let date: Date
    let schritte: Int?
}

struct SchrittVersorger: TimelineProvider {
    private let store = HKHealthStore()

    // Erst HealthKit (frisch), sonst der Wert aus der App (nur, wenn er von
    // heute ist). nil = weder noch, z. B. Health nie verbunden.
    private func holen(_ fertig: @escaping (Int?) -> Void) {
        let ausApp: Int? = {
            guard let d = lesen(), d.datum == heuteString() else { return nil }
            return d.schritte
        }()
        guard HKHealthStore.isHealthDataAvailable(),
              let typ = HKQuantityType.quantityType(forIdentifier: .stepCount) else {
            fertig(ausApp); return
        }
        let start = Calendar.current.startOfDay(for: Date())
        let filter = HKQuery.predicateForSamples(withStart: start, end: Date(), options: .strictStartDate)
        let abfrage = HKStatisticsQuery(quantityType: typ, quantitySamplePredicate: filter,
                                        options: .cumulativeSum) { _, ergebnis, fehler in
            if fehler == nil, let summe = ergebnis?.sumQuantity() {
                let n = Int(summe.doubleValue(for: .count()))
                // Gesperrtes Geraet liefert 0 statt eines Fehlers, wenn keine
                // Daten lesbar sind — dann ist der App-Wert die bessere Zahl.
                fertig(max(n, ausApp ?? 0))
            } else {
                fertig(ausApp)
            }
        }
        store.execute(abfrage)
    }

    func placeholder(in context: Context) -> SchrittEintrag {
        SchrittEintrag(date: Date(), schritte: 6240)
    }

    func getSnapshot(in context: Context, completion: @escaping (SchrittEintrag) -> Void) {
        holen { n in completion(SchrittEintrag(date: Date(), schritte: n ?? 6240)) }
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<SchrittEintrag>) -> Void) {
        holen { n in
            let naechste = Calendar.current.date(byAdding: .minute, value: 15, to: Date()) ?? Date().addingTimeInterval(900)
            completion(Timeline(entries: [SchrittEintrag(date: Date(), schritte: n)], policy: .after(naechste)))
        }
    }
}

struct SchrittAnsicht: View {
    let eintrag: SchrittEintrag
    @Environment(\.widgetFamily) private var familie

    private var n: Int? { eintrag.schritte }
    private var anteil: Double { min(1, Double(n ?? 0) / SCHRITTZIEL) }

    var body: some View {
        if #available(iOSApplicationExtension 16.0, *) {
            switch familie {
            case .accessoryCircular: kreis
            case .accessoryRectangular: rechteck
            case .accessoryInline: zeile
            default: klein
            }
        } else {
            klein
        }
    }

    private var klein: some View {
        VStack(spacing: 6) {
            ZStack {
                Circle().stroke(Color.white.opacity(0.12), lineWidth: 7)
                Circle()
                    .trim(from: 0, to: anteil)
                    .stroke(amber, style: StrokeStyle(lineWidth: 7, lineCap: .round))
                    .rotationEffect(.degrees(-90))
                Image(systemName: "figure.walk")
                    .font(.system(size: 26, weight: .semibold))
                    .foregroundColor(amber)
            }
            .frame(width: 64, height: 64)
            Text(n.map { zahl($0) } ?? "–")
                .font(.system(size: 22, weight: .bold, design: .rounded))
                .foregroundColor(creme)
                .minimumScaleFactor(0.6)
            Text(n == nil ? w.ohneHealth : w.schritte)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(grau)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
        }
        .padding(8)
        .modifier(Grund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var kreis: some View {
        Gauge(value: anteil) {
            Image(systemName: "figure.walk")
        } currentValueLabel: {
            Text(n.map { $0 >= 10_000 ? String(format: "%.1fk", Double($0) / 1000) : "\($0)" } ?? "–")
                .minimumScaleFactor(0.5)
                .widgetAccentable()
        }
        .gaugeStyle(.accessoryCircular)
        .modifier(KlarerGrund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var rechteck: some View {
        VStack(alignment: .leading, spacing: 2) {
            HStack(spacing: 4) {
                Image(systemName: "figure.walk")
                Text(n.map { zahl($0) } ?? "–").widgetAccentable()
            }
            .font(.system(size: 18, weight: .bold, design: .rounded))
            Text(n == nil ? w.ohneHealth : w.schritte)
                .font(.system(size: 12, weight: .medium))
            Gauge(value: anteil) { EmptyView() }
                .gaugeStyle(.accessoryLinearCapacity)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .modifier(KlarerGrund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var zeile: some View {
        Label(n.map { "\(zahl($0)) \(w.schritte)" } ?? w.ohneHealth, systemImage: "figure.walk")
            .modifier(KlarerGrund())
    }
}

struct FullRepSchritte: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "FullRepSchritte", provider: SchrittVersorger()) { eintrag in
            SchrittAnsicht(eintrag: eintrag)
        }
        .configurationDisplayName(w.schritteName)
        .description(w.schritteText)
        .supportedFamilies(familienKlein)
    }
}

// MARK: - Bundle

private var familien: [WidgetFamily] {
    if #available(iOSApplicationExtension 16.0, *) {
        return [.systemSmall, .systemMedium, .accessoryCircular, .accessoryRectangular, .accessoryInline]
    }
    return [.systemSmall, .systemMedium]
}

private var familienKlein: [WidgetFamily] {
    if #available(iOSApplicationExtension 16.0, *) {
        return [.systemSmall, .accessoryCircular, .accessoryRectangular, .accessoryInline]
    }
    return [.systemSmall]
}

@main
struct FullRepWidgets: WidgetBundle {
    var body: some Widget {
        FullRepMakros()
        FullRepSchritte()
    }
}
