package com.question.backend.presentation.dto

import jakarta.validation.constraints.NotBlank

data class QuestionDTO(
    val subjectId: Long,
    val teachingGradeId: Long,
    @NotBlank
    val text: String,
    val choices: List<QuestionChoiceDTO>?,
    val answer: String?,
    val linesToAnswer: Int?
)