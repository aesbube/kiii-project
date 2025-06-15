package app.medview.service.impl.users

import app.medview.domain.Role
import app.medview.domain.converter.AppointmentEntityToDtoConverter
import app.medview.domain.converter.PatientEntityToDtoConverter
import app.medview.domain.converter.PrescriptionEntityToDtoConverter
import app.medview.domain.dto.AppointmentDto
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.PrescriptionDto
import app.medview.domain.dto.users.PatientDto
import app.medview.exceptions.PatientNotFoundException
import app.medview.repository.AppointmentRepository
import app.medview.repository.PatientRepository
import app.medview.service.PrescriptionService
import app.medview.service.users.PatientService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class PatientServiceImpl(
    private val patientRepository: PatientRepository,
    private val prescriptionService: PrescriptionService,
    private val patientConverter: PatientEntityToDtoConverter,
    private val prescriptionConverter: PrescriptionEntityToDtoConverter,
    private val appointmentRepository: AppointmentRepository,
    private val appointmentEntityToDtoConverter: AppointmentEntityToDtoConverter,
) : PatientService {

    val logger = org.slf4j.LoggerFactory.getLogger(PatientServiceImpl::class.java)
    override fun getPatientById(id: Long): PatientDto {
        return patientConverter.convert(patientRepository.findById(id).orElseThrow {
            throw RuntimeException("Patient not found with id: $id")
        })
    }

    override fun getCurrentPatient(): PatientDto {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name

        return patientConverter.convert(
            patientRepository.findByUsername(username)
                ?: throw UsernameNotFoundException("User not found with username: $username")
        )
    }

    override fun addDetailsToPatient(patientDto: PatientDto): MessageResponse {
        val auth = SecurityContextHolder.getContext().authentication
        val username = auth.name

        val patient = patientRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        if (patient.role != Role.PATIENT) {
            throw RuntimeException("User is not a patient")
        }


        patient.name = patientDto.name
        patient.surname = patientDto.surname
        patient.phone = patientDto.phone
        patient.address = patientDto.address
        patient.birthDate = patientDto.birthDate
        patient.birthPlace = patientDto.birthPlace
        patient.allergies = patientDto.allergies
        patient.bloodType = patientDto.bloodType


        patientRepository.save(patient)
        return MessageResponse("Patient details added successfully")
    }

    override fun getPatientsByDoctor(doctorId: Long): List<PatientDto> {
        return patientRepository.findByDoctorId(doctorId).map { patientConverter.convert(it) }
    }

    override fun getPrescriptionsOfPatient(): List<PrescriptionDto> {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val patient = patientRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        return prescriptionService.getPrescriptionsByPatientId(patient.id).map { prescriptionConverter.convert(it) }
    }

    override fun getAppointmentOfPatient(refNumber: String): AppointmentDto {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val patient = patientRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        val appointment = appointmentRepository.findByRefNumberAndPatientId(refNumber, patient.id)
            ?: throw RuntimeException("Appointment not found with refNumber: $refNumber and patientId: ${patient.id}")

        return appointmentEntityToDtoConverter.convert(appointment)
    }

    override fun getAllAppointmentsOfPatient(): List<AppointmentDto> {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val patient = patientRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        val appointments = appointmentRepository.findByPatientId(patient.id)

        return appointments.map { appointmentEntityToDtoConverter.convert(it) }
    }

}