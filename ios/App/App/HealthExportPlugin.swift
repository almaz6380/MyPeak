import Foundation
import Capacitor
import HealthKit

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

/// Main.storyboard zeigt auf diese Klasse statt auf CAPBridgeViewController,
/// damit HealthExportPlugin angemeldet wird.
class FullRepBridgeViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(HealthExportPlugin())
    }
}
