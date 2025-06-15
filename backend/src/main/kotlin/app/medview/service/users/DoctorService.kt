package app.medview.service.users

import app.medview.domain.dto.*
import app.medview.domain.dto.users.DoctorDto
import app.medview.domain.dto.users.PatientDto
import app.medview.domain.dto.users.PatientRequestDto

interface DoctorService {
    fun getDoctorById(id: Long): DoctorDto
    fun addDetailsToDoctor(doctorDto: DoctorDto): MessageResponse
    fun addPatientToDoctor(patientRequestDto: PatientRequestDto): MessageResponse
    fun getCurrentDoctor(): DoctorDto
    fun getPatientsOfDoctor(): List<PatientDto>
    fun getPatientOfDoctor(patientId: Long): PatientDto
    fun getPrescriptionsOfPatientsOfDoctor(patientId: Long): List<PrescriptionDto>
    fun writePrescription(patientId: Long, prescriptionRequestDto: PrescriptionRequestDto): PrescriptionDto
    fun cancelPrescription(patientId: Long, prescriptionId: String): PrescriptionDto
    fun scheduleAppointment(patientId: Long, occupyAppointmentDto: OccupyAppointmentDto): MessageResponse
    fun searchPatientsByName(patientSearchDto: PatientSearchDto): List<PatientDto>
    fun searchPatientsByNameClaim(patientSearchDto: PatientSearchDto): List<PatientDto>
    fun getAllAppointmentsOfPatient(patientId: Long): List<AppointmentDto>
    fun getAllFreeAppointmentsBySpecialistUsername(username: String): List<AppointmentDto>
}