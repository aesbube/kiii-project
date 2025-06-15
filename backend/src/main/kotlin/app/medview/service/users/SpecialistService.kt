package app.medview.service.users

import app.medview.domain.Schedule
import app.medview.domain.dto.AppointmentDto
import app.medview.domain.dto.DiagnosisDto
import app.medview.domain.dto.WriteDiagnosisDto
import app.medview.domain.dto.FreeAppointmentDto
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.users.SpecialistDto
import app.medview.domain.users.Specialist

interface SpecialistService {
    fun getAllSpecialists(): List<SpecialistDto>
    fun getSpecialistsByNameOrSurname(name: String): List<Specialist>
    fun getSpecialistByUsername(username: String): SpecialistDto
    fun getSpecialistScheduleById(id: Long): Schedule
    fun addDetailsToSpecialist(specialistDto: SpecialistDto): MessageResponse
    fun setFreeAppointments(appointments: List<FreeAppointmentDto>): MessageResponse
    fun getAppointments(): List<AppointmentDto>
    fun writeDiagnosis(appointmentId: Long, writeDiagnosisDto: WriteDiagnosisDto): MessageResponse
    fun getOccupiedAppointments(): List<AppointmentDto>
    fun getSpecialist(): SpecialistDto
    fun getAppointmentById(appointmentId: Long): AppointmentDto
    fun getDiagnosisByAppointmentId(appointmentId: Long): DiagnosisDto
    fun getAppointmentByRefNumber(refNumber: String): AppointmentDto
}