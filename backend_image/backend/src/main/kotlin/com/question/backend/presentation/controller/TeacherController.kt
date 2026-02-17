package com.question.backend.presentation.controller

import com.question.backend.domain.service.TeacherService
import com.question.backend.domain.vo.Teacher
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TeacherController(
    @Autowired private val teacherService: TeacherService
) {
    @GetMapping("/teacher")
    fun getAll(): List<Teacher> {
        return teacherService.getAll()
    }
}