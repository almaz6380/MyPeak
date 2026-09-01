import UIKit
import Capacitor
import WidgetKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

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
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
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
