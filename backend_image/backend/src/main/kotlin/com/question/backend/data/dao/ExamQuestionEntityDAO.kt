package com.question.backend.data.dao

import com.question.backend.data.entity.ExamQuestionEntity
import org.springframework.data.jpa.repository.JpaRepository

interface ExamQuestionEntityDAO : JpaRepository<ExamQuestionEntity, Long> {
    fun findByExamId(examId: Long): List<ExamQuestionEntity>
}