package com.question.backend.data.mapper

import com.question.backend.data.entity.SubjectEntity
import com.question.backend.domain.vo.Subject
import org.springframework.stereotype.Component

@Component
class SubjectMapper {
    fun fromEntity(entity: SubjectEntity): Subject {
        return Subject(entity.id, entity.name)
    }

    fun toEntity(subject: Subject): SubjectEntity {
        return SubjectEntity(
            subject.id,
            subject.name,
        )
    }
}