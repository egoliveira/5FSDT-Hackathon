package com.question.backend.domain.service

import com.question.backend.domain.repository.TeachingGradeRepository
import com.question.backend.domain.vo.TeachingGrade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TeachingGradeService(
    @Autowired val teachingGradeRepository: TeachingGradeRepository
) {
    fun getAllByTeachingLevelId(teachingLevelId: Long): List<TeachingGrade> {
        return teachingGradeRepository.getAllByTeachingLevelId(teachingLevelId)
    }

    fun getById(teachingGradeId: Long): TeachingGrade? {
        return teachingGradeRepository.getById(teachingGradeId)
    }
}