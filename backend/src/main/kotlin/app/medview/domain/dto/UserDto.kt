package app.medview.domain.dto

import app.medview.domain.Role

data class UserDto(
    val id: Long,
    val username: String,
    val email: String,
    val role: Role
)