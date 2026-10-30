package at.gallab.mypeak

import android.Manifest
import android.content.Context
import android.content.SharedPreferences
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import androidx.core.content.ContextCompat
import androidx.work.CoroutineWorker
import androidx.work.ExistingPeriodicWorkPolicy
import androidx.work.PeriodicWorkRequestBuilder
import androidx.work.WorkManager
import androidx.work.WorkerParameters
import com.getcapacitor.JSArray
import com.getcapacitor.JSObject
import com.getcapacitor.PermissionState
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.getcapacitor.annotation.Permission
import com.getcapacitor.annotation.PermissionCallback
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.coroutines.withTimeoutOrNull
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale
import java.util.concurrent.TimeUnit
import kotlin.coroutines.resume

/**
 * Schritte selbst zählen, ohne Health Connect (seit 1.6.2).
 *
 * Der Sensor TYPE_STEP_COUNTER zählt im Chip weiter, auch wenn FullRep zu ist,
 * aber nur als Summe seit dem letzten Neustart. Tageswerte entstehen, indem
 * SchrittWorker den Zähler alle 15 Minuten kurz ausliest und die Tagesbasis
 * merkt — kein Foreground-Service, keine Daueranzeige.
 *
 * Grenze, bewusst hingenommen: Schritte zwischen der letzten Messung vor
 * Mitternacht und Mitternacht landen im neuen Tag (höchstens 15 Minuten).
 *
 * Abgelegt in der SharedPreferences-Datei "FullRepWidget", damit das Widget
 * die Zahl ohne App-Start lesen kann.
 */
@CapacitorPlugin(
    name = "Schritte",
    permissions = [Permission(alias = "bewegung", strings = [Manifest.permission.ACTIVITY_RECOGNITION])]
)
class SchrittePlugin : Plugin() {

    override fun load() {
        super.load()
        if (SchrittZaehler.erlaubt(context)) SchrittWorker.planen(context)
    }

    @PluginMethod
    fun erlauben(call: PluginCall) {
        // Vor Android 10 braucht der Schrittzähler keine Laufzeitberechtigung.
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.Q ||
            getPermissionState("bewegung") == PermissionState.GRANTED) {
            return nachErlaubnis(call)
        }
        requestPermissionForAlias("bewegung", call, "erlaubnisErhalten")
    }

    @PermissionCallback
    private fun erlaubnisErhalten(call: PluginCall) {
        if (getPermissionState("bewegung") == PermissionState.GRANTED) nachErlaubnis(call)
        else call.resolve(JSObject().put("status", "verweigert"))
    }

    private fun nachErlaubnis(call: PluginCall) {
        if (!SchrittZaehler.verfuegbar(context)) {
            return call.resolve(JSObject().put("status", "nicht_verfuegbar"))
        }
        SchrittWorker.planen(context)
        heute(call)
    }

    @PluginMethod
    fun heute(call: PluginCall) {
        if (!SchrittZaehler.verfuegbar(context)) {
            return call.resolve(JSObject().put("status", "nicht_verfuegbar"))
        }
        if (!SchrittZaehler.erlaubt(context)) {
            return call.resolve(JSObject().put("status", "offen"))
        }
        CoroutineScope(Dispatchers.IO).launch {
            val schritte = SchrittZaehler.messen(context)
            val antwort = JSObject().put("status", "erlaubt")
            if (schritte != null) antwort.put("schritte", schritte)
            call.resolve(antwort)
        }
    }

    /** Tageswerte der letzten `tage` Tage (abgeschlossene Tage + heute). */
    @PluginMethod
    fun verlauf(call: PluginCall) {
        val tage = (call.getInt("tage") ?: 7).coerceIn(1, SchrittZaehler.VERLAUF_MAX)
        CoroutineScope(Dispatchers.IO).launch {
            val heute = SchrittZaehler.messen(context)
            val liste = JSArray()
            val p = context.getSharedPreferences(SchrittZaehler.PREFS, Context.MODE_PRIVATE)
            val alt = SchrittZaehler.verlaufLesen(p)
            val grenze = SimpleDateFormat("yyyy-MM-dd", Locale.US)
                .format(Date(System.currentTimeMillis() - (tage - 1) * 86_400_000L))
            for (datum in alt.keys()) {
                if (datum >= grenze) liste.put(JSObject().put("datum", datum).put("schritte", alt.getInt(datum)))
            }
            if (heute != null) liste.put(JSObject().put("datum", SchrittZaehler.heute()).put("schritte", heute))
            call.resolve(JSObject().put("tage", liste))
        }
    }
}

/** Sensor lesen und Tageswerte verbuchen — gemeinsam für Plugin und Worker. */
object SchrittZaehler {
    const val PREFS = "FullRepWidget"
    const val TAG = "schritt.tag"
    const val BASIS = "schritt.basis"
    const val LETZTER = "schritt.letzter"
    /** JSON datum → Schritte der abgeschlossenen Tage (seit 1.6.3). */
    const val VERLAUF = "schritt.verlauf"
    const val VERLAUF_MAX = 120

