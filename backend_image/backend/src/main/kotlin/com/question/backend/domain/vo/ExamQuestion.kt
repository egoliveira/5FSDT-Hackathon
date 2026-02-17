package com.question.backend.domain.vo

data class ExamQuestion(
    val id: Long,
    val examId: Long,
    val question: Question,
    val order: Int,
    val value: Float
)
