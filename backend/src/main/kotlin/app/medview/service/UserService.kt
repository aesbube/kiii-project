package app.medview.service

import app.medview.domain.User
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.UserDto

interface UserService {
    fun getCurrentUser(): User
    fun getAllUsers(): List<UserDto>
    fun getUserById(id: Long): User
    fun deleteUser(id: Long): MessageResponse
}