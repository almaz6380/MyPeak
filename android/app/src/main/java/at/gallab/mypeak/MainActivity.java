package at.gallab.mypeak;

import com.getcapacitor.BridgeActivity;

/**
 * Edge-to-Edge / Safe-Area wird vollständig von Capacitors eingebautem SystemBars-Plugin
 * geregelt: Es padded den WebView-Parent bzw. injiziert die CSS-Variable
 * --safe-area-inset-bottom (die die BottomNav liest). KEIN eigener WindowInsets-Listener
 * hier — ein konkurrierender Listener macht Capacitors Safe-Area-Neuberechnung kaputt.
 */
public class MainActivity extends BridgeActivity {}
