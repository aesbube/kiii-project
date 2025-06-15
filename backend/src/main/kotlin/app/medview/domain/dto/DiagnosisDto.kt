package app.medview.domain.dto

class DiagnosisDto(
    val id: Long,
    val name: String,
    val description: String,
    val treatment: String,
    val patientNameAndSurname: String
)