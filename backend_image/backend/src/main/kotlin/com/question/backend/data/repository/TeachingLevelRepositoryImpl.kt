package com.question.backend.data.repository

import com.question.backend.data.dao.TeachingLevelDAO
import com.question.backend.data.mapper.TeachingLevelMapper
import com.question.backend.domain.repository.TeachingLevelRepository
import com.question.backend.domain.vo.TeachingLevel
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class TeachingLevelRepositoryImpl(
    @Autowired private val teachingLevelDAO: TeachingLevelDAO,
    @Autowired private val teachingLevelMapper: TeachingLevelMapper
) : TeachingLevelRepository {
    override fun getAll(): List<TeachingLevel> {
        return teachingLevelDAO.findAllByOrderByOrder().map { teachingLevelMapper.fromEntity(it) }
    }
}