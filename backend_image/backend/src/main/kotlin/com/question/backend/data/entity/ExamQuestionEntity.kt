package com.question.backend.data.entity

import jakarta.persistence.*

@Entity
@Table(name = "exam_question")
data class ExamQuestionEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "exam_id", nullable = false)
    val examId: Long,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    val question: QuestionEntity,

    @Column(name = "\"order\"", nullable = false)
    val order: Int,

    @Column(name = "value", nullable = false)
    val value: Float
)
