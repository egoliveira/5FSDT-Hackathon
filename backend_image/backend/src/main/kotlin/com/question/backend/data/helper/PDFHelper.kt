package com.question.backend.data.helper

import com.itextpdf.kernel.font.PdfFontFactory
import com.itextpdf.kernel.pdf.PdfDocument
import com.itextpdf.kernel.pdf.PdfWriter
import com.itextpdf.layout.Document
import com.itextpdf.layout.element.Paragraph
import com.itextpdf.layout.element.Tab
import com.itextpdf.layout.element.TabStop
import com.itextpdf.layout.element.Text
import com.itextpdf.layout.properties.TabAlignment
import com.itextpdf.layout.properties.TextAlignment
import com.question.backend.domain.vo.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.io.ResourceLoader
import org.springframework.stereotype.Component
import java.io.OutputStream
import java.text.NumberFormat
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*

@Component
class PDFHelper(@Autowired private val resourceLoader: ResourceLoader) {
    private val notoSansFont by lazy {
        PdfFontFactory.createFont(
            getFontContent("classpath:font/NotoSans-Regular.ttf"),
            PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
        )
    }

    private val notoSansBoldFont by lazy {
        PdfFontFactory.createFont(
            getFontContent("classpath:font/NotoSans-Bold.ttf"),
            PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
        )
    }

    private val notoSansItalicFont by lazy {
        PdfFontFactory.createFont(
            getFontContent("classpath:font/NotoSans-Italic.ttf"),
            PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED
        )
    }

    fun createDocument(pageSize: PageSize, outputStream: OutputStream): Document {
        val pdfDoc = PdfDocument(PdfWriter(outputStream)).apply {
            defaultPageSize = when (pageSize) {
                PageSize.A4 -> com.itextpdf.kernel.geom.PageSize.A4
                PageSize.LETTER -> com.itextpdf.kernel.geom.PageSize.LETTER
            }
        }

        val document = Document(pdfDoc)

        return document
    }

    fun writeEmptyLine(document: Document, count: Int = 1) {
        for (i in 1..count) {
            document.add(Paragraph("\n"))
        }
    }

    fun writeExamTitle(document: Document, exam: Exam) {
        val paragraph = Paragraph(
            "Avaliação de ${exam.subject.name}"
        ).apply {
            setFont(notoSansFont)
            setFontSize(16f)
            setTextAlignment(TextAlignment.CENTER)
        }

        document.add(paragraph)
    }

    fun writeExamAnswersTitle(document: Document, exam: Exam) {
        val paragraph = Paragraph(
            "Avaliação de ${exam.subject.name} - Gabarito"
        ).apply {
            setFont(notoSansFont)
            setFontSize(16f)
            setTextAlignment(TextAlignment.CENTER)
        }

        document.add(paragraph)
    }

    fun writeExamTeachingLevelGradeAndClass(document: Document, exam: Exam) {
        val paragraph = Paragraph("${exam.teachingGrade.teachingLevel.name} - ${exam.teachingGrade.name}").apply {
            setFont(notoSansFont)
            setFontSize(14f)

            add(Tab())
            addTabStops(TabStop(1000f, TabAlignment.RIGHT))

            add(exam.classOfStudents)
        }

        document.add(paragraph)
    }

    fun writeTeacherNameAndDate(document: Document, exam: Exam) {
        val brFormatter = DateTimeFormatter
            .ofLocalizedDate(FormatStyle.SHORT)
            .withLocale(BR_LOCALE)

        val paragraph = Paragraph("Professor: ${exam.teacher.name}").apply {
            setFont(notoSansFont)
            setFontSize(14f)

            add(Tab())
            addTabStops(TabStop(1000f, TabAlignment.RIGHT))

            add(exam.date.format(brFormatter))
        }

        document.add(paragraph)
    }

    fun writeStudentName(document: Document) {
        val paragraph = Paragraph("Nome do Aluno: ").apply {
            setFont(notoSansFont)
            setFontSize(14f)
            setTextAlignment(TextAlignment.JUSTIFIED)
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
        val orderChunk = Text("$order) ").apply {
            setFont(notoSansFont)
            setFontSize(12f)
        }

        val questionValueChunk = Text("[${NUMBER_FORMAT.format(examQuestion.value)}] ").apply {
            setFont(notoSansFont)
            setFontSize(12f)
        }

        val textParts = question.text.split("\\n")

        val textChunk = Text(textParts.first()).apply {
            setFont(notoSansFont)
            setFontSize(12f)
        }

        val part1Paragraph = Paragraph().apply {
            setTextAlignment(TextAlignment.JUSTIFIED)
            add(orderChunk)
            add(questionValueChunk)
            add(textChunk)
        }

        document.add(part1Paragraph)

        for (i in 1 until textParts.size) {
            val nextPartParagraph = Paragraph(textParts[i]).apply {
                setFont(notoSansFont)
                setFontSize(12f)
                setTextAlignment(TextAlignment.JUSTIFIED)
            }

            document.add(nextPartParagraph)
        }

        if (writeAnswer) {
            writeEmptyLine(document)

            val answerParagraph = Paragraph(question.answer).apply {
                setFont(notoSansItalicFont)
                setFontSize(12f)
                setTextAlignment(TextAlignment.JUSTIFIED)
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
        val orderChunk = Text("$order) ").apply {
            setFont(notoSansFont)
            setFontSize(12f)
        }

        val questionValueChunk = Text("[${NUMBER_FORMAT.format(examQuestion.value)}] ").apply {
            setFont(notoSansFont)
            setFontSize(12f)
        }

        val textParts = question.text.split("\\n")

        val textChunk = Text(textParts.first()).apply {
            setFont(notoSansFont)
            setFontSize(12f)
        }

        val part1Paragraph = Paragraph().apply {
            setTextAlignment(TextAlignment.JUSTIFIED)
            add(orderChunk)
            add(questionValueChunk)
            add(textChunk)
        }

        document.add(part1Paragraph)

        for (i in 1 until textParts.size) {
            val nextPartParagraph = Paragraph(textParts[i]).apply {
                setFont(notoSansFont)
                setFontSize(12f)
                setTextAlignment(TextAlignment.JUSTIFIED)
            }

            document.add(nextPartParagraph)
        }

        writeEmptyLine(document)

        question.choices.sortedBy { it.order }.forEachIndexed { index, choice ->
            val letter = ('a'.code + index).toChar()

            val font = if (writeAnswer && choice.isAnswer) {
                notoSansBoldFont
            } else notoSansFont

            val letterChunk = Text("$letter) ").apply {
                setFont(font)
                setFontSize(12f)
            }
            val textChunk = Text(choice.text).apply {
                setFont(font)
                setFontSize(12f)
            }

            val choiceParagraph = Paragraph().apply {
                setTextAlignment(TextAlignment.JUSTIFIED)
                add(letterChunk)
                add(textChunk)
            }

            document.add(choiceParagraph)
        }
    }

    private fun getFontContent(fontFile: String): ByteArray {
        return resourceLoader.getResource(fontFile).inputStream.readAllBytes()
    }

    companion object {
        private val BR_LOCALE = Locale("pt", "BR")

        private val NUMBER_FORMAT = NumberFormat.getNumberInstance(BR_LOCALE).apply {
            minimumFractionDigits = 1
            maximumFractionDigits = 2
        }
    }
}