    fun verlaufLesen(p: SharedPreferences): JSONObject =
        try { JSONObject(p.getString(VERLAUF, "{}") ?: "{}") } catch (_: Exception) { JSONObject() }

    fun heute(): String = SimpleDateFormat("yyyy-MM-dd", Locale.US).format(Date())

    fun verfuegbar(context: Context): Boolean =
        (context.getSystemService(Context.SENSOR_SERVICE) as SensorManager)
            .getDefaultSensor(Sensor.TYPE_STEP_COUNTER) != null

    fun erlaubt(context: Context): Boolean =
        Build.VERSION.SDK_INT < Build.VERSION_CODES.Q ||
            ContextCompat.checkSelfPermission(context, Manifest.permission.ACTIVITY_RECOGNITION) ==
            PackageManager.PERMISSION_GRANTED

    /** Liest den Zähler einmal aus (höchstens 5 s) und verbucht ihn. null = kein Wert. */
    suspend fun messen(context: Context): Int? {
        if (!verfuegbar(context) || !erlaubt(context)) return null
        val sm = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
        val sensor = sm.getDefaultSensor(Sensor.TYPE_STEP_COUNTER) ?: return null
        val zaehler = withTimeoutOrNull(5_000) {
            suspendCancellableCoroutine<Long> { weiter ->
                val hoerer = object : SensorEventListener {
                    override fun onSensorChanged(e: SensorEvent) {
                        sm.unregisterListener(this)
                        if (weiter.isActive) weiter.resume(e.values[0].toLong())
                    }
                    override fun onAccuracyChanged(s: Sensor?, a: Int) {}
                }
                sm.registerListener(hoerer, sensor, SensorManager.SENSOR_DELAY_NORMAL)
                weiter.invokeOnCancellation { sm.unregisterListener(hoerer) }
            }
        } ?: return gespeichert(context)
        return verbuchen(context.getSharedPreferences(PREFS, Context.MODE_PRIVATE), zaehler, heute())
    }

    /** Letzter verbuchter Tageswert, falls von heute. */
    fun gespeichert(context: Context): Int? {
        val p = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)
        if (p.getString(TAG, null) != heute()) return null
        return (p.getLong(LETZTER, 0) - p.getLong(BASIS, 0)).coerceAtLeast(0).toInt()
    }

    /**
     * Tagesbasis führen. Neuer Tag: Basis = letzter Stand (die Schritte seither
     * gehören zu heute). Zähler kleiner als zuletzt = Neustart: die heute schon
     * gezählten Schritte bleiben, der Zähler beginnt bei 0.
     */
    fun verbuchen(p: SharedPreferences, zaehler: Long, tag: String): Int {
        val altTag = p.getString(TAG, null)
        val letzter = p.getLong(LETZTER, -1)
        var basis = p.getLong(BASIS, zaehler)
        if (altTag != tag) {
            // Der alte Tag ist vorbei: seinen letzten Stand in den Verlauf.
            // Gezählt ist bis zur letzten Messung (höchstens 15 min vor Mitternacht).
            if (altTag != null && letzter >= 0) {
                val verlauf = verlaufLesen(p)
                verlauf.put(altTag, (letzter - basis).coerceAtLeast(0))
                val tage = verlauf.keys().asSequence().toList().sorted()
                tage.take((tage.size - VERLAUF_MAX).coerceAtLeast(0)).forEach { verlauf.remove(it) }
                p.edit().putString(VERLAUF, verlauf.toString()).apply()
            }
            basis = when {
                letzter < 0 -> zaehler          // allererste Messung: ab jetzt zählen
                zaehler >= letzter -> letzter   // normaler Tageswechsel
                else -> 0                       // Neustart über Mitternacht
            }
        } else if (letzter >= 0 && zaehler < letzter) {
            basis = -(letzter - basis)
        }
        p.edit().putString(TAG, tag).putLong(BASIS, basis).putLong(LETZTER, zaehler).apply()
        return (zaehler - basis).coerceAtLeast(0).toInt()
    }
}

/** Alle 15 Minuten: Zähler lesen, verbuchen, Widget auffrischen. */
class SchrittWorker(context: Context, params: WorkerParameters) : CoroutineWorker(context, params) {
    override suspend fun doWork(): Result {
        try {
            SchrittZaehler.messen(applicationContext)
            FullRepWidget.aktualisieren(applicationContext)
        } catch (_: Exception) {
            // Ein fehlender Messwert ist kein Grund für Wiederholungen.
        }
        return Result.success()
    }

    companion object {
        private const val NAME = "fullrep-schritte"

        fun planen(context: Context) {
            val auftrag = PeriodicWorkRequestBuilder<SchrittWorker>(15, TimeUnit.MINUTES).build()
            WorkManager.getInstance(context)
                .enqueueUniquePeriodicWork(NAME, ExistingPeriodicWorkPolicy.KEEP, auftrag)
        }
    }
}
