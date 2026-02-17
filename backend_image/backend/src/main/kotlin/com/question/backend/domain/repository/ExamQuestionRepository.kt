package com.question.backend.domain.repository

import com.question.backend.domain.vo.ExamQuestion

interface ExamQuestionRepository {
    fun getQuestions(examId: Long): List<ExamQuestion>

    fun createAll(examQuestions: List<ExamQuestion>): List<Long>

    fun deleteAllByExamId(examId: Long)
}