import Foundation
import Capacitor
import HealthKit
import CoreMotion

/// Workouts nach Apple Health SCHREIBEN — Gegenstueck zu capacitor-health,
/// das nur lesen kann. Geschrieben wird genau ein HKWorkout je Training
/// (Art, Start, Ende), keine Kalorien, kein Puls: Was wir nicht messen,
/// erfinden wir nicht. Aufgerufen aus src/lib/health.js, nur wenn der Nutzer
/// im Profil „Workouts nach Health schreiben" eingeschaltet hat.
///
/// Angemeldet wird das Plugin in FullRepBridgeViewController (unten): Eigene
/// Plugins im App-Projekt findet Capacitor nicht von selbst, nur npm-Pakete.
@objc(HealthExportPlugin)
public class HealthExportPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "HealthExportPlugin"
    public let jsName = "HealthExport"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "saveWorkout", returnType: CAPPluginReturnPromise),
    ]

    private let store = HKHealthStore()

    private var schreibenErlaubt: Bool {
        store.authorizationStatus(for: HKObjectType.workoutType()) == .sharingAuthorized
    }

    @objc func requestAuthorization(_ call: CAPPluginCall) {
        guard HKHealthStore.isHealthDataAvailable() else {
            call.resolve(["granted": false])
            return
        }
        // Fuer SCHREIBrechte verraet HealthKit den Status (anders als beim Lesen).
        store.requestAuthorization(toShare: [HKObjectType.workoutType()], read: nil) { _, _ in
            call.resolve(["granted": self.schreibenErlaubt])
        }
    }

    @objc func saveWorkout(_ call: CAPPluginCall) {
        guard let start = Self.datum(call.getString("start")),
              let ende = Self.datum(call.getString("end")),
              ende > start else {
            call.reject("start/end fehlen oder sind ungueltig")
            return
        }
        guard HKHealthStore.isHealthDataAvailable(), schreibenErlaubt else {
            call.resolve(["saved": false])
            return
        }

        let konfiguration = HKWorkoutConfiguration()
        konfiguration.activityType = Self.aktivitaet(call.getString("type") ?? "strength",
                                                    call.getString("activity"))
        let builder = HKWorkoutBuilder(healthStore: store, configuration: konfiguration, device: .local())

        var metadaten: [String: Any] = [:]
        if let id = call.getString("id") {
            // Gleiche Kennung = dasselbe Workout: eine Wiederholung ueberschreibt statt zu verdoppeln
            metadaten[HKMetadataKeySyncIdentifier] = id
            metadaten[HKMetadataKeySyncVersion] = 1
        }

        builder.beginCollection(withStart: start) { ok, fehler in
            guard ok else {
                call.reject("Workout nicht begonnen: \(fehler?.localizedDescription ?? "")")
                return
            }
            builder.addMetadata(metadaten) { _, _ in
                builder.endCollection(withEnd: ende) { ok, fehler in
                    guard ok else {
                        call.reject("Workout nicht beendet: \(fehler?.localizedDescription ?? "")")
                        return
                    }
                    builder.finishWorkout { workout, fehler in
                        if let fehler = fehler {
                            call.reject("Workout nicht gespeichert: \(fehler.localizedDescription)")
                        } else {
                            call.resolve(["saved": workout != nil])
                        }
                    }
                }
            }
        }
    }

    /// JS liefert toISOString(), also mit Millisekunden.
    private static func datum(_ text: String?) -> Date? {
        guard let text = text else { return nil }
        let mitBruch = ISO8601DateFormatter()
        mitBruch.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return mitBruch.date(from: text) ?? ISO8601DateFormatter().date(from: text)
    }

    /// typ = Workout-Typ der App, aktivitaet = cardioType bzw. martialArtsCategory
    /// aus src/data/exercises.js.
    private static func aktivitaet(_ typ: String, _ aktivitaet: String?) -> HKWorkoutActivityType {
        switch typ {
        case "strength": return .traditionalStrengthTraining
        case "hiit": return .highIntensityIntervalTraining
        case "circuit": return .functionalStrengthTraining
        case "martial-arts":
            if aktivitaet == "boxing" { return .boxing }
            if aktivitaet == "kickboxing" { return .kickboxing }
            return .martialArts
        case "cardio":
            switch aktivitaet {
            case "running": return .running
            case "cycling": return .cycling
            case "walking": return .walking
            case "rowing": return .rowing
            case "swimming": return .swimming
            case "elliptical": return .elliptical
            case "stepmill": return .stairClimbing
            case "jumprope": return .jumpRope
            default: return .other
            }
        default: return .other
        }
    }
}

