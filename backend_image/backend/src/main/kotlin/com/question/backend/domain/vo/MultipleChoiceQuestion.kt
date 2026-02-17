package com.question.backend.domain.vo

import java.time.ZonedDateTime

data class MultipleChoiceQuestion(
    override val id: Long,
    override val subject: Subject,
    override val teachingGrade: TeachingGrade,
    override val text: String,
    override val createdAt: ZonedDateTime?,
    override val updatedAt: ZonedDateTime?,
    val choices: List<MultipleChoiceQuestionChoice>
) : Question(id, subject, teachingGrade, text, createdAt, updatedAt)