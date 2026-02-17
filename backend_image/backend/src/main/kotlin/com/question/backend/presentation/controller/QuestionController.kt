package com.question.backend.presentation.controller

import com.question.backend.domain.service.QuestionService
import com.question.backend.domain.service.SubjectService
import com.question.backend.domain.service.TeachingGradeService
import com.question.backend.domain.vo.EssayQuestion
import com.question.backend.domain.vo.MultipleChoiceQuestion
import com.question.backend.domain.vo.MultipleChoiceQuestionChoice
import com.question.backend.domain.vo.Question
import com.question.backend.presentation.dto.QuestionDTO
import com.question.backend.presentation.exception.ResourceNotFoundException
import com.question.backend.presentation.exception.ValidationException
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class QuestionController(
    @Autowired private val questionService: QuestionService,
    @Autowired private val subjectService: SubjectService,
    @Autowired private val teachingGradeService: TeachingGradeService,
) {
    @GetMapping("/question")
    fun getAllBySubjectAndTeachingGrade(
        @RequestParam(value = "subjectId") subjectId: Long,
        @RequestParam(value = "teachingGradeId") teachingGradeId: Long,
        @RequestParam(value = "page") page: Int?,
        @RequestParam(value = "pageSize") pageSize: Int?
    ): Page<Question> {
        return if (((page != null) && (page >= 0)) && ((pageSize != null) && (pageSize > 0))) {
            questionService.getAllBySubjectAndTeachingGrade(subjectId, teachingGradeId, page, pageSize)
        } else {
            questionService.getAllBySubjectAndTeachingGrade(subjectId, teachingGradeId, null, null)
        }
    }

    @GetMapping("/question/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<Question> {
        val question = questionService.getById(id)

        return if (question != null) {
            ResponseEntity.ok(question)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping("/question")
    fun createQuestion(@Valid @RequestBody questionDTO: QuestionDTO): ResponseEntity<String> {
        val subject = subjectService.getById(questionDTO.subjectId) ?: throw ValidationException("Invalid subject id")
        val teachingGrade = teachingGradeService.getById(questionDTO.teachingGradeId)
            ?: throw ValidationException("Invalid teaching grade id")

        val question = if ((questionDTO.choices?.size ?: 0) > 2) {
            val choices = questionDTO.choices?.map { choice ->
                MultipleChoiceQuestionChoice(
                    0L,
                    choice.text,
                    choice.order,
                    choice.isAnswer
                )
            }.orEmpty()

            MultipleChoiceQuestion(
                0,
                subject,
                teachingGrade,
                questionDTO.text,
                null,
                null,
                choices
            )
        } else if (!questionDTO.answer.isNullOrBlank() && (questionDTO.linesToAnswer != null)) {
            EssayQuestion(
                0,
                subject,
                teachingGrade,
                questionDTO.text,
                null,
                null,
                questionDTO.linesToAnswer,
                questionDTO.answer
            )
        } else {
            throw ValidationException("Can't determine the question type")
        }

        questionService.createQuestion(question)

        return ResponseEntity.ok("Question created successfully")
    }

    @PatchMapping("/question/{id}")
    fun updateQuestion(@PathVariable id: Long, @Valid @RequestBody questionDTO: QuestionDTO): ResponseEntity<Question> {
        val existingQuestion = questionService.getById(id)
            ?: throw ResourceNotFoundException("Question with id $id not found")

        val question = if ((questionDTO.choices?.size ?: 0) > 2) {
            val choices = questionDTO.choices?.map { choice ->
                MultipleChoiceQuestionChoice(
                    0L,
                    choice.text,
                    choice.order,
                    choice.isAnswer
                )
            }.orEmpty()

            MultipleChoiceQuestion(
                id,
                existingQuestion.subject,
                existingQuestion.teachingGrade,
                questionDTO.text,
                null,
                null,
                choices
            )
        } else if (!questionDTO.answer.isNullOrBlank() && (questionDTO.linesToAnswer != null)) {
            EssayQuestion(
                id,
                existingQuestion.subject,
                existingQuestion.teachingGrade,
                questionDTO.text,
                null,
                null,
                questionDTO.linesToAnswer,
                questionDTO.answer
            )
        } else {
            throw ValidationException("Can't determine the question type")
        }

        val updatedQuestion = questionService.updateQuestion(question)

        return ResponseEntity.ok(updatedQuestion)
    }
}