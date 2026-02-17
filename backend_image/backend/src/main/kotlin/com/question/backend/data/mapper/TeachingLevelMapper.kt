package com.question.backend.data.mapper

import com.question.backend.data.entity.TeachingLevelEntity
import com.question.backend.domain.vo.TeachingLevel
import org.springframework.stereotype.Component

@Component
class TeachingLevelMapper {
    fun fromEntity(entity: TeachingLevelEntity): TeachingLevel {
        return TeachingLevel(entity.id, entity.name, entity.order)
    }

    fun toEntity(teachingLevel: TeachingLevel): TeachingLevelEntity {
        return TeachingLevelEntity(teachingLevel.id, teachingLevel.name, teachingLevel.order)
    }
}