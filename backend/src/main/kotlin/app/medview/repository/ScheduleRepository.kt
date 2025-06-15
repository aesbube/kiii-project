package app.medview.repository

import app.medview.domain.Schedule
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ScheduleRepository : JpaRepository<Schedule, Long> {
    fun findBySpecialistId(specialistId: Long): Schedule
}