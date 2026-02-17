package com.question.backend.presentation.controller

import com.question.backend.domain.service.TeachingGradeService
import com.question.backend.domain.vo.TeachingGrade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class TeachingGradeController(
    @Autowired private val teachingGradeService: TeachingGradeService
) {
    @GetMapping("/teachinggrade/teachinglevel/{teachingLevelId}")
    fun getAllByTeachingLevelId(@PathVariable teachingLevelId: Long): List<TeachingGrade> {
        return teachingGradeService.getAllByTeachingLevelId(teachingLevelId)
    }
}