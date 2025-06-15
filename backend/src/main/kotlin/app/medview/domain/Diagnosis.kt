package app.medview.domain

import app.medview.domain.users.Patient
import app.medview.domain.users.Specialist
import jakarta.persistence.*

@Entity
data class Diagnosis(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    val name: String = "",
    val description: String = "",
    val treatment: String = "",
    @ManyToOne
    val patient: Patient? = null,
    @ManyToOne
    val specialist: Specialist? = null,
    @OneToOne
    val appointment: Appointment? = null
)