package com.question.backend.data.repository

import com.itextpdf.layout.element.AreaBreak
import com.question.backend.data.dao.ExamDAO
import com.question.backend.data.dao.ExamQuestionEntityDAO
import com.question.backend.data.helper.PDFHelper
import com.question.backend.data.mapper.ExamMapper
import com.question.backend.data.mapper.ExamQuestionMapper
import com.question.backend.domain.repository.ExamRepository
import com.question.backend.domain.vo.Exam
import com.question.backend.domain.vo.PageSize
import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository
import kotlin.random.Random

@Repository
class ExamRepositoryImpl(
    @Autowired private val examDAO: ExamDAO,
    @Autowired private val examQuestionEntityDAO: ExamQuestionEntityDAO,
    @Autowired private val examMapper: ExamMapper,
    @Autowired private val examQuestionMapper: ExamQuestionMapper,
    @Autowired private val pdfHelper: PDFHelper
) : ExamRepository {
    override fun getAll(pageable: Pageable): Page<Exam> {
        val entitiesPage = examDAO.findAll(pageable)

        val exams = entitiesPage.content.map { examMapper.fromEntity(it) }

        return PageImpl(exams, pageable, entitiesPage.totalElements)
    }

    override fun getById(id: Long): Exam? {
        val value = examDAO.findById(id)

        return if (value.isPresent) {
            val examEntity = value.get()

            val questions = examQuestionEntityDAO.findByExamId(examEntity.id)
                .map { examQuestion -> examQuestionMapper.fromEntity(examQuestion) }

            examMapper.fromEntity(examEntity).copy(questions = questions)
        } else null
    }

    override fun getDocument(exam: Exam, pageSize: PageSize, examCopies: Int): ByteArray {
        val questionOrders = LinkedHashSet<List<Int>>()

        var maxRandomExams = 1

        exam.questions.size.downTo(1).forEach { maxRandomExams *= it }

        if (exam.randomQuestionsOrder && (examCopies > 1) && (examCopies <= maxRandomExams)) {
            while (questionOrders.size < examCopies) {
                val copyOrderSet = LinkedHashSet<Int>()

                while (copyOrderSet.size < exam.questions.size) {
                    val questionNumber = Random.nextInt(exam.questions.size)

                    copyOrderSet.add(questionNumber)
                }

                val copyOrder = copyOrderSet.toList()

                questionOrders.add(copyOrder)
            }
        } else {
            questionOrders.add(List(exam.questions.size) { index -> index })
        }

        val baos = ByteArrayOutputStream()

        val document = pdfHelper.createDocument(pageSize, baos)

        questionOrders.forEachIndexed { examCopyIndex, order ->
            pdfHelper.run {
                writeExamTitle(document, exam)
                writeEmptyLine(document)
                writeExamTeachingLevelGradeAndClass(document, exam)
                writeTeacherNameAndDate(document, exam)
                writeStudentName(document)
                writeEmptyLine(document, 2)

                order.forEachIndexed { index, questionIndex ->
                    writeQuestion(document, exam.questions[questionIndex], index + 1, false)
                    writeEmptyLine(document, 2)
                }

                if (examCopyIndex < questionOrders.size - 1) {
                    document.add(AreaBreak())
                }
            }
        }

        pdfHelper.run {
            document.add(AreaBreak())
            writeExamAnswersTitle(document, exam)
            writeEmptyLine(document)
            writeExamTeachingLevelGradeAndClass(document, exam)
            writeTeacherNameAndDate(document, exam)
            writeStudentName(document)
            writeEmptyLine(document, 2)

            exam.questions.forEachIndexed { index, question ->
                writeQuestion(document, question, index + 1, true)
                writeEmptyLine(document, 2)
            }
        }

        document.close()

        return baos.toByteArray()
    }

    override fun save(exam: Exam): Long {
        val newExam = examDAO.saveAndFlush(examMapper.toEntity(exam))

        return newExam.id
    }
}