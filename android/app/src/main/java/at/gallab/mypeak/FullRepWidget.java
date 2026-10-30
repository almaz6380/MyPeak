package at.gallab.mypeak;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;

import org.json.JSONObject;

/**
 * Homescreen-Widget: kcal uebrig, Protein, Kohlenhydrate, Fett, Schritte und
 * verbrannte kcal von heute (seit 1.6.1, vorher Streak/Woche/Level).
 *
 * Die Zahlen kommen aus der SharedPreferences-Datei "FullRepWidget" —
 * geschrieben von der WebView-Seite ueber @capacitor/preferences mit
 * configure({group:'FullRepWidget'}) (src/lib/widgetDaten.js). Das Widget
 * liest nur; kann es nichts lesen (frische Installation, noch kein Start),
 * zeigt es Striche statt Nullen — Striche sagen "noch keine Daten".
 * Schritte: das Hoehere aus dem App-Wert (Health Connect) und dem eigenen
 * Schrittzaehler (SchrittZaehler, seit 1.6.2, vom SchrittWorker alle 15 min
 * aufgefrischt). Verbrannte kcal kommen nur aus Health Connect ueber die App.
 *
 * ⚠ Capacitor Preferences speichert Werte als JSON-STRING unter dem Key —
 * hier also ein JSON-Objekt im String "widget.daten".
 */
public class FullRepWidget extends AppWidgetProvider {

    private static final String PREFS = "FullRepWidget";
    private static final String KEY = "widget.daten";

    @Override
    public void onUpdate(Context context, AppWidgetManager manager, int[] ids) {
        for (int id : ids) {
            manager.updateAppWidget(id, bauen(context));
        }
    }

    /** Von MainActivity.onPause() gerufen: frisch geschriebene Daten sofort anzeigen. */
    public static void aktualisieren(Context context) {
        AppWidgetManager manager = AppWidgetManager.getInstance(context);
        int[] ids = manager.getAppWidgetIds(new ComponentName(context, FullRepWidget.class));
        if (ids != null && ids.length > 0) {
            manager.updateAppWidget(ids, bauen(context));
        }
    }

    private static String heute() {
        return new java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.US).format(new java.util.Date());
    }

    private static RemoteViews bauen(Context context) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.fullrep_widget);

        String kcal = "–";
        String protein = "–";
        String carbs = "–";
        String fat = "–";
        String schritte = "–";
        String verbrannt = "–";
        Integer geraet = SchrittZaehler.INSTANCE.gespeichert(context);
        if (geraet != null) schritte = String.valueOf(geraet);
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            String roh = prefs.getString(KEY, null);
            if (roh != null) {
                JSONObject j = new JSONObject(roh);
                if (j.has("kcalZiel")) {
                    // Werte von gestern gelten nach Mitternacht nicht mehr:
                    // dann 0 gegessen, das Ziel bleibt.
                    boolean heute = heute().equals(j.optString("datum", ""));
                    int gegessen = heute ? j.optInt("kcal", 0) : 0;
                    kcal = String.valueOf(Math.max(0, j.optInt("kcalZiel", 0) - gegessen));
                    protein = (heute ? j.optInt("protein", 0) : 0) + "g";
                    carbs = (heute ? j.optInt("carbs", 0) : 0) + "g";
                    fat = (heute ? j.optInt("fat", 0) : 0) + "g";
                    if (heute && j.has("schritte") && !j.isNull("schritte")) {
                        int ausApp = j.optInt("schritte", 0);
                        schritte = String.valueOf(geraet != null ? Math.max(geraet, ausApp) : ausApp);
                    }
                    if (heute && j.has("kcalVerbrannt") && !j.isNull("kcalVerbrannt")) {
                        verbrannt = String.valueOf(j.optInt("kcalVerbrannt", 0));
                    }
                }
            }
        } catch (Exception ignored) {
            // Kaputtes JSON ⇒ Striche. Ein Widget darf nie werfen.
        }

        views.setTextViewText(R.id.widget_kcal_wert, kcal);
        views.setTextViewText(R.id.widget_protein_wert, protein);
        views.setTextViewText(R.id.widget_carbs_wert, carbs);
        views.setTextViewText(R.id.widget_fat_wert, fat);
        views.setTextViewText(R.id.widget_schritte_wert, schritte);
        views.setTextViewText(R.id.widget_verbrannt_wert, verbrannt);

        // Tipp aufs Widget oeffnet die App.
        Intent start = new Intent(context, MainActivity.class);
        PendingIntent pi = PendingIntent.getActivity(
                context, 0, start,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_wurzel, pi);

        return views;
    }
}
