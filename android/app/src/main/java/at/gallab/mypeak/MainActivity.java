package at.gallab.mypeak;

import android.os.Bundle;
import android.webkit.WebView;

import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.getcapacitor.BridgeActivity;

/**
 * Liest die System-Leisten-Insets (Status- oben, Navigations-/Gesten-Leiste unten)
 * nativ aus und schreibt sie als CSS-Variablen --safe-area-inset-* in die WebView.
 * Zuverlässiger als env()/Plugins, weil unabhängig von der Chromium-Version.
 * Die App nutzt var(--safe-area-inset-bottom, env(...)) in der BottomNav.
 */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        final WebView webView = getBridge().getWebView();
        ViewCompat.setOnApplyWindowInsetsListener(webView, (v, windowInsets) -> {
            Insets bars = windowInsets.getInsets(WindowInsetsCompat.Type.systemBars());
            float density = getResources().getDisplayMetrics().density;
            int top = Math.round(bars.top / density);
            int bottom = Math.round(bars.bottom / density);
            final String js =
                "document.documentElement.style.setProperty('--safe-area-inset-top','" + top + "px');" +
                "document.documentElement.style.setProperty('--safe-area-inset-bottom','" + bottom + "px');";
            webView.post(() -> webView.evaluateJavascript(js, null));
            return windowInsets;
        });
    }
}
