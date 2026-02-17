package com.question.backend.data.entity

import jakarta.persistence.*
import java.io.Serializable

@Entity
@Table(name = "multiple_choice_question_choice")
data class MultipleChoiceQuestionChoiceEntity(
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,

    @Column(name = "text", nullable = false)
    val text: String,

    @Column(name = "\"order\"", nullable = false)
    val order: Int,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    val question: QuestionEntity,

    @Column(name = "answer", nullable = false)
    val isAnswer: Boolean
) : Serializable