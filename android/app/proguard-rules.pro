# R8-Regeln fuer den Release-Build. Aktiv seit minifyEnabled=true (03.09.2026).
#
# WARUM: Google verlangt seit 2026, dass Release-Builds verkleinert und
# verschleiert sind (Play-Release-Dashboard: „App-Optimierung liegt unter
# unserem Grenzwert — Verschleierung 2 %", Grenzwert 25 %, Frist Februar 2027).
# Ohne diese Datei wuerde R8 Klassen wegwerfen oder umbenennen, die zur
# Laufzeit per Reflection gebraucht werden — und das faellt NICHT beim Bauen
# auf, sondern erst am Geraet, meist als stiller Ausfall eines Plugins.
#
# WAS SCHON ABGEDECKT IST, ohne dass es hier steht:
#   - Capacitor liefert eigene Regeln als consumerProguardFiles mit
#     (node_modules/@capacitor/android/capacitor/proguard-rules.pro):
#     alle Klassen, die com.getcapacitor.Plugin erweitern, bleiben komplett
#     erhalten. Das deckt AdMob, In-App-Review, Local Notifications,
#     Preferences, RevenueCat und capacitor-health ab — keines der sechs
#     Plugins bringt eigene Regeln mit, keines braucht sie deshalb.
#   - MainActivity und FullRepWidget stehen im Manifest; was dort steht,
#     behaelt R8 von selbst. FullRepWidget nutzt nur org.json (Android-
#     Framework) und SharedPreferences, keine Reflection.
#   - Google Mobile Ads, Play Billing, Firebase und RevenueCat liefern ihre
#     Regeln in den AARs mit (proguard.txt im Archiv).
#
# WAS HIER STEHT, ist deshalb bewusst wenig — nur Dinge, die Fehlersuche
# retten oder erfahrungsgemaess trotzdem kippen.

# ── Lesbare Absturzberichte ──────────────────────────────────────────────
# Ohne diese beiden Zeilen zeigt die Play Console nach der Verschleierung nur
# noch a.b.c(Unknown Source). Mit ihnen bleiben Dateiname und Zeilennummer im
# Stacktrace; das Mapping (mapping.txt) legt der Workflow als Artefakt ab.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# Annotationen und Signaturen: Capacitor findet Plugin-Methoden ueber
# @PluginMethod, RevenueCat liest generische Typen zur Laufzeit.
-keepattributes *Annotation*,Signature,InnerClasses,EnclosingMethod

# ── Capacitor-Bruecke: WebView <-> Java ─────────────────────────────────
# Methoden mit @JavascriptInterface werden aus JavaScript per Namen
# aufgerufen. proguard-android.txt behaelt sie zwar — doppelt haelt besser,
# denn ein Umbenennen hier bricht JEDEN nativen Aufruf der App.
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
-keep class com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**

# ── Plugins, gehaertet gegen kuenftige Capacitor-Aenderungen ─────────────
# Die Capacitor-Regel wirkt ueber die Vererbung von Plugin. Sollte ein
# Plugin einmal Hilfsklassen per Reflection laden (AdMob tut das fuer
# Anzeigenformate), sind die Pakete hier komplett festgehalten. Kostet ein
# paar Kilobyte, spart eine Geraete-Fehlersuche.
-keep class com.getcapacitor.community.** { *; }
-keep class com.capacitorjs.plugins.** { *; }
-keep class com.revenuecat.purchases.capacitor.** { *; }
-keep class com.fit_up.health.capacitor.** { *; }

# ── Google Mobile Ads / UMP ──────────────────────────────────────────────
# Werbe-IDs und Einwilligung laufen ueber Reflection in GMS. Die AAR bringt
# Regeln mit; diese hier fangen Warnungen ab, die den Build sonst stoppen.
-keep public class com.google.android.gms.ads.** { public *; }
-keep public class com.google.ads.** { public *; }
-dontwarn com.google.android.gms.**

# ── Play Billing (ueber RevenueCat) ──────────────────────────────────────
-keep class com.android.vending.billing.** { *; }
-keep class com.android.billingclient.** { *; }

# ── Health Connect ───────────────────────────────────────────────────────
# Der Client bildet Datentypen ueber Klassennamen ab (Records, Permissions).
-keep class androidx.health.connect.client.** { *; }
-dontwarn androidx.health.connect.**

# ── Kotlin-Metadaten (RevenueCat und Health Connect sind Kotlin) ─────────
-keep class kotlin.Metadata { *; }
-dontwarn kotlin.**
-dontwarn kotlinx.**

# ── Rauschen, das den Build sonst mit "Missing class" abbricht ───────────
-dontwarn org.slf4j.**
-dontwarn javax.annotation.**
