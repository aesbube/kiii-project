package app.medview.domain.converter

import app.medview.domain.Appointment
import app.medview.domain.dto.AppointmentDto
import org.springframework.stereotype.Component

@Component
class AppointmentEntityToDtoConverter {
    fun convert(appointment: Appointment) = AppointmentDto(
        id = appointment.id,
        scheduleId = appointment.schedule!!.id,
        patientName = appointment.patient?.name + " " + appointment.patient?.surname,
        assigneeName = appointment.assignee?.name + " " + appointment.assignee?.surname,
        date = appointment.date,
        time = appointment.time,
        location = appointment.location,
        refNumber = appointment.refNumber,
        status = appointment.status
    )
}