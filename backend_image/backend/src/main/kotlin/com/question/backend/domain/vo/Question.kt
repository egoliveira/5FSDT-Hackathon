package com.question.backend.domain.vo

import java.time.ZonedDateTime

abstract class Question(
    open val id: Long,
    open val subject: Subject,
    open val teachingGrade: TeachingGrade,
    open val text: String,
    open val createdAt: ZonedDateTime?,
    open val updatedAt: ZonedDateTime?
)
