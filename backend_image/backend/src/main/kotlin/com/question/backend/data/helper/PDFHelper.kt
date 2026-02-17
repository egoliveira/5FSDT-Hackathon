package com.question.backend.data.helper

import com.itextpdf.text.*
import com.itextpdf.text.pdf.BaseFont
import com.itextpdf.text.pdf.draw.VerticalPositionMark
import com.question.backend.domain.vo.*
import com.question.backend.domain.vo.PageSize
import org.springframework.stereotype.Component
import java.text.NumberFormat
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*

@Component
class PDFHelper {
    private val notoSansFont by lazy {
        val fontPath = javaClass.classLoader.getResource("font/NotoSans-Regular.ttf")!!.path

        BaseFont.createFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED)
    }

    private val notoSansBoldFont by lazy {
        val fontPath = javaClass.classLoader.getResource("font/NotoSans-Bold.ttf")!!.path

        BaseFont.createFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED)
    }

    private val notoSansItalicFont by lazy {
        val fontPath = javaClass.classLoader.getResource("font/NotoSans-Italic.ttf")!!.path

        BaseFont.createFont(fontPath, BaseFont.IDENTITY_H, BaseFont.EMBEDDED)
    }

    fun createDocument(pageSize: PageSize): Document {
        val document = Document()

        document.setPageSize(
            when (pageSize) {
                PageSize.A4 -> com.itextpdf.text.PageSize.A4
                PageSize.LETTER -> com.itextpdf.text.PageSize.LETTER
            }
        )

        return document
    }

    fun writeEmptyLine(document: Document, count: Int = 1) {
        for (i in 1..count) {
            document.add(Paragraph("\n"))
        }
    }

    fun writeExamTitle(document: Document, exam: Exam) {
        val paragraph =
            Paragraph(
                "Avaliação de ${exam.subject.name}",
                getFont(notoSansFont, 16f)
            ).apply {
                alignment = Element.ALIGN_CENTER
            }

        document.add(paragraph)
    }

    fun writeExamAnswersTitle(document: Document, exam: Exam) {
        val paragraph =
            Paragraph(
                "Avaliação de ${exam.subject.name} - Gabarito",
                getFont(notoSansFont, 16f)
            ).apply {
                alignment = Element.ALIGN_CENTER
            }

        document.add(paragraph)
    }

    fun writeExamTeachingLevelGradeAndClass(document: Document, exam: Exam) {
        val paragraph = Paragraph()

        val teachingLevelAndGradeChunk = Chunk(
            "${exam.teachingGrade.teachingLevel.name} - ${exam.teachingGrade.name}",
            getFont(notoSansFont, 14f)
        )

        val classChunk = Chunk(
            exam.classOfStudents, getFont(notoSansFont, 14f)
        )

        paragraph.run {
            add(teachingLevelAndGradeChunk)
            add(Chunk(VerticalPositionMark()))
            add(classChunk)
        }

        document.add(paragraph)
    }

    fun writeTeacherNameAndDate(document: Document, exam: Exam) {
        val paragraph = Paragraph()

        val teacherNameChunk = Chunk("Professor: ${exam.teacher.name}", getFont(notoSansFont, 14f))

        val brFormatter = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.SHORT)
            .withLocale(BR_LOCALE)

        val dateChunk = Chunk(
            exam.date.format(brFormatter), getFont(notoSansFont, 14f)
        )

        paragraph.run {
            add(teacherNameChunk)
            add(Chunk(VerticalPositionMark()))
            add(dateChunk)
        }

        document.add(paragraph)
    }

    fun writeStudentName(document: Document) {
        val paragraph =
            Paragraph(
                "Nome do Aluno: ",
                getFont(notoSansFont, 14f)
            ).apply {
                alignment = Element.ALIGN_JUSTIFIED
            }

        document.add(paragraph)
    }

    fun writeQuestion(document: Document, question: ExamQuestion, order: Int, writeAnswer: Boolean) {
        when (question.question) {
            is EssayQuestion -> writeEssayQuestion(document, question, question.question, order, writeAnswer)
            is MultipleChoiceQuestion -> writeMultipleChoiceQuestion(
                document,
                question,
                question.question,
                order,
                writeAnswer
            )
        }
    }

    private fun writeEssayQuestion(
        document: Document,
        examQuestion: ExamQuestion,
        question: EssayQuestion,
        order: Int,
        writeAnswer: Boolean
    ) {
        val orderChunk = Chunk("$order) ", getFont(notoSansFont, 12f))

        val questionValueChunk = Chunk("[${NUMBER_FORMAT.format(examQuestion.value)}] ", getFont(notoSansFont, 12f))

        val textParts = question.text.split("\\n")

        val textChunk = Chunk(textParts.first(), getFont(notoSansFont, 12f))

        val part1Paragraph = Paragraph().apply {
            alignment = Element.ALIGN_JUSTIFIED
            add(orderChunk)
            add(questionValueChunk)
            add(textChunk)
        }

        document.add(part1Paragraph)

        for (i in 1 until textParts.size) {
            val nextPartParagraph = Paragraph(textParts[i], getFont(notoSansFont, 12f)).apply {
                alignment = Element.ALIGN_JUSTIFIED
            }

            document.add(nextPartParagraph)
        }

        if (writeAnswer) {
            writeEmptyLine(document)

            val answerParagraph = Paragraph(question.answer, getFont(notoSansItalicFont, 12f)).apply {
                alignment = Element.ALIGN_JUSTIFIED
            }

            document.add(answerParagraph)

            writeEmptyLine(document)
        } else {
            writeEmptyLine(document, question.linesToAnswer)
        }
    }

    private fun writeMultipleChoiceQuestion(
        document: Document,
        examQuestion: ExamQuestion,
        question: MultipleChoiceQuestion,
        order: Int,
        writeAnswer: Boolean
    ) {
        val orderChunk = Chunk("$order) ", getFont(notoSansFont, 12f))

        val questionValueChunk = Chunk("[${NUMBER_FORMAT.format(examQuestion.value)}] ", getFont(notoSansFont, 12f))

        val textParts = question.text.split("\\n")

        val textChunk = Chunk(textParts.first(), getFont(notoSansFont, 12f))

        val part1Paragraph = Paragraph().apply {
            alignment = Element.ALIGN_JUSTIFIED
            add(orderChunk)
            add(questionValueChunk)
            add(textChunk)
        }

        document.add(part1Paragraph)

        for (i in 1 until textParts.size) {
            val nextPartParagraph = Paragraph(textParts[i], getFont(notoSansFont, 12f)).apply {
                alignment = Element.ALIGN_JUSTIFIED
            }

            document.add(nextPartParagraph)
        }

        writeEmptyLine(document)

        question.choices.sortedBy { it.order }.forEachIndexed { index, choice ->
            val letter = ('a'.code + index).toChar()

            val font = if (writeAnswer && choice.isAnswer) {
                notoSansBoldFont
            } else notoSansFont

            val letterChunk = Chunk("$letter) ", getFont(font, 12f))
            val textChunk = Chunk(choice.text, getFont(font, 12f))

            val choiceParagraph = Paragraph().apply {
                alignment = Element.ALIGN_JUSTIFIED
                add(letterChunk)
                add(textChunk)
            }

            document.add(choiceParagraph)
        }
    }

    private fun getFont(baseFont: BaseFont, size: Float): Font {
        return Font(baseFont, size)
    }

    companion object {
        private val BR_LOCALE = Locale("pt", "BR")

        private val NUMBER_FORMAT = NumberFormat.getNumberInstance(BR_LOCALE).apply {
            minimumFractionDigits = 1
            maximumFractionDigits = 2
        }
    }
}