package com.question.backend.data.repository

import com.question.backend.data.dao.ExamQuestionDAO
import com.question.backend.data.dao.MultipleChoiceQuestionChoiceDAO
import com.question.backend.data.entity.MultipleChoiceQuestionEntity
import com.question.backend.data.mapper.ExamQuestionMapper
import com.question.backend.data.mapper.MultipleChoiceQuestionChoiceMapper
import com.question.backend.domain.repository.ExamQuestionRepository
import com.question.backend.domain.vo.ExamQuestion
import com.question.backend.domain.vo.MultipleChoiceQuestion
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class ExamQuestionRepositoryImpl(
    @Autowired private val examQuestionDAO: ExamQuestionDAO,
    @Autowired private val multipleChoiceQuestionChoiceDAO: MultipleChoiceQuestionChoiceDAO,
    @Autowired private val examQuestionMapper: ExamQuestionMapper,
    @Autowired private val multipleChoiceQuestionChoiceMapper: MultipleChoiceQuestionChoiceMapper
) : ExamQuestionRepository {
    override fun getQuestions(examId: Long): List<ExamQuestion> {
        return examQuestionDAO.findByExamId(examId).map { examQuestionEntity ->
            var examQuestion = examQuestionMapper.fromEntity(examQuestionEntity)

            val questionEntity = examQuestionEntity.question
            val question = examQuestion.question

            if ((questionEntity is MultipleChoiceQuestionEntity) && (question is MultipleChoiceQuestion)) {
                val choicesEntities = multipleChoiceQuestionChoiceDAO.findByQuestionId(questionEntity.id)

                examQuestion = examQuestion.copy(question = question.copy(choices = choicesEntities.map {
                    multipleChoiceQuestionChoiceMapper.fromEntity(
                        it
                    )
                }))
            }

            examQuestion
        }
    }

    override fun createAll(examQuestions: List<ExamQuestion>): List<Long> {
        val examQuestionEntities = examQuestions.map { examQuestion -> examQuestionMapper.toEntity(examQuestion) }

        examQuestionDAO.saveAll(examQuestionEntities)

        return examQuestionEntities.map { it.id }
    }

    override fun deleteAllByExamId(examId: Long) {
        examQuestionDAO.deleteAllByExamId(examId)
    }
}