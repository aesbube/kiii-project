package app.medview.domain

import app.medview.domain.users.Specialist
import jakarta.persistence.*

@Entity
@Table(name = "schedules")
class Schedule(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @OneToOne()
    @JoinColumn(nullable = false)
    var specialist: Specialist? = null,
)