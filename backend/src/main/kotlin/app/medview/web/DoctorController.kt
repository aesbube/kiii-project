package app.medview.web

import app.medview.domain.dto.AppointmentDto
import app.medview.domain.dto.DiagnosisDto
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.OccupyAppointmentDto
import app.medview.domain.dto.PatientSearchDto
import app.medview.domain.dto.PrescriptionDto
import app.medview.domain.dto.PrescriptionRequestDto
import app.medview.domain.dto.users.DoctorDto
import app.medview.domain.dto.users.PatientDto
import app.medview.domain.dto.users.PatientRequestDto
import app.medview.domain.dto.users.SpecialistDto
import app.medview.service.impl.users.SpecialistServiceImpl
import app.medview.service.users.DoctorService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/doctors")
class DoctorController(private val doctorService: DoctorService, private val specialistService: SpecialistServiceImpl) {
    @PostMapping("/update")
    fun addDetailsToDoctor(@RequestBody doctorDto: DoctorDto): ResponseEntity<String> {
        val response = doctorService.addDetailsToDoctor(doctorDto)
        return ResponseEntity.ok(response.message)
    }

    @PostMapping("/add-patient")
    fun addPatientToDoctor(@RequestBody patientRequestDto: PatientRequestDto): ResponseEntity<String> {
        val response = doctorService.addPatientToDoctor(patientRequestDto)
        return ResponseEntity.ok(response.message)
    }

    @GetMapping("/me")
    fun getCurrentDoctor(): ResponseEntity<DoctorDto> {
        return ResponseEntity.ok(doctorService.getCurrentDoctor())
    }

    @GetMapping("/patients")
    fun getPatientsOfDoctor(): ResponseEntity<List<PatientDto>> {
        return ResponseEntity.ok(doctorService.getPatientsOfDoctor())
    }

    @GetMapping("/patients/{id}")
    fun getPatientOfDoctor(@PathVariable("id") patientId: Long): ResponseEntity<PatientDto> {
        return ResponseEntity.ok(doctorService.getPatientOfDoctor(patientId))
    }

    @GetMapping("/patients/{id}/prescriptions")
    fun getPrescriptionsOfPatientOfDoctor(@PathVariable("id") patientId: Long): ResponseEntity<List<PrescriptionDto>> {
        return ResponseEntity.ok(doctorService.getPrescriptionsOfPatientsOfDoctor(patientId))
    }

    @PostMapping("/patients/{id}/prescriptions/new")
    fun writePrescription(
        @PathVariable("id") patientId: Long,
        @RequestBody prescription: PrescriptionRequestDto
    ): ResponseEntity<PrescriptionDto> {
        return ResponseEntity(doctorService.writePrescription(patientId, prescription), HttpStatus.CREATED)
    }

    @GetMapping("/patients/{patientId}/prescriptions/{prescriptionId}")
    fun cancelPrescription(
        @PathVariable("patientId") patientId: Long,
        @PathVariable("prescriptionId") prescriptionId: String,
    ): ResponseEntity<PrescriptionDto> {
        return ResponseEntity.ok(doctorService.cancelPrescription(patientId, prescriptionId))
    }

    @PostMapping("/patients/{patientId}/appointments")
    fun scheduleAppointment(
        @PathVariable("patientId") patientId: Long,
        @RequestBody occupyAppointmentDto: OccupyAppointmentDto
    ): ResponseEntity<MessageResponse> {
        return ResponseEntity.ok(doctorService.scheduleAppointment(patientId, occupyAppointmentDto))
    }

    @PostMapping("/search-patients")
    fun searchPatientsByName(@RequestBody patientSearchDto: PatientSearchDto): ResponseEntity<List<PatientDto>> {
        val patients = doctorService.searchPatientsByName(patientSearchDto)
        return ResponseEntity.ok(patients)
    }

    @PostMapping("/search-patients-claim")
    fun searchPatientsByNameClaim(@RequestBody patientSearchDto: PatientSearchDto): ResponseEntity<List<PatientDto>> {
        val patients = doctorService.searchPatientsByNameClaim(patientSearchDto)
        return ResponseEntity.ok(patients)
    }

    @GetMapping("/patients/{patientId}/appointments-all")
    fun getAllAppointmentsOfPatient(@PathVariable("patientId") patientId: Long): ResponseEntity<List<AppointmentDto>> {
        return ResponseEntity.ok(doctorService.getAllAppointmentsOfPatient(patientId))
    }

    @GetMapping("/appointments/{username}")
    fun getFreeAppointmentsBySpecialistUsername(@PathVariable("username") username: String): ResponseEntity<List<AppointmentDto>> {
        val appointments = doctorService.getAllFreeAppointmentsBySpecialistUsername(username)
        return ResponseEntity.ok(appointments)
    }

    @GetMapping("/specialists")
    fun getAllSpecialists(): ResponseEntity<List<SpecialistDto>> {
        val specialists = specialistService.getAllSpecialists()
        return ResponseEntity.ok(specialists)
    }

    @GetMapping("appointments-details/{appointmentId}")
    fun getAppointmentById(@PathVariable("appointmentId") appointmentId: Long): ResponseEntity<AppointmentDto> {
        return ResponseEntity.ok(specialistService.getAppointmentById(appointmentId))
    }

    @GetMapping("appointments/{appointmentId}/diagnosis")
    fun getDiagnosisByAppointmentId(@PathVariable("appointmentId") appointmentId: Long): ResponseEntity<Any> {
        return try {
            ResponseEntity.ok(specialistService.getDiagnosisByAppointmentId(appointmentId))
        } catch (e: Exception) {
            ResponseEntity.status(404).body("Diagnosis not found for appointment ID: $appointmentId")
        }
    }
}
