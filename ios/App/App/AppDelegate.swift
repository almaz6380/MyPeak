import UIKit
import Capacitor
import WidgetKit
import AppTrackingTransparency

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    /// Merker, damit zwei Vordergrund-Wechsel kurz hintereinander nicht zwei
    /// Dialoge anfordern. Wird in der Rueckmeldung wieder geloescht: Kam kein
    /// Dialog, soll der naechste Wechsel es erneut versuchen duerfen.
    private var trackingAbfrageLaeuft = false

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        return true
    }

    /// Widget-Daten in die App-Group-Suite spiegeln.
    ///
    /// ⚠ Warum kopieren: @capacitor/preferences schreibt auf iOS IMMER in
    /// UserDefaults.standard — `group` ist dort nur ein Schluessel-Praefix,
    /// KEINE Suite (nachgelesen in Preferences.swift des Plugins). Die
    /// Widget-Extension kann aber nur die App-Group-Suite lesen. Gespiegelt
    /// wird beim Verlassen der App — genau dann, wenn das Widget wieder
    /// sichtbar wird. Nativ im AppDelegate statt ueber die Bruecke: dieselbe
    /// Regel wie bei Anigosha (Systemnahes gehoert in den AppDelegate).
    private func widgetDatenSpiegeln() {
        let standard = UserDefaults.standard
        guard let wert = standard.string(forKey: "FullRepWidget.widget.daten"),
              let suite = UserDefaults(suiteName: "group.at.gallab.mypeak") else { return }
        suite.set(wert, forKey: "widget.daten")
        WidgetCenter.shared.reloadAllTimelines()
    }

    func applicationWillResignActive(_ application: UIApplication) {
        widgetDatenSpiegeln()
    }

    func applicationDidEnterBackground(_ application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(_ application: UIApplication) {
        // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(_ application: UIApplication) {
        frageNachTracking()
    }

    // MARK: - App Tracking Transparency
    //
    //  Der ATT-Dialog wird NATIV angefordert, nicht mehr aus src/lib/ads.js.
    //  Gleiche Vorlage wie bei Anigosha (Commit b534db5 dort), gleicher Grund:
    //  `AdMob.requestTrackingAuthorization()` aus @capacitor-community/admob
    //  ruft `ATTrackingManager` direkt in der Plugin-Methode auf, und Capacitor
    //  fuehrt Plugin-Aufrufe auf einer eigenen Hintergrund-Warteschlange aus.
    //  Ein UIKit-Dialog gehoert auf den Hauptthread. Dazu kam der Zeitpunkt:
    //  ads.js lief 1,5 s nach dem Start, waehrend die App oft noch nicht
    //  `.active` war — dann beantwortet iOS die Anfrage still mit
    //  notDetermined, ohne etwas zu zeigen. Apple hat genau das bei Anigosha
    //  am 12.08.2026 beanstandet (Richtlinie 2.1).
    //
    //  Ohne erteiltes ATT gibt es keine IDFA, und jede Anzeige ist
    //  nicht-personalisiert — das ist der halbe bis dreiviertel eCPM.
    //  Hier ist beides ausgeschlossen: `applicationDidBecomeActive` heisst
    //  aktiv, `DispatchQueue.main` heisst Hauptthread. ads.js wartet auf die
    //  Antwort, bevor es das AdMob-SDK startet — so verlangt es Google.
    private func frageNachTracking() {
        guard !trackingAbfrageLaeuft else { return }
        // Schon beantwortet (auch „abgelehnt") — iOS zeigt den Dialog dann
        // ohnehin kein zweites Mal, die Antwort aendert man in den Einstellungen.
        guard ATTrackingManager.trackingAuthorizationStatus == .notDetermined else { return }
        trackingAbfrageLaeuft = true

        // Kleiner Abstand: Beim Kaltstart kommt didBecomeActive, waehrend das
        // Fenster noch aufgebaut wird. Ein Dialog in genau diesem Moment hat
        // niemanden, der ihn zeigen koennte.
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { [weak self] in
            guard UIApplication.shared.applicationState == .active else {
                self?.trackingAbfrageLaeuft = false
                return
            }
            ATTrackingManager.requestTrackingAuthorization { _ in
                self?.trackingAbfrageLaeuft = false
            }
        }
    }

    func applicationWillTerminate(_ application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }

    func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
        // Called when the app was launched with a url. Feel free to add additional processing here,
        // but if you want the App API to support tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
    }

    func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        // Called when the app was launched with an activity, including Universal Links.
        // Feel free to add additional processing here, but if you want the App API to support
        // tracking app url opens, make sure to keep this call
        return ApplicationDelegateProxy.shared.application(application, continue: userActivity, restorationHandler: restorationHandler)
    }

}
