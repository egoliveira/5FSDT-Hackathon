package com.question.backend.domain.repository

import com.question.backend.domain.vo.Teacher

interface TeacherRepository {
    fun getAll(): List<Teacher>

    fun getById(teacherId: Long): Teacher?
}