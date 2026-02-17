package com.question.backend.data.repository

import com.question.backend.data.dao.SubjectDAO
import com.question.backend.data.mapper.SubjectMapper
import com.question.backend.domain.repository.SubjectRepository
import com.question.backend.domain.vo.Subject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Repository

@Repository
class SubjectRepositoryImpl(
    @Autowired private val subjectDAO: SubjectDAO,
    @Autowired private val subjectMapper: SubjectMapper
) : SubjectRepository {
    override fun getAll(): List<Subject> {
        return subjectDAO.findAllByOrderByName().map { subjectMapper.fromEntity(it) }
    }

    override fun getById(subjectId: Long): Subject? {
        val subject = subjectDAO.findById(subjectId)

        return if (subject.isPresent) {
            subjectMapper.fromEntity(subject.get())
        } else null
    }
}