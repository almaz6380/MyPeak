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
 * Homescreen-Widget: Streak, Workouts diese Woche, Level.
 *
 * Die Zahlen kommen aus der SharedPreferences-Datei "FullRepWidget" —
 * geschrieben von der WebView-Seite ueber @capacitor/preferences mit
 * configure({group:'FullRepWidget'}) (src/lib/widgetDaten.js). Das Widget
 * liest nur; kann es nichts lesen (frische Installation, noch kein Start),
 * zeigt es Striche statt Nullen — Striche sagen "noch keine Daten",
 * eine 0 saehe nach verlorenem Streak aus.
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

    private static RemoteViews bauen(Context context) {
        RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.fullrep_widget);

        String streak = "–";
        String woche = "–";
        String level = "–";
        try {
            SharedPreferences prefs = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE);
            String roh = prefs.getString(KEY, null);
            if (roh != null) {
                JSONObject j = new JSONObject(roh);
                streak = String.valueOf(j.optInt("streak", 0));
                woche = String.valueOf(j.optInt("workoutsWoche", 0));
                level = String.valueOf(j.optInt("level", 1));
            }
        } catch (Exception ignored) {
            // Kaputtes JSON ⇒ Striche. Ein Widget darf nie werfen.
        }

        views.setTextViewText(R.id.widget_streak, streak);
        views.setTextViewText(R.id.widget_woche, woche);
        views.setTextViewText(R.id.widget_level, level);

        // Tipp aufs Widget oeffnet die App.
        Intent start = new Intent(context, MainActivity.class);
        PendingIntent pi = PendingIntent.getActivity(
                context, 0, start,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.widget_wurzel, pi);

        return views;
    }
}
