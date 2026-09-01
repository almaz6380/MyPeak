import WidgetKit
import SwiftUI

// Homescreen-Widget: Streak, Workouts diese Woche, Level — FullRep-Look
// (Schwarz + Amber), systemMedium.
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

    private var amber: Color { Color(red: 0.984, green: 0.749, blue: 0.141) } // #FBBF24

    var body: some View {
        HStack {
            Spalte(wert: eintrag.daten.map { "\($0.streak)" } ?? "–",
                   name: String(localized: "Streak"), farbe: amber)
            Spalte(wert: eintrag.daten.map { "\($0.workoutsWoche)" } ?? "–",
                   name: String(localized: "Woche"))
            Spalte(wert: eintrag.daten.map { "\($0.level)" } ?? "–",
                   name: String(localized: "Level"))
        }
        .padding()
        // containerBackground ist ab iOS 17 Pflicht; darunter Fallback.
        .modifier(Grund())
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
        .supportedFamilies([.systemMedium])
    }
}
