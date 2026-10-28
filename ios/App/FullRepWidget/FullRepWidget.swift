import WidgetKit
import SwiftUI

// Widget: Streak, Workouts diese Woche, Level. Homescreen klein/mittel im
// FullRep-Look (Schwarz + Amber), ab iOS 16 auch Sperrbildschirm (einfarbig).
//
// Datenweg: WebView schreibt per @capacitor/preferences in
// UserDefaults.standard (Key "FullRepWidget.widget.daten"); der AppDelegate
// kopiert den Wert beim Verlassen der App in die App-Group-Suite
// group.at.gallab.mypeak und stoesst WidgetCenter an. Hier wird NUR gelesen.
// Ohne Daten (frische Installation): Striche — eine 0 saehe nach verlorenem
// Streak aus.

private let SUITE = "group.at.gallab.mypeak"
private let KEY = "widget.daten"

struct Daten: Decodable {
    let streak: Int
    let level: Int
    let workoutsWoche: Int
}

struct Eintrag: TimelineEntry {
    let date: Date
    let daten: Daten?
}

struct Versorger: TimelineProvider {
    private func lesen() -> Daten? {
        guard let roh = UserDefaults(suiteName: SUITE)?.string(forKey: KEY),
              let d = roh.data(using: .utf8) else { return nil }
        return try? JSONDecoder().decode(Daten.self, from: d)
    }

    func placeholder(in context: Context) -> Eintrag {
        Eintrag(date: Date(), daten: Daten(streak: 7, level: 4, workoutsWoche: 3))
    }

    func getSnapshot(in context: Context, completion: @escaping (Eintrag) -> Void) {
        completion(Eintrag(date: Date(), daten: lesen() ?? Daten(streak: 7, level: 4, workoutsWoche: 3)))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Eintrag>) -> Void) {
        // Ein Eintrag reicht: Frische kommt vom reloadAllTimelines des
        // AppDelegate; .after(30 min) faengt nur den Tageswechsel der
        // Wochenzaehlung ab, falls die App lange zu bleibt.
        let eintrag = Eintrag(date: Date(), daten: lesen())
        let naechste = Calendar.current.date(byAdding: .minute, value: 30, to: Date()) ?? Date().addingTimeInterval(1800)
        completion(Timeline(entries: [eintrag], policy: .after(naechste)))
    }
}

struct Spalte: View {
    let wert: String
    let name: String
    var farbe: Color = Color(red: 1.0, green: 0.973, blue: 0.906) // Creme #FFF8E7

    var body: some View {
        VStack(spacing: 2) {
            Text(wert)
                .font(.system(size: 26, weight: .bold, design: .rounded))
                .foregroundColor(farbe)
            Text(name)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Color(red: 0.659, green: 0.635, blue: 0.62)) // #A8A29E
        }
        .frame(maxWidth: .infinity)
    }
}

struct WidgetAnsicht: View {
    let eintrag: Eintrag
    @Environment(\.widgetFamily) private var familie

    private var amber: Color { Color(red: 0.984, green: 0.749, blue: 0.141) } // #FBBF24
    private var streak: String { eintrag.daten.map { "\($0.streak)" } ?? "–" }
    private var woche: String { eintrag.daten.map { "\($0.workoutsWoche)" } ?? "–" }
    private var level: String { eintrag.daten.map { "\($0.level)" } ?? "–" }

    var body: some View {
        // Sperrbildschirm (accessory*) gibt es erst ab iOS 16. Dort zeichnet
        // das System einfarbig; Symbole statt Woerter, weil die Extension
        // keine Uebersetzungen hat.
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

    private var mittel: some View {
        HStack {
            Spalte(wert: streak, name: String(localized: "Streak"), farbe: amber)
            Spalte(wert: woche, name: String(localized: "Woche"))
            Spalte(wert: level, name: String(localized: "Level"))
        }
        .padding()
        // containerBackground ist ab iOS 17 Pflicht; darunter Fallback.
        .modifier(Grund())
    }

    private var klein: some View {
        VStack(spacing: 6) {
            HStack(spacing: 4) {
                Image(systemName: "flame.fill").foregroundColor(amber)
                Text(streak)
                    .font(.system(size: 34, weight: .bold, design: .rounded))
                    .foregroundColor(amber)
            }
            HStack(spacing: 12) {
                Label(woche, systemImage: "dumbbell.fill")
                Label(level, systemImage: "star.fill")
            }
            .font(.system(size: 13, weight: .semibold))
            .foregroundColor(Color(red: 1.0, green: 0.973, blue: 0.906))
        }
        .modifier(Grund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var kreis: some View {
        ZStack {
            AccessoryWidgetBackground()
            VStack(spacing: 0) {
                Image(systemName: "flame.fill").font(.system(size: 12))
                Text(streak)
                    .font(.system(size: 22, weight: .bold, design: .rounded))
                    .widgetAccentable()
            }
        }
        .modifier(KlarerGrund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var rechteck: some View {
        VStack(alignment: .leading, spacing: 1) {
            Label { Text(streak).widgetAccentable() } icon: { Image(systemName: "flame.fill") }
            Label(woche, systemImage: "dumbbell.fill")
            Label(level, systemImage: "star.fill")
        }
        .font(.system(size: 14, weight: .semibold, design: .rounded))
        .frame(maxWidth: .infinity, alignment: .leading)
        .modifier(KlarerGrund())
    }

    @available(iOSApplicationExtension 16.0, *)
    private var zeile: some View {
        Label("\(streak) · \(woche) · Lv \(level)", systemImage: "flame.fill")
            .modifier(KlarerGrund())
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

@main
struct FullRepWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "FullRepWidget", provider: Versorger()) { eintrag in
            WidgetAnsicht(eintrag: eintrag)
        }
        .configurationDisplayName("FullRep")
        .description(String(localized: "Streak, Workouts diese Woche und Level auf einen Blick."))
        .supportedFamilies(familien)
    }

    private var familien: [WidgetFamily] {
        if #available(iOSApplicationExtension 16.0, *) {
            return [.systemSmall, .systemMedium, .accessoryCircular, .accessoryRectangular, .accessoryInline]
        }
        return [.systemMedium]
    }
}
