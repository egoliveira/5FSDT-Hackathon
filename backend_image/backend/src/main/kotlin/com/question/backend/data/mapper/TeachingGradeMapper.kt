package com.question.backend.data.mapper

import com.question.backend.data.entity.TeachingGradeEntity
import com.question.backend.domain.vo.TeachingGrade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class TeachingGradeMapper(@Autowired private val teachingLevelMapper: TeachingLevelMapper) {
    fun fromEntity(entity: TeachingGradeEntity): TeachingGrade {
        return TeachingGrade(entity.id, entity.name, entity.order, teachingLevelMapper.fromEntity(entity.teachingLevel))
    }

    fun toEntity(teachingGrade: TeachingGrade): TeachingGradeEntity {
        return TeachingGradeEntity(
            teachingGrade.id,
            teachingGrade.name,
            teachingGrade.order,
            teachingLevelMapper.toEntity(teachingGrade.teachingLevel)
        )
    }
}