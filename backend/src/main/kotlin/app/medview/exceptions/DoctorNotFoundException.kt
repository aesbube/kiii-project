package app.medview.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(HttpStatus.NOT_FOUND)
class DoctorNotFoundException(message: String)
    : RuntimeException("Doctor with $message not found")