package com.question.backend.domain.repository

import com.question.backend.domain.vo.MultipleChoiceQuestion
import com.question.backend.domain.vo.MultipleChoiceQuestionChoice

interface MultipleChoiceQuestionChoiceRepository {
    fun findByQuestionId(questionId: Long): List<MultipleChoiceQuestionChoice>

    fun create(
        question: MultipleChoiceQuestion,
        choices: List<MultipleChoiceQuestionChoice>
    ): List<MultipleChoiceQuestionChoice>

    fun deleteByQuestionId(questionId: Long)
}