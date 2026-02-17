package com.question.backend

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class QuestionBackendApplication

fun main(args: Array<String>) {
    runApplication<QuestionBackendApplication>(*args)
}
