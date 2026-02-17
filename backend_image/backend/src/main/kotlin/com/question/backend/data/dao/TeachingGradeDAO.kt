package com.question.backend.data.dao

import com.question.backend.data.entity.TeachingGradeEntity
import org.springframework.data.jpa.repository.JpaRepository

interface TeachingGradeDAO : JpaRepository<TeachingGradeEntity, Long> {
    fun findAllByTeachingLevelIdOrderByOrder(teachingLevelId: Long): List<TeachingGradeEntity>
}