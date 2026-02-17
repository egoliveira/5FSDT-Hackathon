package com.question.backend.domain.service

import com.question.backend.domain.repository.TeachingLevelRepository
import com.question.backend.domain.vo.TeachingLevel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class TeachingLevelService(
    @Autowired val teachingLevelRepository: TeachingLevelRepository
) {
    fun getAll(): List<TeachingLevel> {
        return teachingLevelRepository.getAll()
    }
}