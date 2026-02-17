package com.question.backend.domain.repository

import com.question.backend.domain.vo.TeachingGrade

interface TeachingGradeRepository {
    fun getAllByTeachingLevelId(teachingLevelId: Long): List<TeachingGrade>

    fun getById(teachingGradeId: Long): TeachingGrade?
}