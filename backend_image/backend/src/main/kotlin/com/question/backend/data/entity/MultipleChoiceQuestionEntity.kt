package com.question.backend.data.entity

import jakarta.persistence.Entity
import jakarta.persistence.Table
import java.time.ZonedDateTime

@Entity
@Table(name = "multiple_choice_question")
class MultipleChoiceQuestionEntity(
    id: Long,
    subject: SubjectEntity,
    teachingGrade: TeachingGradeEntity,
    text: String,
    createdAt: ZonedDateTime?,
    updatedAt: ZonedDateTime?
) : QuestionEntity(id, subject, teachingGrade, text, createdAt, updatedAt)