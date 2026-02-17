package com.question.backend.data.mapper

import com.question.backend.data.entity.EssayQuestionEntity
import com.question.backend.data.entity.MultipleChoiceQuestionEntity
import com.question.backend.data.entity.QuestionEntity
import com.question.backend.domain.vo.EssayQuestion
import com.question.backend.domain.vo.MultipleChoiceQuestion
import com.question.backend.domain.vo.Question
import org.hibernate.Hibernate
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.ZonedDateTime

@Component
class QuestionMapper(
    @Autowired private val subjectMapper: SubjectMapper,
    @Autowired private val teachingGradeMapper: TeachingGradeMapper
) {
    fun fromEntity(entity: QuestionEntity): Question {
        val entityClass = Hibernate.getClass(entity)

        return when (entityClass) {
            EssayQuestionEntity::class.java -> {
                val essayQuestion = Hibernate.unproxy(entity) as EssayQuestionEntity

                EssayQuestion(
                    essayQuestion.id,
                    subjectMapper.fromEntity(essayQuestion.subject),
                    teachingGradeMapper.fromEntity(essayQuestion.teachingGrade),
                    essayQuestion.text,
                    essayQuestion.createdAt,
                    essayQuestion.updatedAt,
                    essayQuestion.linesToAnswer,
                    essayQuestion.answer
                )
            }

            MultipleChoiceQuestionEntity::class.java -> MultipleChoiceQuestion(
                entity.id,
                subjectMapper.fromEntity(entity.subject),
                teachingGradeMapper.fromEntity(entity.teachingGrade),
                entity.text,
                entity.createdAt,
                entity.updatedAt,
                emptyList()
            )

            else -> throw IllegalArgumentException("Unknown entity type ${entity.javaClass}")
        }
    }

    fun toEntity(question: Question): QuestionEntity {
        return when (question) {
            is EssayQuestion -> EssayQuestionEntity(
                question.id,
                subjectMapper.toEntity(question.subject),
                teachingGradeMapper.toEntity(question.teachingGrade),
                question.text,
                question.createdAt ?: ZonedDateTime.now(),
                question.updatedAt ?: ZonedDateTime.now(),
                question.linesToAnswer,
                question.answer
            )

            is MultipleChoiceQuestion -> MultipleChoiceQuestionEntity(
                question.id,
                subjectMapper.toEntity(question.subject),
                teachingGradeMapper.toEntity(question.teachingGrade),
                question.text,
                question.createdAt ?: ZonedDateTime.now(),
                question.updatedAt ?: ZonedDateTime.now(),
            )

            else -> throw IllegalArgumentException("Unknown question type ${question.javaClass}")
        }
    }
}