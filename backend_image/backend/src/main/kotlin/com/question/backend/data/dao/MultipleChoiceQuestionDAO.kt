package com.question.backend.data.dao

import com.question.backend.data.entity.MultipleChoiceQuestionEntity
import org.springframework.data.jpa.repository.JpaRepository

interface MultipleChoiceQuestionDAO : JpaRepository<MultipleChoiceQuestionEntity, Long> {
}