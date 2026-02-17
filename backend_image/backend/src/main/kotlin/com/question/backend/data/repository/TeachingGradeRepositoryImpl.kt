package com.question.backend.data.repository

import com.question.backend.data.dao.TeachingGradeDAO
import com.question.backend.data.mapper.TeachingGradeMapper
import com.question.backend.domain.repository.TeachingGradeRepository
import com.question.backend.domain.vo.TeachingGrade
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class TeachingGradeRepositoryImpl(
    @Autowired private val teachingGradeDAO: TeachingGradeDAO,
    @Autowired private val teachingGradeMapper: TeachingGradeMapper
) : TeachingGradeRepository {
    override fun getAllByTeachingLevelId(teachingLevelId: Long): List<TeachingGrade> {
        return teachingGradeDAO.findAllByTeachingLevelIdOrderByOrder(teachingLevelId)
            .map { teachingGradeMapper.fromEntity(it) }
    }

    override fun getById(teachingGradeId: Long): TeachingGrade? {
        val teachingGrade = teachingGradeDAO.findById(teachingGradeId)

        return if (teachingGrade.isPresent) {
            teachingGradeMapper.fromEntity(teachingGrade.get())
        } else null
    }
}