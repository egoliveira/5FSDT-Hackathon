package com.question.backend.presentation.config

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class CORSConfigurer : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.run {
            addMapping("/exam/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PATCH")
            addMapping("/subject/**").allowedOrigins("http://localhost:3000")
            addMapping("/teacher/**").allowedOrigins("http://localhost:3000")
            addMapping("/teachinglevel/**").allowedOrigins("http://localhost:3000")
            addMapping("/teachinggrade/**").allowedOrigins("http://localhost:3000")
            addMapping("/question/**").allowedOrigins("http://localhost:3000")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PATCH")
        }
    }
}