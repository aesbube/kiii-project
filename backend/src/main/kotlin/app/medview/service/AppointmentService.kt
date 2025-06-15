package app.medview.service

import app.medview.domain.Appointment
import app.medview.domain.Schedule
import app.medview.domain.dto.*
import app.medview.domain.users.Doctor

interface AppointmentService {
    fun getAllAppointments(): List<Appointment>
    fun getAppointmentsByPatientId(patientId: Long): List<Appointment>
    fun getAppointmentsBySpecialistId(specialistId: Long): List<Appointment>
    fun getAppointmentsByScheduleId(scheduleId: Long): List<AppointmentDto>
    fun getOccupiedAppointmentsByScheduleId(scheduleId: Long): List<AppointmentDto>
    fun getFreeAppointmentsByScheduleId(scheduleId: Long): List<AppointmentDto>
    fun occupyAppointment(appointmentId: Long, patientId: Long, doctor: Doctor, occupyAppointmentDto: OccupyAppointmentDto): MessageResponse
    fun deleteAppointment(id: Long): MessageResponse
    fun createFreeAppointment(freeAppointmentDto: FreeAppointmentDto, schedule: Schedule): MessageResponse
}