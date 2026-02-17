package com.question.backend.data.dao

import com.question.backend.data.entity.EssayQuestionEntity
import org.springframework.data.jpa.repository.JpaRepository

interface EssayQuestionDAO : JpaRepository<EssayQuestionEntity, Long> {
}