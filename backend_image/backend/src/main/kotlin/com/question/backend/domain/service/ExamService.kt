package com.question.backend.domain.service

import com.question.backend.domain.repository.ExamQuestionRepository
import com.question.backend.domain.repository.ExamRepository
import com.question.backend.domain.repository.MultipleChoiceQuestionChoiceRepository
import com.question.backend.domain.vo.Exam
import com.question.backend.domain.vo.MultipleChoiceQuestion
import com.question.backend.domain.vo.PageSize
import com.question.backend.presentation.exception.ResourceNotFoundException
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class ExamService(
    @Autowired private val examRepository: ExamRepository,
    @Autowired private val examQuestionRepository: ExamQuestionRepository,
    @Autowired private val multipleChoiceQuestionChoiceRepository: MultipleChoiceQuestionChoiceRepository
) {
    fun getAll(pageNumber: Int, pageSize: Int): Page<Exam> {
        return examRepository.getAll(PageRequest.of(pageNumber, pageSize))
    }

    fun getExamById(id: Long): Exam? {
        val exam = examRepository.getById(id)

        return if (exam != null) {
            val questions = examQuestionRepository.getQuestions(id).map { examQuestion ->
                val question = examQuestion.question

                if (question is MultipleChoiceQuestion) {
                    examQuestion.copy(
                        question = question.copy(
                            choices = multipleChoiceQuestionChoiceRepository.findByQuestionId(
                                question.id
                            )
                        )
                    )
                } else examQuestion
            }

            exam.copy(questions = questions)
        } else null
    }

    fun getDocument(id: Long, pageSize: PageSize, examCopies: Int = 1): ByteArray? {
        val exam = getExamById(id)

        return if (exam != null) {
            examRepository.getDocument(exam, pageSize, examCopies)
        } else null
    }

    @Transactional
    fun create(exam: Exam): Long {
        val examId = examRepository.save(exam)

        val examQuestions = exam.questions.map { examQuestion -> examQuestion.copy(examId = examId) }

        examQuestionRepository.createAll(examQuestions)

        return examId
    }

    @Transactional
    fun update(exam: Exam): Exam {
        val examId = examRepository.save(exam)

        examQuestionRepository.deleteAllByExamId(examId)

        val examQuestions = exam.questions.map { examQuestion -> examQuestion.copy(examId = examId) }

        examQuestionRepository.createAll(examQuestions)

        return getExamById(examId) ?: throw ResourceNotFoundException("Exam not found")
    }
}