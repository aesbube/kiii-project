package app.medview.service.impl.users

import app.medview.domain.converter.AppointmentEntityToDtoConverter
import app.medview.domain.converter.DoctorEntityToDtoConverter
import app.medview.domain.converter.PrescriptionEntityToDtoConverter
import app.medview.domain.dto.*
import app.medview.domain.dto.users.DoctorDto
import app.medview.domain.dto.users.PatientDto
import app.medview.domain.dto.users.PatientRequestDto
import app.medview.exceptions.IllegalDoctorPatientOperation
import app.medview.repository.DoctorRepository
import app.medview.repository.PatientRepository
import app.medview.repository.ScheduleRepository
import app.medview.repository.SpecialistRepository
import app.medview.service.AppointmentService
import app.medview.service.PrescriptionService
import app.medview.service.users.DoctorService
import app.medview.service.users.PatientService
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class DoctorServiceImpl(
    private val doctorRepository: DoctorRepository,
    private val specialistRepository: SpecialistRepository,
    private val patientService: PatientService,
    private val prescriptionService: PrescriptionService,
    private val doctorConverter: DoctorEntityToDtoConverter,
    private val prescriptionConverter: PrescriptionEntityToDtoConverter,
    private val patientRepository: PatientRepository,
    private val appointmentService: AppointmentService,
    private val appointmentConverter: AppointmentEntityToDtoConverter,
    private val scheduleRepository: ScheduleRepository,
) :
    DoctorService {
    val logger = org.slf4j.LoggerFactory.getLogger(DoctorServiceImpl::class.java)
    override fun getDoctorById(id: Long): DoctorDto {
        return doctorConverter.convert(doctorRepository.findById(id).orElseThrow {
            throw RuntimeException("Doctor not found with id: $id")
        })
    }

    override fun addDetailsToDoctor(doctorDto: DoctorDto): MessageResponse {
        logger.info("Adding doctor details")
        val auth = SecurityContextHolder.getContext().authentication
        val username = auth.name

        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        logger.info("Adding doctor details for user: $username")
        logger.info("Doctor DTO: $doctorDto")

        doctor.name = doctorDto.name ?: doctor.name
        doctor.surname = doctorDto.surname ?: doctor.surname
        doctor.phone = doctorDto.phone ?: doctor.phone
        doctor.address = doctorDto.address ?: doctor.address
        doctor.birthDate = doctorDto.birthDate ?: doctor.birthDate
        doctor.specialty = doctorDto.specialty ?: doctor.specialty
        doctor.licenseNumber = doctorDto.licenseNumber ?: doctor.licenseNumber
        doctor.yearsOfExperience = doctorDto.yearsOfExperience ?: doctor.yearsOfExperience
        doctor.hospitalName = doctorDto.hospitalName ?: doctor.hospitalName

        doctorRepository.save(doctor)
        return MessageResponse("Doctor details added successfully")
    }

    override fun addPatientToDoctor(patientRequestDto: PatientRequestDto): MessageResponse {
        logger.info("Adding patient to doctor")
        val auth = SecurityContextHolder.getContext().authentication
        val username = auth.name

        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        logger.info("Adding patient to doctor for user: $username")
        logger.info("Patient DTO: $patientRequestDto")

        val patient = patientRepository.findByUsername(patientRequestDto.username)
            ?: throw UsernameNotFoundException("User not found with username: ${patientRequestDto.username}")

        patient.doctor = doctor
        patientRepository.save(patient)

        return MessageResponse("Patient added successfully")
    }

    override fun getCurrentDoctor(): DoctorDto {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name

        return doctorConverter.convert(
            doctorRepository.findByUsername(username)
                ?: throw UsernameNotFoundException("User not found with username: $username")
        )
    }

    override fun getPatientOfDoctor(patientId: Long): PatientDto {
        val patient = patientService.getPatientById(patientId)

        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        if (patient.doctor != getDoctorById(doctor.id))
            throw IllegalDoctorPatientOperation(doctor.id, patientId)

        return patient
    }

    override fun getPatientsOfDoctor(): List<PatientDto> {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        return patientService.getPatientsByDoctor(doctor.id)
    }

    override fun getPrescriptionsOfPatientsOfDoctor(patientId: Long): List<PrescriptionDto> {
        return prescriptionService.getPrescriptionsByPatientId(patientId).map { prescriptionConverter.convert(it) }
    }

    override fun writePrescription(patientId: Long, prescriptionRequestDto: PrescriptionRequestDto): PrescriptionDto {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        return prescriptionConverter.convert(
            prescriptionService.create(patientId, doctor, prescriptionRequestDto)
        )
    }

    override fun cancelPrescription(patientId: Long, prescriptionId: String): PrescriptionDto {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")


        return prescriptionConverter.convert(
            prescriptionService.cancel(patientId, doctor.id, prescriptionId)
        )
    }

    override fun scheduleAppointment(patientId: Long, occupyAppointmentDto: OccupyAppointmentDto): MessageResponse {
        logger.info(SecurityContextHolder.getContext().authentication.name)
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val assignee = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")

        appointmentService.occupyAppointment(
            occupyAppointmentDto.appointmentId,
            patientId,
            assignee,
            occupyAppointmentDto
        )
        return MessageResponse("Appointment scheduled successfully")
    }

    override fun searchPatientsByName(patientSearchDto: PatientSearchDto): List<PatientDto> {
        if (patientSearchDto.name == "") return this.getPatientsOfDoctor()
        val authentication = SecurityContextHolder.getContext().authentication
        val username = authentication.name
        val doctor = doctorRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("User not found with username: $username")
        val patients =
            patientRepository.searchByNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrUsernameContainingIgnoreCaseAndDoctorId(
                patientSearchDto.name!!,
                patientSearchDto.name,
                patientSearchDto.name,
                doctor.id
            )
        return patients.map { patientService.getPatientById(it.id) }

    }

    override fun searchPatientsByNameClaim(patientSearchDto: PatientSearchDto): List<PatientDto> {
        val patients =
            patientRepository.searchByNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseOrUsernameContainingIgnoreCaseAndDoctorIsNull(
                patientSearchDto.name!!,
                patientSearchDto.name,
                patientSearchDto.name,
            )
        val finalPatients = mutableListOf<PatientDto>()
        for (patient in patients) {
            if (patient.doctor == null) finalPatients.add(patientService.getPatientById(patient.id))
        }
        return finalPatients.toList()
    }

    override fun getAllAppointmentsOfPatient(patientId: Long): List<AppointmentDto> {
        val appointments = appointmentService.getAppointmentsByPatientId(patientId)
        return appointments.map { appointmentConverter.convert(it) }
    }

    override fun getAllFreeAppointmentsBySpecialistUsername(username: String): List<AppointmentDto> {
        val specialist = specialistRepository.findByUsername(username)
            ?: throw UsernameNotFoundException("Specialist not found with username: $username")

        val schedule = scheduleRepository.findBySpecialistId(specialist.id)
        return appointmentService.getFreeAppointmentsByScheduleId(schedule.id)
    }
}