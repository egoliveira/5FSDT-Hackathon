package com.question.backend.data.dao

import com.question.backend.data.entity.QuestionEntity
import com.question.backend.data.entity.SubjectEntity
import com.question.backend.data.entity.TeachingGradeEntity
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.JpaRepository

interface QuestionDAO : JpaRepository<QuestionEntity, Long> {
    fun findAllBySubjectAndTeachingGrade(
        subject: SubjectEntity,
        teachingGrade: TeachingGradeEntity,
        pageable: Pageable
    ): Page<QuestionEntity>
}