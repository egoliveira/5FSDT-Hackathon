package com.question.backend.data.mapper

import com.question.backend.data.entity.ExamQuestionEntity
import com.question.backend.domain.vo.ExamQuestion
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class ExamQuestionMapper(
    @Autowired private val questionMapper: QuestionMapper
) {
    fun fromEntity(entity: ExamQuestionEntity): ExamQuestion {
        return ExamQuestion(
            entity.id,
            entity.examId,
            questionMapper.fromEntity(entity.question),
            entity.order,
            entity.value
        )
    }

    fun toEntity(examQuestion: ExamQuestion): ExamQuestionEntity {
        return ExamQuestionEntity(
            examQuestion.id,
            examQuestion.examId,
            questionMapper.toEntity(examQuestion.question),
            examQuestion.order,
            examQuestion.value
        )
    }
}