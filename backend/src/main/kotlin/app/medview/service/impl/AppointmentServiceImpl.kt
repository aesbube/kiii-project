package app.medview.service.impl

import app.medview.domain.Appointment
import app.medview.domain.AppointmentStatus
import app.medview.domain.Schedule
import app.medview.domain.converter.AppointmentEntityToDtoConverter
import app.medview.domain.dto.*
import app.medview.domain.users.Doctor
import app.medview.repository.AppointmentRepository
import app.medview.repository.PatientRepository
import app.medview.repository.ScheduleRepository
import app.medview.service.AppointmentService
import app.medview.util.RandomIdGenerator
import org.springframework.stereotype.Service

@Service
class AppointmentServiceImpl(
    private val appointmentRepository: AppointmentRepository,
    private val patientRepository: PatientRepository,
    private val scheduleRepository: ScheduleRepository,
    private val appointmentEntityToDtoConverter: AppointmentEntityToDtoConverter
) : AppointmentService {
    override fun getAllAppointments(): List<Appointment> {
        return appointmentRepository.findAll()
    }

    override fun getAppointmentsByPatientId(patientId: Long): List<Appointment> {
        return appointmentRepository.findByPatientId(patientId)
    }

    override fun getAppointmentsBySpecialistId(specialistId: Long): List<Appointment> {
        return appointmentRepository.findByScheduleSpecialistId(specialistId)
    }

    override fun getAppointmentsByScheduleId(scheduleId: Long): List<AppointmentDto> {
        return appointmentRepository.findByScheduleId(scheduleId).map {
            appointmentEntityToDtoConverter.convert(it)
        }
    }

    override fun getOccupiedAppointmentsByScheduleId(scheduleId: Long): List<AppointmentDto> {
        return appointmentRepository.findByStatusAndScheduleId(AppointmentStatus.OCCUPIED, scheduleId)
            .map {
                appointmentEntityToDtoConverter.convert(it)
            }
    }

    override fun getFreeAppointmentsByScheduleId(scheduleId: Long): List<AppointmentDto> {
        return appointmentRepository.findByStatusAndScheduleId(AppointmentStatus.FREE, scheduleId)
            .map {
                appointmentEntityToDtoConverter.convert(it)
            }
    }

    override fun occupyAppointment(
        appointmentId: Long,
        patientId: Long,
        doctor: Doctor,
        occupyAppointmentDto: OccupyAppointmentDto
    ): MessageResponse {
        val existingAppointment =
            appointmentRepository.findById(appointmentId).orElseThrow { Exception("Appointment not found") }
        val patient = patientRepository.findById(patientId).orElseThrow() { Exception("Patient not found") }
        val schedule = scheduleRepository.findById(occupyAppointmentDto.scheduleId)
            .orElseThrow() { Exception("Schedule not found") }
        existingAppointment.apply {
            this.schedule = schedule
            this.patient = patient
            this.status = AppointmentStatus.OCCUPIED
            this.refNumber = RandomIdGenerator.generateRefNumber()
            this.assignee = doctor
        }

        appointmentRepository.save(existingAppointment)
        return MessageResponse("Appointment updated successfully")
    }

    override fun deleteAppointment(id: Long): MessageResponse {
        val appointment = appointmentRepository.findById(id).orElseThrow { Exception("Appointment not found") }
        appointmentRepository.delete(appointment)
        return MessageResponse("Appointment deleted successfully")
    }

    override fun createFreeAppointment(freeAppointmentDto: FreeAppointmentDto, schedule: Schedule): MessageResponse {
        if (appointmentRepository.existsByDateAndTimeAndScheduleId(
                date = freeAppointmentDto.date,
                time = freeAppointmentDto.time,
                scheduleId = schedule.id
            )
        ) {
            return MessageResponse("Appointment already exists")
        }
        val appointment = Appointment(
            schedule = schedule,
            date = freeAppointmentDto.date,
            time = freeAppointmentDto.time,
            location = freeAppointmentDto.location,
            status = AppointmentStatus.FREE,
        )
        appointmentRepository.save(appointment)
        return MessageResponse("Free appointment created successfully")
    }
}