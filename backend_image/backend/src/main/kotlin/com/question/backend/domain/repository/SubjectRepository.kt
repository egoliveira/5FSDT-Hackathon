package com.question.backend.domain.repository

import com.question.backend.domain.vo.Subject

interface SubjectRepository {
    fun getAll(): List<Subject>

    fun getById(subjectId: Long): Subject?
}