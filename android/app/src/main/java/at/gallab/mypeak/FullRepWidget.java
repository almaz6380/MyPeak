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
 * Homescreen-Widget: kcal uebrig, Protein, Kohlenhydrate, Fett und Schritte
 * von heute (seit 1.6.1, vorher Streak/Woche/Level).
 *
 * Die Zahlen kommen aus der SharedPreferences-Datei "FullRepWidget" —
 * geschrieben von der WebView-Seite ueber @capacitor/preferences mit
 * configure({group:'FullRepWidget'}) (src/lib/widgetDaten.js). Das Widget
 * liest nur; kann es nichts lesen (frische Installation, noch kein Start),
 * zeigt es Striche statt Nullen — Striche sagen "noch keine Daten".
 * Schritte kommen nur aus der App (ohne Health-Verbindung: Strich); Android
 * hat keine Sperrbildschirm-Widgets, und Health Connect aus dem Widget heraus
 * zu lesen braucht einen eigenen Hintergrunddienst — das lohnt sich hier nicht.
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
                    if (heute && !j.isNull("schritte") && j.has("schritte")) {
                        schritte = String.valueOf(j.optInt("schritte", 0));
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

        // Tipp aufs Widget oeffnet die App.
        Intent start = new Intent(context, MainActivity.class);
        PendingIntent pi = PendingIntent.getActivity(
                context, 0, start,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_wurzel, pi);

        return views;
    }
}
