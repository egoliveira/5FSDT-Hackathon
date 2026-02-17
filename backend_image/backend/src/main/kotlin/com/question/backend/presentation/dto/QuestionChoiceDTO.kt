package com.question.backend.presentation.dto

import jakarta.validation.constraints.NotBlank

data class QuestionChoiceDTO(
    val id: Long?,
    @NotBlank
    val text: String,
    val order: Int,
    val isAnswer: Boolean
)