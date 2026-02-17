package com.question.backend.data.mapper

import com.question.backend.data.entity.TeacherEntity
import com.question.backend.domain.vo.Teacher
import org.springframework.stereotype.Component

@Component
class TeacherMapper {
    fun fromEntity(entity: TeacherEntity): Teacher {
        return Teacher(entity.id, entity.name)
    }

    fun toEntity(teacher: Teacher): TeacherEntity {
        return TeacherEntity(teacher.id, teacher.name)
    }
}