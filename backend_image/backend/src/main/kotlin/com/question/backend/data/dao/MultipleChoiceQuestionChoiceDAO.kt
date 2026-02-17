package com.question.backend.data.dao

import com.question.backend.data.entity.MultipleChoiceQuestionChoiceEntity
import org.springframework.data.jpa.repository.JpaRepository

interface MultipleChoiceQuestionChoiceDAO : JpaRepository<MultipleChoiceQuestionChoiceEntity, Long> {
    fun findByQuestionId(questionId: Long): List<MultipleChoiceQuestionChoiceEntity>

    fun deleteByQuestionId(questionId: Long)
}