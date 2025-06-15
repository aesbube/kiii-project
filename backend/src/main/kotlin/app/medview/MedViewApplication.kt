package app.medview

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MedViewApplication

fun main(args: Array<String>) {
    runApplication<MedViewApplication>(*args)
}
