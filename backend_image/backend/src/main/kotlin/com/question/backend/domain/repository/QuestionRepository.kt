package com.question.backend.domain.repository

import com.question.backend.domain.vo.Question
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface QuestionRepository {
    fun getAllBySubjectAndTeachingGrade(subjectId: Long, teachingGradeId: Long, pageable: Pageable): Page<Question>

    fun getById(questionId: Long): Question?

    fun save(question: Question): Question
}