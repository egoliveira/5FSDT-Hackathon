package com.question.backend.domain.repository

import com.question.backend.domain.vo.TeachingLevel

interface TeachingLevelRepository {
    fun getAll(): List<TeachingLevel>
}