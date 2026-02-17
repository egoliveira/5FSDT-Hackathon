package com.question.backend.domain.service

import com.question.backend.domain.repository.MultipleChoiceQuestionChoiceRepository
import com.question.backend.domain.repository.QuestionRepository
import com.question.backend.domain.vo.MultipleChoiceQuestion
import com.question.backend.domain.vo.Question
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class QuestionService(
    @Autowired private val questionRepository: QuestionRepository,
    @Autowired private val multipleChoiceQuestionChoiceRepository: MultipleChoiceQuestionChoiceRepository
) {
    fun getAllBySubjectAndTeachingGrade(
        subjectId: Long,
        teachingGradeId: Long,
        pageNumber: Int?,
        pageSize: Int?
    ): Page<Question> {
        val pageable = if ((pageNumber != null) && (pageSize != null)) {
            PageRequest.of(pageNumber, pageSize)
        } else {
            Pageable.unpaged()
        }

        val page = questionRepository.getAllBySubjectAndTeachingGrade(
            subjectId,
            teachingGradeId,
            pageable
        )

        val content = page.content.map { question ->
            if (question is MultipleChoiceQuestion) {
                question.copy(
                    choices = multipleChoiceQuestionChoiceRepository.findByQuestionId(question.id)
                )
            } else question
        }

        return PageImpl(content, page.pageable, page.totalElements)
    }

    fun getById(questionId: Long): Question? {
        var question = questionRepository.getById(questionId)

        if (question is MultipleChoiceQuestion) {
            question = question.copy(
                choices = multipleChoiceQuestionChoiceRepository.findByQuestionId(question.id)
            )
        }

        return question
    }

    @Transactional
    fun createQuestion(question: Question): Question {
        var newQuestion = questionRepository.save(question)

        if (question is MultipleChoiceQuestion) {
            val newChoices =
                multipleChoiceQuestionChoiceRepository.create(newQuestion as MultipleChoiceQuestion, question.choices)

            newQuestion = newQuestion.copy(choices = newChoices)
        }

        return newQuestion
    }

    @Transactional
    fun updateQuestion(question: Question): Question {
        multipleChoiceQuestionChoiceRepository.deleteByQuestionId(question.id)

        var updatedQuestion = questionRepository.save(question)

        if (question is MultipleChoiceQuestion) {
            val newChoices = multipleChoiceQuestionChoiceRepository.create(question, question.choices)

            updatedQuestion = (updatedQuestion as MultipleChoiceQuestion).copy(choices = newChoices)
        }

        return updatedQuestion
    }
}