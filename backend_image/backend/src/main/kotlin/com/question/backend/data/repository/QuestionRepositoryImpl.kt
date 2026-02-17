package com.question.backend.data.repository

import com.question.backend.data.dao.QuestionDAO
import com.question.backend.data.dao.SubjectDAO
import com.question.backend.data.dao.TeachingGradeDAO
import com.question.backend.data.mapper.QuestionMapper
import com.question.backend.domain.repository.QuestionRepository
import com.question.backend.domain.vo.Question
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.Page
import org.springframework.data.domain.PageImpl
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Repository

@Repository
class QuestionRepositoryImpl(
    @Autowired private val questionDAO: QuestionDAO,
    @Autowired private val subjectDAO: SubjectDAO,
    @Autowired private val teachingGradeDAO: TeachingGradeDAO,
    @Autowired private val questionMapper: QuestionMapper
) : QuestionRepository {
    override fun getAllBySubjectAndTeachingGrade(
        subjectId: Long,
        teachingGradeId: Long,
        pageable: Pageable
    ): Page<Question> {
        val subject = subjectDAO.findById(subjectId)
        val teachingGrade = teachingGradeDAO.findById(teachingGradeId)

        val page = if (subject.isPresent && teachingGrade.isPresent) {
            questionDAO.findAllBySubjectAndTeachingGrade(subject.get(), teachingGrade.get(), pageable)
        } else Page.empty()

        val questions = page.content.map { questionMapper.fromEntity(it) }

        return PageImpl(questions, pageable, page.totalElements)
    }

    override fun getById(questionId: Long): Question? {
        val question = questionDAO.findById(questionId)

        return if (question.isPresent) {
            questionMapper.fromEntity(question.get())
        } else null
    }

    override fun save(question: Question): Question {
        return questionMapper.fromEntity(
            questionDAO.saveAndFlush(
                questionMapper.toEntity(question)
            )
        )
    }
}