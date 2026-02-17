package com.question.backend.data.dao

import com.question.backend.data.entity.ExamEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ExamDAO : JpaRepository<ExamEntity, Long> {
}