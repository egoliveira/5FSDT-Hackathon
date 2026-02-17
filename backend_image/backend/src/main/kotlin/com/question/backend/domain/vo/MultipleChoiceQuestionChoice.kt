package com.question.backend.domain.vo

data class MultipleChoiceQuestionChoice(
    val id: Long,
    val text: String,
    val order: Int,
    val isAnswer: Boolean
)