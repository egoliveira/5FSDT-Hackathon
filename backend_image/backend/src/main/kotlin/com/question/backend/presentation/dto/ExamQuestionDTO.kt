package com.question.backend.presentation.dto

import jakarta.validation.constraints.Max
import jakarta.validation.constraints.Min

data class ExamQuestionDTO(
    val questionId: Long,
    @Min(0)
    @Max(100)
    val value: Float,
    val order: Int
)
