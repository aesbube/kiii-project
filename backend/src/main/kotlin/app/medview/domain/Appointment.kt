package app.medview.domain

import app.medview.domain.users.Doctor
import app.medview.domain.users.Patient
import jakarta.persistence.*
import java.time.LocalDate
import java.util.Date

@Entity
@Table(name = "appointments")
class Appointment(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne
    var schedule: Schedule? = null,
    @ManyToOne
    var patient: Patient? = null,
    @ManyToOne
    var assignee: Doctor? = null,
    var date: LocalDate? = null,
    var time: String = "",
    var location: String = "",
    var status: AppointmentStatus = AppointmentStatus.FREE,
    var refNumber: String = "",
)