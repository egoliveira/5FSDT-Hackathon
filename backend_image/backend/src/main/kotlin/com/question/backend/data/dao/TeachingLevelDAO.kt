package com.question.backend.data.dao

import com.question.backend.data.entity.TeachingLevelEntity
import org.springframework.data.jpa.repository.JpaRepository

interface TeachingLevelDAO : JpaRepository<TeachingLevelEntity, Long> {
    fun findAllByOrderByOrder(): List<TeachingLevelEntity>
}