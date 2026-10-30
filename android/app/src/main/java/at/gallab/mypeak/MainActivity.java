package at.gallab.mypeak;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

/**
 * Edge-to-Edge / Safe-Area wird vollständig von Capacitors eingebautem SystemBars-Plugin
 * geregelt: Es padded den WebView-Parent bzw. injiziert die CSS-Variable
 * --safe-area-inset-bottom (die die BottomNav liest). KEIN eigener WindowInsets-Listener
 * hier — ein konkurrierender Listener macht Capacitors Safe-Area-Neuberechnung kaputt.
 */
public class MainActivity extends BridgeActivity {

    /**
     * Eigene Plugins im App-Projekt (keine npm-Pakete) muss man vor
     * super.onCreate anmelden — danach ist die Bridge schon gebaut.
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        registerPlugin(HealthExportPlugin.class);
        registerPlugin(SchrittePlugin.class);
        super.onCreate(savedInstanceState);
    }

    /**
     * Beim Verlassen der App das Homescreen-Widget auffrischen. Die WebView hat
     * bis hierher die aktuellen Zahlen in die SharedPreferences geschrieben
     * (src/lib/widgetDaten.js); ohne diesen Anstoß sähe das Widget sie erst
     * beim nächsten 30-Minuten-Tick.
     */
    @Override
    public void onPause() {
        super.onPause();
        try {
            FullRepWidget.aktualisieren(this);
        } catch (Exception ignored) {
            // Widget-Refresh darf die App nie stören.
        }
    }
}
