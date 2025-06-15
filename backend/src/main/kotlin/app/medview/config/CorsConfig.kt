import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CorsConfig {

    @Bean
    fun corsConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**") // Apply to all endpoints
                    .allowedOrigins("*") // Allow requests from your Angular app
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow these HTTP methods
                    .allowedHeaders("*") // Allow all headers
                    .allowCredentials(true) // Allow sending credentials (cookies, auth headers)
                    .maxAge(3600) // Cache preflight response for 1 hour
            }
        }
    }
}