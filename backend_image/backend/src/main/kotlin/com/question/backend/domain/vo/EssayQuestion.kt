package com.question.backend.domain.vo

import java.time.ZonedDateTime

class EssayQuestion(
    id: Long,
    subject: Subject,
    teachingGrade: TeachingGrade,
    text: String,
    createdAt: ZonedDateTime?,
    updatedAt: ZonedDateTime?,
    val linesToAnswer: Int,
    val answer: String
) : Question(id, subject, teachingGrade, text, createdAt, updatedAt)