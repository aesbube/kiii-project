package app.medview.domain.dto

import java.time.LocalDate

data class FreeAppointmentDto(
    val date: LocalDate,
    val time: String,
    val location: String,
)
