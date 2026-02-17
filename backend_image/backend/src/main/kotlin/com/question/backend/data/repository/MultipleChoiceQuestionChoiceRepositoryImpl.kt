package com.question.backend.data.repository

import com.question.backend.data.dao.MultipleChoiceQuestionChoiceDAO
import com.question.backend.data.mapper.MultipleChoiceQuestionChoiceMapper
import com.question.backend.data.mapper.QuestionMapper
import com.question.backend.domain.repository.MultipleChoiceQuestionChoiceRepository
import com.question.backend.domain.vo.MultipleChoiceQuestion
import com.question.backend.domain.vo.MultipleChoiceQuestionChoice
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class MultipleChoiceQuestionChoiceRepositoryImpl(
    @Autowired private val multipleChoiceQuestionChoiceDAO: MultipleChoiceQuestionChoiceDAO,
    @Autowired private val multipleChoiceQuestionChoiceMapper: MultipleChoiceQuestionChoiceMapper,
    @Autowired private val questionMapper: QuestionMapper
) : MultipleChoiceQuestionChoiceRepository {
    override fun findByQuestionId(questionId: Long): List<MultipleChoiceQuestionChoice> {
        return multipleChoiceQuestionChoiceDAO.findByQuestionId(questionId)
            .map { multipleChoiceQuestionChoiceMapper.fromEntity(it) }
    }

    override fun create(
        question: MultipleChoiceQuestion,
        choices: List<MultipleChoiceQuestionChoice>
    ): List<MultipleChoiceQuestionChoice> {
        val questionEntity = questionMapper.toEntity(question)

        val choicesEntities = choices.map {
            multipleChoiceQuestionChoiceMapper.toEntity(it)
                .copy(
                    question = questionEntity
                )
        }

        return multipleChoiceQuestionChoiceDAO.saveAllAndFlush(choicesEntities).map {
            multipleChoiceQuestionChoiceMapper.fromEntity(it)
        }
    }

    override fun deleteByQuestionId(questionId: Long) {
        multipleChoiceQuestionChoiceDAO.deleteByQuestionId(questionId)
    }
}