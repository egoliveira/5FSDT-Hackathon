package com.question.backend.domain.repository

import com.question.backend.domain.vo.Exam
import com.question.backend.domain.vo.PageSize
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable

interface ExamRepository {
    fun getAll(pageable: Pageable): Page<Exam>

    fun getById(id: Long): Exam?

    fun getDocument(exam: Exam, pageSize: PageSize, examCopies: Int = 1): ByteArray

    fun save(exam: Exam): Long
}