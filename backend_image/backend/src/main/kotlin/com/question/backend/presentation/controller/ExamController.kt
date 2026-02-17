package com.question.backend.presentation.controller

import com.question.backend.domain.service.*
import com.question.backend.domain.vo.Exam
import com.question.backend.domain.vo.ExamQuestion
import com.question.backend.domain.vo.PageSize
import com.question.backend.presentation.dto.ExamDTO
import com.question.backend.presentation.exception.ResourceNotFoundException
import com.question.backend.presentation.exception.ValidationException
import jakarta.validation.Valid
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ByteArrayResource
import org.springframework.core.io.Resource
import org.springframework.data.domain.Page
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class ExamController(
    @Autowired private val examService: ExamService,
    @Autowired private val subjectService: SubjectService,
    @Autowired private val teacherService: TeacherService,
    @Autowired private val teachingGradeService: TeachingGradeService,
    @Autowired private val questionService: QuestionService
) {
    @GetMapping("/exam")
    fun getAll(
        @RequestParam(value = "page", defaultValue = "0") page: Int,
        @RequestParam(value = "pageSize", defaultValue = "10") pageSize: Int
    ): Page<Exam> {
        return examService.getAll(page, pageSize)
    }

    @GetMapping("/exam/{id}")
    fun getById(@PathVariable id: Long): ResponseEntity<Exam> {
        val exam = examService.getExamById(id)

        return if (exam != null) {
            ResponseEntity.ok(exam)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @GetMapping("/exam/{id}/document")
    fun getDocument(
        @PathVariable id: Long,
        @RequestParam pageSize: PageSize = PageSize.A4,
        @RequestParam examCopies: Int = 1
    ): ResponseEntity<Resource> {
        val document = examService.getDocument(id, pageSize, examCopies)

        if (document != null) {
            val resource = ByteArrayResource(document)

            return ResponseEntity.ok()
                .contentLength(document.size.toLong())
                .contentType(MediaType.APPLICATION_PDF)
                .body(resource)
        } else {
            throw ResourceNotFoundException("Exam id $id not found")
        }
    }

    @PostMapping("/exam")
    fun createExam(@Valid @RequestBody examDTO: ExamDTO): ResponseEntity<String> {
        val subject = subjectService.getById(examDTO.subjectId) ?: throw ValidationException("Invalid subject id")
        val teacher = teacherService.getById(examDTO.teacherId) ?: throw ValidationException("Invalid teacher id")
        val teachingGrade =
            teachingGradeService.getById(examDTO.teachingGradeId)
                ?: throw ValidationException("Invalid teaching grade id")

        val examQuestions = examDTO.questions.map { questionDTO ->
            val question = questionService.getById(questionDTO.questionId)
                ?: throw ValidationException("Invalid question id: ${questionDTO.questionId}")

            if (question.teachingGrade.id != teachingGrade.id) {
                throw ValidationException("Invalid teaching grade id for question id ${question.id}")
            }

            ExamQuestion(0L, 0L, question, questionDTO.order, questionDTO.value)
        }

        val exam = Exam(
            0L,
            subject,
            teacher,
            teachingGrade,
            examDTO.classOfStudents,
            examDTO.date,
            examDTO.randomQuestionsOrder,
            examQuestions,
            null,
            null
        )

        examService.create(exam)

        return ResponseEntity.ok("Exam created successfully")
    }

    @PatchMapping("/exam/{id}")
    fun updateExam(@PathVariable id: Long, @Valid @RequestBody examDTO: ExamDTO): ResponseEntity<Exam> {
        val existingExam = examService.getExamById(id) ?: throw ResourceNotFoundException("Exam with id $id not found")

        val subject = subjectService.getById(examDTO.subjectId) ?: throw ValidationException("Invalid subject id")
        val teacher = teacherService.getById(examDTO.teacherId) ?: throw ValidationException("Invalid teacher id")
        val teachingGrade =
            teachingGradeService.getById(examDTO.teachingGradeId)
                ?: throw ValidationException("Invalid teaching grade id")

        val examQuestions = examDTO.questions.map { questionDTO ->
            val question = questionService.getById(questionDTO.questionId)
                ?: throw ValidationException("Invalid question id: ${questionDTO.questionId}")

            if (question.teachingGrade.id != teachingGrade.id) {
                throw ValidationException("Invalid teaching grade id for question id ${question.id}")
            }

            ExamQuestion(0L, id, question, questionDTO.order, questionDTO.value)
        }

        val exam = Exam(
            existingExam.id,
            subject,
            teacher,
            teachingGrade,
            examDTO.classOfStudents,
            examDTO.date,
            examDTO.randomQuestionsOrder,
            examQuestions,
            existingExam.createdAt,
            null
        )

        val updatedExam = examService.update(exam)

        return ResponseEntity.ok(updatedExam)
    }
}