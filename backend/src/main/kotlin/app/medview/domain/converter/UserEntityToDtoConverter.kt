package app.medview.domain.converter

import app.medview.domain.User
import app.medview.domain.dto.UserDto
import org.springframework.stereotype.Component

@Component
class UserEntityToDtoConverter {
    fun convert(user: User) = UserDto(
        id = user.id,
        username = user.username,
        email = user.email,
        role = user.role
    )
}