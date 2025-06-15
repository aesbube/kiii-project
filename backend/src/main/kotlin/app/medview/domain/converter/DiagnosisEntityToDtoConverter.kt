package app.medview.domain.converter

import app.medview.domain.Diagnosis
import app.medview.domain.dto.DiagnosisDto
import org.springframework.stereotype.Component

@Component
class DiagnosisEntityToDtoConverter {
    fun convert(diagnosis: Diagnosis) = DiagnosisDto(
        id = diagnosis.id,
        name = diagnosis.name,
        description = diagnosis.description,
        treatment = diagnosis.treatment,
        patientNameAndSurname = diagnosis.patient?.name + " " + diagnosis.patient?.surname,
    )
}