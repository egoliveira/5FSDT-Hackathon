package com.question.backend.data.dao

import com.question.backend.data.entity.SubjectEntity
import org.springframework.data.jpa.repository.JpaRepository

interface SubjectDAO : JpaRepository<SubjectEntity, Long> {
    fun findAllByOrderByName(): List<SubjectEntity>
}