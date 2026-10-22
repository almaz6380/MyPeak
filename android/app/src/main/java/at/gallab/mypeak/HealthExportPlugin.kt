package at.gallab.mypeak

import androidx.activity.result.ActivityResultLauncher
import androidx.health.connect.client.HealthConnectClient
import androidx.health.connect.client.PermissionController
import androidx.health.connect.client.permission.HealthPermission
import androidx.health.connect.client.records.ExerciseSessionRecord
import androidx.health.connect.client.records.metadata.Metadata
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.time.Instant
import java.time.ZoneId
import java.util.concurrent.atomic.AtomicReference

/**
 * Workouts nach Health Connect SCHREIBEN (Gegenstück zu capacitor-health,
 * das nur lesen kann). Eine einzige Berechtigung: WRITE_EXERCISE. Kalorien,
 * Puls oder Strecke werden bewusst nicht geschrieben — jede weitere
 * Berechtigung braucht eine eigene Begründung im Play-Gesundheitsformular.
 *
 * Aufgerufen aus src/lib/health.js, nur wenn der Nutzer im Profil
 * „Workouts nach Health schreiben" eingeschaltet hat.
 */
@CapacitorPlugin(name = "HealthExport")
class HealthExportPlugin : Plugin() {

    private val schreibRecht = HealthPermission.getWritePermission(ExerciseSessionRecord::class)
    private lateinit var rechteAnfrage: ActivityResultLauncher<Set<String>>
    private val offeneAnfrage = AtomicReference<PluginCall?>()

    override fun load() {
        super.load()
        // Muss vor dem Start der Activity registriert sein — load() läuft in onCreate.
        rechteAnfrage = activity.registerForActivityResult(
            PermissionController.createRequestPermissionResultContract()
        ) { erteilt ->
            val call = offeneAnfrage.getAndSet(null) ?: return@registerForActivityResult
            call.resolve(JSObject().put("granted", erteilt.contains(schreibRecht)))
        }
    }

    private fun client(): HealthConnectClient? {
        if (HealthConnectClient.getSdkStatus(context) != HealthConnectClient.SDK_AVAILABLE) return null
        return HealthConnectClient.getOrCreate(context)
    }

    @PluginMethod
    fun requestAuthorization(call: PluginCall) {
        val hc = client() ?: return call.resolve(JSObject().put("granted", false))
        CoroutineScope(Dispatchers.IO).launch {
            try {
                if (hc.permissionController.getGrantedPermissions().contains(schreibRecht)) {
                    call.resolve(JSObject().put("granted", true))
                    return@launch
                }
                offeneAnfrage.set(call)
                activity.runOnUiThread { rechteAnfrage.launch(setOf(schreibRecht)) }
            } catch (e: Exception) {
                offeneAnfrage.set(null)
                call.reject("Berechtigungsanfrage fehlgeschlagen: ${e.message}")
            }
        }
    }

    @PluginMethod
    fun saveWorkout(call: PluginCall) {
        val typ = call.getString("type") ?: "strength"
        val start = call.getString("start")?.let { runCatching { Instant.parse(it) }.getOrNull() }
        val ende = call.getString("end")?.let { runCatching { Instant.parse(it) }.getOrNull() }
        if (start == null || ende == null || !ende.isAfter(start)) {
            return call.reject("start/end fehlen oder sind ungültig")
        }
        val hc = client() ?: return call.resolve(JSObject().put("saved", false))

        CoroutineScope(Dispatchers.IO).launch {
            try {
                if (!hc.permissionController.getGrantedPermissions().contains(schreibRecht)) {
                    call.resolve(JSObject().put("saved", false))
                    return@launch
                }
                val zone = ZoneId.systemDefault().rules
                val eintrag = ExerciseSessionRecord(
                    startTime = start,
                    startZoneOffset = zone.getOffset(start),
                    endTime = ende,
                    endZoneOffset = zone.getOffset(ende),
                    // clientRecordId macht doppeltes Schreiben (z. B. Wiederholung) idempotent
                    metadata = call.getString("id")?.let { Metadata.manualEntry(clientRecordId = it) }
                        ?: Metadata.manualEntry(),
                    exerciseType = uebungsart(typ, call.getString("activity")),
                    title = call.getString("title"),
                )
                hc.insertRecords(listOf(eintrag))
                call.resolve(JSObject().put("saved", true))
            } catch (e: Exception) {
                call.reject("Workout nicht gespeichert: ${e.message}")
            }
        }
    }

    private fun uebungsart(typ: String, aktivitaet: String?): Int = when (typ) {
        "strength" -> ExerciseSessionRecord.EXERCISE_TYPE_STRENGTH_TRAINING
        "hiit" -> ExerciseSessionRecord.EXERCISE_TYPE_HIGH_INTENSITY_INTERVAL_TRAINING
        "circuit" -> ExerciseSessionRecord.EXERCISE_TYPE_CALISTHENICS
        "martial-arts" -> if (aktivitaet == "boxing") ExerciseSessionRecord.EXERCISE_TYPE_BOXING
            else ExerciseSessionRecord.EXERCISE_TYPE_MARTIAL_ARTS
        // aktivitaet = cardioType aus src/data/exercises.js
        "cardio" -> when (aktivitaet) {
            "running" -> ExerciseSessionRecord.EXERCISE_TYPE_RUNNING
            "cycling" -> ExerciseSessionRecord.EXERCISE_TYPE_BIKING
            "walking" -> ExerciseSessionRecord.EXERCISE_TYPE_WALKING
            "rowing" -> ExerciseSessionRecord.EXERCISE_TYPE_ROWING_MACHINE
            "swimming" -> ExerciseSessionRecord.EXERCISE_TYPE_SWIMMING_POOL
            "elliptical" -> ExerciseSessionRecord.EXERCISE_TYPE_ELLIPTICAL
            "stepmill" -> ExerciseSessionRecord.EXERCISE_TYPE_STAIR_CLIMBING_MACHINE
            else -> ExerciseSessionRecord.EXERCISE_TYPE_OTHER_WORKOUT
        }
        else -> ExerciseSessionRecord.EXERCISE_TYPE_OTHER_WORKOUT
    }
}
