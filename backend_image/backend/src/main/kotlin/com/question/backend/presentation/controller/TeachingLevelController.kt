package com.question.backend.presentation.controller

import com.question.backend.domain.service.TeachingLevelService
import com.question.backend.domain.vo.TeachingLevel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TeachingLevelController(
    @Autowired private val teachingLevelService: TeachingLevelService
) {
    @GetMapping("/teachinglevel")
    fun getAll(): List<TeachingLevel> {
        return teachingLevelService.getAll()
    }
}