/// Schritte direkt vom Bewegungschip (Core Motion) — ohne Apple Health.
/// Der Chip zaehlt auch bei geschlossener App; CMPedometer liest bis zu 7 Tage
/// zurueck. Braucht nur „Bewegung & Fitness" (NSMotionUsageDescription), keine
/// Capability und kein neues Profil. Steht in dieser Datei, damit das pbxproj
/// keine weitere Quelldatei braucht.
@objc(SchrittePlugin)
public class SchrittePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SchrittePlugin"
    public let jsName = "Schritte"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "heute", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "erlauben", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "verlauf", returnType: CAPPluginReturnPromise),
    ]

    private let pedometer = CMPedometer()

    private func status() -> String {
        guard CMPedometer.isStepCountingAvailable() else { return "nicht_verfuegbar" }
        switch CMPedometer.authorizationStatus() {
        case .authorized: return "erlaubt"
        case .denied, .restricted: return "verweigert"
        default: return "offen"
        }
    }

    /// Die erste Abfrage loest den Systemdialog aus — einen eigenen
    /// „Anfragen"-Aufruf hat Core Motion nicht.
    @objc func erlauben(_ call: CAPPluginCall) {
        abfragen { schritte in call.resolve(self.antwort(schritte)) }
    }

    @objc func heute(_ call: CAPPluginCall) {
        let s = status()
        // Nie von selbst nachfragen: Ohne Zustimmung im Profil bleibt es still.
        guard s == "erlaubt" else {
            call.resolve(["status": s])
            return
        }
        abfragen { schritte in call.resolve(self.antwort(schritte)) }
    }

    /// Tageswerte der letzten `tage` Tage. Core Motion haelt nur 7 Tage vor,
    /// aeltere Tage fehlen in der Antwort (der Verlauf nimmt dann Health bzw.
    /// das eigene Protokoll der App).
    @objc func verlauf(_ call: CAPPluginCall) {
        guard status() == "erlaubt" else {
            call.resolve(["tage": []])
            return
        }
        let tage = min(max(call.getInt("tage") ?? 7, 1), 7)
        let kalender = Calendar.current
        let heute = kalender.startOfDay(for: Date())
        let format = DateFormatter()
        format.calendar = Calendar(identifier: .gregorian)
        format.locale = Locale(identifier: "en_US_POSIX")
        format.dateFormat = "yyyy-MM-dd"

        let gruppe = DispatchGroup()
        let sperre = NSLock()
        var liste: [[String: Any]] = []
        for i in 0..<tage {
            guard let start = kalender.date(byAdding: .day, value: -i, to: heute),
                  let ende = kalender.date(byAdding: .day, value: 1, to: start) else { continue }
            gruppe.enter()
            pedometer.queryPedometerData(from: start, to: min(ende, Date())) { daten, _ in
                if let n = daten?.numberOfSteps.intValue {
                    sperre.lock()
                    liste.append(["datum": format.string(from: start), "schritte": n])
                    sperre.unlock()
                }
                gruppe.leave()
            }
        }
        gruppe.notify(queue: .main) {
            call.resolve(["tage": liste])
        }
    }

    private func antwort(_ schritte: Int?) -> [String: Any] {
        var a: [String: Any] = ["status": status()]
        if let n = schritte { a["schritte"] = n }
        return a
    }

    private func abfragen(_ fertig: @escaping (Int?) -> Void) {
        guard CMPedometer.isStepCountingAvailable() else { return fertig(nil) }
        let start = Calendar.current.startOfDay(for: Date())
        pedometer.queryPedometerData(from: start, to: Date()) { daten, _ in
            fertig(daten.map { $0.numberOfSteps.intValue })
        }
    }
}

/// Main.storyboard zeigt auf diese Klasse statt auf CAPBridgeViewController,
/// damit die eigenen Plugins angemeldet werden.
class FullRepBridgeViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(HealthExportPlugin())
        bridge?.registerPluginInstance(SchrittePlugin())
    }
}
