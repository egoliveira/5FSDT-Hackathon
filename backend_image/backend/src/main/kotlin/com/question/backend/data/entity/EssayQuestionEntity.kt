package com.question.backend.data.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table
import java.time.ZonedDateTime

@Entity
@Table(name = "essay_question")
class EssayQuestionEntity(
    id: Long,
    subject: SubjectEntity,
    teachingGrade: TeachingGradeEntity,
    text: String,
    createdAt: ZonedDateTime?,
    updatedAt: ZonedDateTime?,
    @Column(name = "lines_to_answer", nullable = false)
    var linesToAnswer: Int,
    @Column(name = "answer", nullable = false)
    var answer: String
) : QuestionEntity(id, subject, teachingGrade, text, createdAt, updatedAt)