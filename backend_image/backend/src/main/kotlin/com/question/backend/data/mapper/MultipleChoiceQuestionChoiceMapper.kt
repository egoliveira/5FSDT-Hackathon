package com.question.backend.data.mapper

import com.question.backend.data.entity.*
import com.question.backend.domain.vo.MultipleChoiceQuestionChoice
import org.springframework.stereotype.Component

@Component
class MultipleChoiceQuestionChoiceMapper {
    fun fromEntity(entity: MultipleChoiceQuestionChoiceEntity): MultipleChoiceQuestionChoice {
        return MultipleChoiceQuestionChoice(
            id = entity.id,
            text = entity.text,
            order = entity.order,
            isAnswer = entity.isAnswer
        )
    }

    fun toEntity(choice: MultipleChoiceQuestionChoice): MultipleChoiceQuestionChoiceEntity {
        return MultipleChoiceQuestionChoiceEntity(
            id = choice.id,
            text = choice.text,
            order = choice.order,
            isAnswer = choice.isAnswer,
            question = MultipleChoiceQuestionEntity(
                id = 0,
                subject = SubjectEntity(
                    id = 0,
                    name = ""
                ),
                teachingGrade = TeachingGradeEntity(
                    id = 0,
                    name = "",
                    order = 0,
                    teachingLevel = TeachingLevelEntity(
                        id = 0,
                        name = "",
                        order = 0
                    )
                ),
                text = "",
                createdAt = null,
                updatedAt = null
            )
        )
    }
}