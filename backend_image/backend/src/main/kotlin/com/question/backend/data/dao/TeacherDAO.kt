package com.question.backend.data.dao

import com.question.backend.data.entity.TeacherEntity
import org.springframework.data.jpa.repository.JpaRepository

interface TeacherDAO : JpaRepository<TeacherEntity, Long> {
    fun findAllByOrderByName(): List<TeacherEntity>
}