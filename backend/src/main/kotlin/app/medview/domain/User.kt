package app.medview.domain

import jakarta.persistence.*

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
open class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    open val id: Long = 0,

    @Column(unique = true, nullable = false)
    open val username: String = "",

    @Column(nullable = false)
    open val password: String = "",

    @Column(nullable = false)
    open val email: String = "",

    @Enumerated(EnumType.STRING)
    open val role: Role = Role.PATIENT,
)