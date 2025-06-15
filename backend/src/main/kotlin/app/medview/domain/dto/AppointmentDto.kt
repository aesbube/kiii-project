package app.medview.domain.dto

import app.medview.domain.AppointmentStatus
import java.time.LocalDate

data class AppointmentDto(
    val id: Long,
    val scheduleId: Long?,
    val patientName: String?,
    val assigneeName: String?,
    val date: LocalDate?,
    val time: String,
    val location: String,
    val refNumber: String?,
    val status: AppointmentStatus
)
