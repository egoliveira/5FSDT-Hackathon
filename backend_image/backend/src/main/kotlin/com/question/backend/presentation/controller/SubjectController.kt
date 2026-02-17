package com.question.backend.presentation.controller

import com.question.backend.domain.service.SubjectService
import com.question.backend.domain.vo.Subject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class SubjectController(
    @Autowired private val subjectService: SubjectService
) {
    @GetMapping("/subject")
    fun getAll(): List<Subject> {
        return subjectService.getAll()
    }
}