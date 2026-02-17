package com.question.backend.presentation.dto

import jakarta.validation.constraints.NotBlank
import java.time.LocalDate

data class ExamDTO(
    val subjectId: Long,
    val teacherId: Long,
    val teachingGradeId: Long,
    @NotBlank val classOfStudents: String,
    val date: LocalDate,
    val randomQuestionsOrder: Boolean,
    val questions: List<ExamQuestionDTO>
)
