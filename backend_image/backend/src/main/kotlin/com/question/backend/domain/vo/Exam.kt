package com.question.backend.domain.vo

import java.time.LocalDate
import java.time.ZonedDateTime

data class Exam(
    val id: Long,
    val subject: Subject,
    val teacher: Teacher,
    val teachingGrade: TeachingGrade,
    val classOfStudents: String,
    val date: LocalDate,
    val randomQuestionsOrder: Boolean,
    val questions: List<ExamQuestion>,
    val createdAt: ZonedDateTime?,
    val updatedAt: ZonedDateTime?
)
