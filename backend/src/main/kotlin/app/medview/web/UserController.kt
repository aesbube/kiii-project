package app.medview.web

import app.medview.domain.User
import app.medview.domain.dto.MessageResponse
import app.medview.domain.dto.UserDto
import app.medview.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {
    @GetMapping("/me")
    fun getCurrentUser(): ResponseEntity<User> {
        return ResponseEntity.ok(userService.getCurrentUser())
    }

    @GetMapping
    fun getAllUsers(): ResponseEntity<List<UserDto>> {
        return ResponseEntity.ok(userService.getAllUsers())
    }

    @GetMapping("/{id}")
    fun getUserById(@PathVariable id: Long): ResponseEntity<User> {
        return ResponseEntity.ok(userService.getUserById(id))
    }

    @DeleteMapping("/delete/{id}")
    fun deleteUser(@PathVariable id: Long): ResponseEntity<MessageResponse> {
        return ResponseEntity.ok(userService.deleteUser(id))
    }


}