package app.medview.domain.dto

import jakarta.validation.constraints.NotBlank

data class ScheduleDto(
    @field:NotBlank
    val specialistId: Long,
//    val occupiedAppointments: List<AppointmentDto>?,
)
