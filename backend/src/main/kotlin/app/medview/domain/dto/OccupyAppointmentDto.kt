package app.medview.domain.dto

data class OccupyAppointmentDto(
    val appointmentId: Long,
    val scheduleId: Long,
    val refNumber: String
)